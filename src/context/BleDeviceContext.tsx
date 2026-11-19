'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';
import {
  BLE_GATT_SERVICE_UUID,
  BLE_GATT_MEASUREMENT_CHAR_UUID,
  BLE_GATT_CONTROL_CHAR_UUID,
  BLE_GATT_OTA_SERVICE_UUID,
  BLE_GATT_OTA_CONTROL_CHAR_UUID,
  BLE_GATT_OTA_DATA_CHAR_UUID,
  BLE_DEVICE_NAME_PREFIX,
  decodeBleFrame,
  type DecodedBlePacket,
  type DeviceDiagnostics,
} from '@/lib/bleCodec';

// Web Bluetooth API TypeScript definitions
interface BluetoothDeviceLike extends EventTarget {
  id: string;
  name?: string;
  gatt?: {
    connected: boolean;
    connect: () => Promise<BluetoothRemoteGATTServerLike>;
    disconnect: () => void;
  };
}

interface BluetoothRemoteGATTServerLike {
  getPrimaryService: (service: string | number) => Promise<BluetoothRemoteGATTServiceLike>;
}

interface BluetoothRemoteGATTServiceLike {
  getCharacteristic: (characteristic: string | number) => Promise<BluetoothRemoteGATTCharacteristicLike>;
}

interface BluetoothRemoteGATTCharacteristicLike extends EventTarget {
  value?: DataView;
  startNotifications: () => Promise<BluetoothRemoteGATTCharacteristicLike>;
  stopNotifications: () => Promise<BluetoothRemoteGATTCharacteristicLike>;
  readValue?: () => Promise<DataView>;
  writeValue: (value: BufferSource) => Promise<void>;
  writeValueWithoutResponse?: (value: BufferSource) => Promise<void>;
}

interface NavigatorWithBluetooth extends Navigator {
  bluetooth?: {
    requestDevice: (options: {
      filters?: Array<{ namePrefix?: string; services?: (string | number)[] }>;
      optionalServices?: (string | number)[];
    }) => Promise<BluetoothDeviceLike>;
    getDevices?: () => Promise<BluetoothDeviceLike[]>;
  };
}

export type BleConnectionState =
  | 'disconnected'
  | 'scanning'
  | 'connecting'
  | 'connected'
  | 'error'
  | 'unsupported';

export interface ChannelReading {
  value: string;       // Formatted string (e.g. "8.54" kg or "72.5" cm)
  raw: number;         // Raw grams or mm
  unit: string;        // "kg" or "cm"
  stable: boolean;     // Stable lock flag from ESP32
  lastUpdated: number; // Timestamp
}

export interface BleContextValue {
  isSupported: boolean;
  connectionState: BleConnectionState;
  deviceName: string | null;
  deviceSerial: string | null;
  errorMessage: string | null;
  weight: ChannelReading | null;
  length: ChannelReading | null;
  diagnostics: DeviceDiagnostics | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  triggerMeasurement: () => Promise<void>;
  tareScale: () => Promise<void>;
  resetReadings: () => void;
  fetchDeviceInfo: () => Promise<void>;
  renameDevice: (newName: string) => Promise<void>;
  setWeightCalibration: (factor: number) => Promise<void>;
  setLengthCalibration: (factor: number) => Promise<void>;
  factoryReset: () => Promise<void>;
  startBleOta: (file: ArrayBuffer, onProgress: (pct: number, speedKb: number) => void) => Promise<void>;
  addPacketListener: (listener: (packet: DecodedBlePacket) => void) => () => void;
}

const BleContext = createContext<BleContextValue | null>(null);

const STORAGE_KEY_LAST_DEVICE = 'cnams_last_ble_device_id';

// localStorage throws in private windows, sandboxed frames and when site data
// is blocked. Remembering the last scale is a convenience, so a storage failure
// must never turn a successful connection into a failed one.
function readLastDeviceId(): string | null {
  try {
    return window.localStorage.getItem(STORAGE_KEY_LAST_DEVICE);
  } catch {
    return null;
  }
}

function rememberDeviceId(id: string): void {
  try {
    window.localStorage.setItem(STORAGE_KEY_LAST_DEVICE, id);
  } catch {
    // Best effort.
  }
}

function forgetDeviceId(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY_LAST_DEVICE);
  } catch {
    // Best effort.
  }
}

function dropLink(device: BluetoothDeviceLike): void {
  try {
    // Also aborts a connect() that is still pending.
    device.gatt?.disconnect();
  } catch {
    // Best effort.
  }
}

// Helper to enforce strict promise timeout
function withTimeout<T>(promise: Promise<T>, ms: number, timeoutMsg: string): Promise<T> {
  return new Promise<T>((resolve, reject) => {
    const timer = setTimeout(() => reject(new Error(timeoutMsg)), ms);
    promise
      .then((res) => {
        clearTimeout(timer);
        resolve(res);
      })
      .catch((err) => {
        clearTimeout(timer);
        reject(err);
      });
  });
}

export function BleProvider({ children }: { children: React.ReactNode }) {
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [connectionState, setConnectionState] = useState<BleConnectionState>('disconnected');
  const [deviceName, setDeviceName] = useState<string | null>(null);
  const [deviceSerial, setDeviceSerial] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [diagnostics, setDiagnostics] = useState<DeviceDiagnostics | null>(null);

  const [weight, setWeight] = useState<ChannelReading | null>(null);
  const [length, setLength] = useState<ChannelReading | null>(null);

  const deviceRef = useRef<BluetoothDeviceLike | null>(null);
  const serverRef = useRef<BluetoothRemoteGATTServerLike | null>(null);
  const measureCharRef = useRef<BluetoothRemoteGATTCharacteristicLike | null>(null);
  const controlCharRef = useRef<BluetoothRemoteGATTCharacteristicLike | null>(null);
  const otaControlCharRef = useRef<BluetoothRemoteGATTCharacteristicLike | null>(null);
  const otaDataCharRef = useRef<BluetoothRemoteGATTCharacteristicLike | null>(null);

  const listenersRef = useRef<Set<(packet: DecodedBlePacket) => void>>(new Set());
  const abortAutoReconnectRef = useRef<boolean>(false);

  // Every connection attempt is a numbered session. Ending a session bumps the
  // number, so an attempt still awaiting GATT (an auto-reconnect racing a
  // manual pick, or one that already timed out) sees it is stale and stops
  // instead of attaching listeners to a link nobody owns.
  const sessionRef = useRef(0);
  const sessionCleanupRef = useRef<(() => void) | null>(null);

  // Process a decoded measurement packet from ESP32-S3
  const handlePacket = useCallback((packet: DecodedBlePacket) => {
    const incoming: ChannelReading = {
      value: packet.valueFormatted,
      raw: packet.valueRaw,
      unit: packet.unit,
      stable: packet.stable,
      lastUpdated: Date.now(),
    };

    if (packet.channel === 'weight') {
      setWeight(incoming);
    } else {
      setLength(incoming);
    }

    listenersRef.current.forEach((listener) => {
      try {
        listener(packet);
      } catch (err) {
        console.error('[BLE Packet Listener] Error:', err);
      }
    });
  }, []);

  // Handle characteristic notification event from ESP32-S3
  const handleCharacteristicValue = useCallback((event: Event) => {
    try {
      const target = event.target as BluetoothRemoteGATTCharacteristicLike;
      if (!target?.value) return;

      const packet = decodeBleFrame(target.value);
      handlePacket(packet);
    } catch (err: unknown) {
      console.warn('[BLE Frame] Decode error:', err);
    }
  }, [handlePacket]);

  // Handle control characteristic response / JSON diagnostics
  const handleControlNotification = useCallback((event: Event) => {
    try {
      const target = event.target as BluetoothRemoteGATTCharacteristicLike;
      if (!target?.value) return;

      const decoder = new TextDecoder('utf-8');
      const text = decoder.decode(target.value);
      if (text.startsWith('{') && text.endsWith('}')) {
        const data = JSON.parse(text) as DeviceDiagnostics;
        setDiagnostics(data);
        if (data.name) setDeviceName(data.name);
      }
    } catch (err) {
      console.warn('[BLE Control] Notification decode error:', err);
    }
  }, []);

  /**
   * Ends the current session, whatever state it is in: invalidates any attempt
   * still in flight, detaches every listener, drops the GATT link and clears
   * the readings. A disconnected scale must not keep showing a "stable" value
   * that looks live.
   */
  const endSession = useCallback(() => {
    sessionRef.current += 1;
    const cleanup = sessionCleanupRef.current;
    sessionCleanupRef.current = null;
    cleanup?.();

    setConnectionState('disconnected');
    setDeviceName(null);
    setDeviceSerial(null);
    setDiagnostics(null);
    setWeight(null);
    setLength(null);
    measureCharRef.current = null;
    controlCharRef.current = null;
    otaControlCharRef.current = null;
    otaDataCharRef.current = null;
    serverRef.current = null;
    deviceRef.current = null;
  }, []);

  /**
   * Opens a GATT session with a connection timeout.
   *
   * Resolves `true` once connected, or `false` if a newer session (or a manual
   * disconnect) superseded this one while it was waiting. Throws only for a
   * real failure of the current session, after tearing it down.
   */
  const initGattSession = useCallback(async (device: BluetoothDeviceLike, timeoutMs: number = 5000) => {
    endSession(); // never run two sessions side by side
    const session = sessionRef.current;
    const isCurrent = () => sessionRef.current === session;

    let ended = false;
    let measureChar: BluetoothRemoteGATTCharacteristicLike | null = null;
    let controlChar: BluetoothRemoteGATTCharacteristicLike | null = null;

    const onLinkLost = () => {
      if (isCurrent()) endSession();
    };

    sessionCleanupRef.current = () => {
      ended = true;
      device.removeEventListener('gattserverdisconnected', onLinkLost);
      if (measureChar) {
        measureChar.removeEventListener('characteristicvaluechanged', handleCharacteristicValue);
        measureChar.stopNotifications().catch(() => {});
      }
      if (controlChar) {
        controlChar.removeEventListener('characteristicvaluechanged', handleControlNotification);
        controlChar.stopNotifications().catch(() => {});
      }
      dropLink(device);
    };

    deviceRef.current = device;
    setDeviceName(device.name || 'CGMS-ANKUR-S3');
    setDeviceSerial(device.id || 'ESP32-S3');
    setConnectionState('connecting');
    device.addEventListener('gattserverdisconnected', onLinkLost);

    try {
      if (!device.gatt) throw new Error('Could not connect to ESP32 GATT server');
      const connectPromise = device.gatt.connect();
      // If the link comes up after this session already ended (it timed out,
      // or was superseded by a different scale), drop it rather than leave an
      // orphaned connection holding the scale.
      connectPromise.then(
        () => {
          if (ended && deviceRef.current !== device) dropLink(device);
        },
        () => {},
      );

      const seconds = Math.round(timeoutMs / 1000);
      const server = await withTimeout(connectPromise, timeoutMs, `Scale connection timed out after ${seconds}s`);
      if (!isCurrent()) return false;
      if (!server) throw new Error('Could not connect to ESP32 GATT server');
      serverRef.current = server;

      // 1. Primary anthropometry service, measurement characteristic (notify)
      const service = await server.getPrimaryService(BLE_GATT_SERVICE_UUID);
      if (!isCurrent()) return false;
      const measure = await service.getCharacteristic(BLE_GATT_MEASUREMENT_CHAR_UUID);
      if (!isCurrent()) return false;
      await measure.startNotifications();
      if (!isCurrent()) return false;
      measureChar = measure;
      measureCharRef.current = measure;
      measure.addEventListener('characteristicvaluechanged', handleCharacteristicValue);

      // Control characteristic (write/notify) — optional on older firmware
      try {
        const control = await service.getCharacteristic(BLE_GATT_CONTROL_CHAR_UUID);
        if (!isCurrent()) return false;
        await control.startNotifications();
        if (!isCurrent()) return false;
        controlChar = control;
        controlCharRef.current = control;
        control.addEventListener('characteristicvaluechanged', handleControlNotification);
        await control.writeValue(new Uint8Array([0x10])); // request device info
      } catch (cErr) {
        console.info('[BLE ESP32] Control characteristic optional error:', cErr);
      }
      if (!isCurrent()) return false;

      // 2. BLE OTA service — optional
      try {
        const otaService = await server.getPrimaryService(BLE_GATT_OTA_SERVICE_UUID);
        const otaControl = await otaService.getCharacteristic(BLE_GATT_OTA_CONTROL_CHAR_UUID);
        const otaData = await otaService.getCharacteristic(BLE_GATT_OTA_DATA_CHAR_UUID);
        if (!isCurrent()) return false;
        otaControlCharRef.current = otaControl;
        otaDataCharRef.current = otaData;
      } catch (otaErr) {
        console.info('[BLE ESP32] OTA service optional:', otaErr);
      }
      if (!isCurrent()) return false;

      setConnectionState('connected');
      if (device.id) rememberDeviceId(device.id);
      return true;
    } catch (err) {
      if (!isCurrent()) return false;
      endSession();
      throw err;
    }
  }, [endSession, handleCharacteristicValue, handleControlNotification]);

  // Check Web Bluetooth availability & attempt quick 5-second auto-reconnect on refresh
  useEffect(() => {
    if (typeof window === 'undefined') return;
    const nav = navigator as NavigatorWithBluetooth;

    if (!nav.bluetooth) {
      setIsSupported(false);
      setConnectionState('unsupported');
      return;
    }
    setIsSupported(true);

    const autoReconnect = async () => {
      try {
        if (nav.bluetooth?.getDevices) {
          const permitted = await nav.bluetooth.getDevices();
          const savedId = readLastDeviceId();
          const match = permitted.find(
            (d) => (savedId && d.id === savedId) || d.name?.startsWith(BLE_DEVICE_NAME_PREFIX)
          );
          if (match && match.gatt && !abortAutoReconnectRef.current) {
            console.info('[BLE] Attempting 5s auto-reconnect on refresh to:', match.name || match.id);
            await initGattSession(match, 5000);
          }
        }
      } catch (err) {
        // initGattSession already tore the session down; the manual
        // Connect button is the way forward.
        console.info('[BLE] Auto-reconnect timed out or bypassed (ready for manual connect):', err);
      }
    };

    autoReconnect();
    return () => endSession();
  }, [initGattSession, endSession]);

  // Manual connect popup (cancels auto-reconnect and opens picker immediately)
  const connect = useCallback(async () => {
    abortAutoReconnectRef.current = true;
    if (typeof window === 'undefined') return;
    const nav = navigator as NavigatorWithBluetooth;

    if (!nav.bluetooth) {
      setErrorMessage('Web Bluetooth is not supported in this browser. Please open in Google Chrome or Microsoft Edge.');
      setConnectionState('unsupported');
      return;
    }

    // Cancel an auto-reconnect still in flight so it cannot connect behind the
    // picker, or flip the state back to "disconnected" after the user's pick.
    endSession();

    try {
      setErrorMessage(null);
      setConnectionState('scanning');

      const device = await nav.bluetooth.requestDevice({
        filters: [
          { namePrefix: BLE_DEVICE_NAME_PREFIX },
          { services: [BLE_GATT_SERVICE_UUID] },
        ],
        optionalServices: [
          BLE_GATT_SERVICE_UUID,
          BLE_GATT_OTA_SERVICE_UUID,
          0x180a,
        ],
      });

      await initGattSession(device, 8000);
    } catch (err: unknown) {
      console.error('[BLE ESP32] Connection failed:', err);
      const isUserCancel = err instanceof Error && err.name === 'NotFoundError';
      if (!isUserCancel) {
        setErrorMessage(err instanceof Error ? err.message : 'Failed to connect to ESP32 scale');
        setConnectionState('error');
        // Only clear the error banner; never clobber a connection the user
        // made by retrying inside those four seconds.
        setTimeout(() => setConnectionState((s) => (s === 'error' ? 'disconnected' : s)), 4000);
      } else {
        setConnectionState('disconnected');
      }
    }
  }, [initGattSession, endSession]);

  // Request fresh diagnostics
  const fetchDeviceInfo = useCallback(async () => {
    if (controlCharRef.current) {
      await controlCharRef.current.writeValue(new Uint8Array([0x10]));
    }
  }, []);

  // Rename Device
  const renameDevice = useCallback(async (newName: string) => {
    if (!controlCharRef.current) throw new Error('Not connected to device');
    const encoder = new TextEncoder();
    const nameBytes = encoder.encode(newName);
    const payload = new Uint8Array(1 + nameBytes.length);
    payload[0] = 0x11;
    payload.set(nameBytes, 1);
    await controlCharRef.current.writeValue(payload);
    setDeviceName(newName);
  }, []);

  // Set Weight Calibration Factor
  const setWeightCalibration = useCallback(async (factor: number) => {
    if (!controlCharRef.current) throw new Error('Not connected to device');
    const buf = new ArrayBuffer(5);
    const view = new DataView(buf);
    view.setUint8(0, 0x12);
    view.setFloat32(1, factor, true);
    await controlCharRef.current.writeValue(new Uint8Array(buf));
  }, []);

  // Set Length Calibration Factor
  const setLengthCalibration = useCallback(async (factor: number) => {
    if (!controlCharRef.current) throw new Error('Not connected to device');
    const buf = new ArrayBuffer(5);
    const view = new DataView(buf);
    view.setUint8(0, 0x13);
    view.setFloat32(1, factor, true);
    await controlCharRef.current.writeValue(new Uint8Array(buf));
  }, []);

  // Factory Reset
  const factoryReset = useCallback(async () => {
    if (!controlCharRef.current) throw new Error('Not connected to device');
    await controlCharRef.current.writeValue(new Uint8Array([0x14]));
  }, []);

  // Send Trigger Capture command (0x02) to ESP32
  const triggerMeasurement = useCallback(async () => {
    if (controlCharRef.current) {
      await controlCharRef.current.writeValue(new Uint8Array([0x02]));
    }
  }, []);

  // Send Tare / Zero command (0x01) to ESP32
  const tareScale = useCallback(async () => {
    if (controlCharRef.current) {
      await controlCharRef.current.writeValue(new Uint8Array([0x01]));
    }
  }, []);

  // BLE OTA Firmware Flasher
  const startBleOta = useCallback(async (
    fileBuffer: ArrayBuffer,
    onProgress: (pct: number, speedKb: number) => void
  ) => {
    if (!otaControlCharRef.current || !otaDataCharRef.current) {
      throw new Error('BLE OTA service not available on this device');
    }

    const totalBytes = fileBuffer.byteLength;
    console.log(`[BLE OTA] Starting upload: ${totalBytes} bytes`);

    // 1. Send OTA Begin [0x01, 4-byte size]
    const beginBuf = new ArrayBuffer(5);
    const beginView = new DataView(beginBuf);
    beginView.setUint8(0, 0x01);
    beginView.setUint32(1, totalBytes, true);
    await otaControlCharRef.current.writeValue(new Uint8Array(beginBuf));

    // 2. Stream chunks (256 bytes per chunk for maximum BLE stability)
    const chunkSize = 256;
    const totalChunks = Math.ceil(totalBytes / chunkSize);
    const startTime = Date.now();
    const bytes = new Uint8Array(fileBuffer);

    for (let i = 0; i < totalChunks; i++) {
      const start = i * chunkSize;
      const end = Math.min(start + chunkSize, totalBytes);
      const chunk = bytes.subarray(start, end);

      if (otaDataCharRef.current.writeValueWithoutResponse) {
        await otaDataCharRef.current.writeValueWithoutResponse(chunk);
      } else {
        await otaDataCharRef.current.writeValue(chunk);
      }

      const elapsedSec = (Date.now() - startTime) / 1000;
      const speedKb = elapsedSec > 0 ? (end / 1024) / elapsedSec : 0;
      const pct = Math.round((end / totalBytes) * 100);
      onProgress(pct, speedKb);

      if (i % 4 === 0) {
        await new Promise((resolve) => setTimeout(resolve, 15));
      }
    }

    // 3. Send OTA End command [0x02]
    console.log('[BLE OTA] Transfer complete. Sending OTA End / Reboot command...');
    await otaControlCharRef.current.writeValue(new Uint8Array([0x02]));
  }, []);

  // Disconnect ESP32 device
  const disconnect = useCallback(() => {
    abortAutoReconnectRef.current = true;
    forgetDeviceId();
    endSession();
  }, [endSession]);

  const resetReadings = useCallback(() => {
    setWeight(null);
    setLength(null);
  }, []);

  const addPacketListener = useCallback((listener: (packet: DecodedBlePacket) => void) => {
    listenersRef.current.add(listener);
    return () => {
      listenersRef.current.delete(listener);
    };
  }, []);

  return (
    <BleContext.Provider
      value={{
        isSupported,
        connectionState,
        deviceName,
        deviceSerial,
        errorMessage,
        weight,
        length,
        diagnostics,
        connect,
        disconnect,
        triggerMeasurement,
        tareScale,
        resetReadings,
        fetchDeviceInfo,
        renameDevice,
        setWeightCalibration,
        setLengthCalibration,
        factoryReset,
        startBleOta,
        addPacketListener,
      }}
    >
      {children}
    </BleContext.Provider>
  );
}

export function useBleContext(): BleContextValue {
  const ctx = useContext(BleContext);
  if (!ctx) {
    throw new Error('useBleContext must be used within a BleProvider');
  }
  return ctx;
}
