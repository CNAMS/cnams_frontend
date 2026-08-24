'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import {
  BLE_GATT_SERVICE_UUID,
  BLE_GATT_MEASUREMENT_CHAR_UUID,
  BLE_GATT_CONTROL_CHAR_UUID,
  BLE_DEVICE_NAME_PREFIX,
  decodeBleFrame,
  type DecodedBlePacket,
} from './bleCodec';

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
  getPrimaryService: (service: string) => Promise<BluetoothRemoteGATTServiceLike>;
}

interface BluetoothRemoteGATTServiceLike {
  getCharacteristic: (characteristic: string) => Promise<BluetoothRemoteGATTCharacteristicLike>;
}

interface BluetoothRemoteGATTCharacteristicLike extends EventTarget {
  value?: DataView;
  startNotifications: () => Promise<BluetoothRemoteGATTCharacteristicLike>;
  stopNotifications: () => Promise<BluetoothRemoteGATTCharacteristicLike>;
  writeValue: (value: BufferSource) => Promise<void>;
}

interface NavigatorWithBluetooth extends Navigator {
  bluetooth?: {
    requestDevice: (options: {
      filters?: Array<{ namePrefix?: string; services?: string[] }>;
      optionalServices?: string[];
    }) => Promise<BluetoothDeviceLike>;
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
  value: string;       // Formatted string (e.g. "12.45" kg or "84.5" cm)
  raw: number;         // Raw grams or mm
  unit: string;        // "kg" or "cm"
  stable: boolean;     // Stable lock flag from ESP32
  lastUpdated: number; // Timestamp
}

export interface UseBleDeviceReturn {
  isSupported: boolean;
  connectionState: BleConnectionState;
  deviceName: string | null;
  deviceSerial: string | null;
  errorMessage: string | null;
  weight: ChannelReading | null;
  length: ChannelReading | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  triggerMeasurement: () => Promise<void>;
  tareScale: () => Promise<void>;
  resetReadings: () => void;
}

export function useBleDevice(onReading?: (packet: DecodedBlePacket) => void): UseBleDeviceReturn {
  const [isSupported, setIsSupported] = useState<boolean>(false);
  const [connectionState, setConnectionState] = useState<BleConnectionState>('disconnected');
  const [deviceName, setDeviceName] = useState<string | null>(null);
  const [deviceSerial, setDeviceSerial] = useState<string | null>(null);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const [weight, setWeight] = useState<ChannelReading | null>(null);
  const [length, setLength] = useState<ChannelReading | null>(null);

  const deviceRef = useRef<BluetoothDeviceLike | null>(null);
  const measureCharRef = useRef<BluetoothRemoteGATTCharacteristicLike | null>(null);
  const controlCharRef = useRef<BluetoothRemoteGATTCharacteristicLike | null>(null);
  const callbackRef = useRef(onReading);

  useEffect(() => {
    callbackRef.current = onReading;
  }, [onReading]);

  // Check Web Bluetooth availability on mount
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const nav = navigator as NavigatorWithBluetooth;
      if (nav.bluetooth) {
        setIsSupported(true);
        return;
      }
    }
    setIsSupported(false);
    setConnectionState('unsupported');
  }, []);

  // Process a decoded packet from ESP32-S3.
  //
  // Guard: once a channel has a non-zero stable locked reading, we ignore any
  // subsequent stable packet that comes in with value 0. This protects against a
  // firmware timing edge-case where the ESP32 re-reads physical sensors (which
  // return 0 on unconnected ADC pins) immediately after the capture cycle locks.
  // The reading is only replaced when a new measurement cycle begins (stable=false).
  const handlePacket = useCallback((packet: DecodedBlePacket) => {
    // ── LOG 2: Decoded packet from ESP32 ─────────────────────────────────────
    console.log(
      `[BLE] 📦 Decoded packet | ch=${packet.channel} | raw=${packet.valueRaw} | fmt=${packet.valueFormatted} | stable=${packet.stable} | seq=${packet.sequence}`
    );

    const incoming: ChannelReading = {
      value: packet.valueFormatted,
      raw: packet.valueRaw,
      unit: packet.unit,
      stable: packet.stable,
      lastUpdated: Date.now(),
    };

    if (packet.channel === 'weight') {
      setWeight((prev) => {
        // If we already have a non-zero stable lock, don't overwrite with a zero stable packet.
        if (prev && prev.stable && prev.raw > 0 && packet.stable && packet.valueRaw === 0) {
          console.warn(
            `[BLE] 🛡️ GUARD: Ignoring zero-stable WEIGHT packet (prev locked at ${prev.value} kg). Firmware ADC glitch suppressed.`
          );
          return prev;
        }
        if (packet.stable && packet.valueRaw > 0) {
          console.log(`[BLE] 🔒 WEIGHT LOCKED at ${packet.valueFormatted} kg (raw=${packet.valueRaw} g)`);
        }
        return incoming;
      });
    } else {
      setLength((prev) => {
        if (prev && prev.stable && prev.raw > 0 && packet.stable && packet.valueRaw === 0) {
          console.warn(
            `[BLE] 🛡️ GUARD: Ignoring zero-stable LENGTH packet (prev locked at ${prev.value} cm). Firmware ADC glitch suppressed.`
          );
          return prev;
        }
        if (packet.stable && packet.valueRaw > 0) {
          console.log(`[BLE] 🔒 LENGTH LOCKED at ${packet.valueFormatted} cm (raw=${packet.valueRaw} mm)`);
        }
        return incoming;
      });
    }

    // Only fire the consumer callback for meaningful non-zero stable locks,
    // or for any unstable reading (so the live gauge keeps updating).
    // Skip zero-stable packets to prevent overwriting auto-filled form fields.
    const isZeroStable = packet.stable && packet.valueRaw === 0;
    if (isZeroStable) {
      console.warn(`[BLE] ⏭️ SKIPPED callback for zero-stable ${packet.channel} packet (ADC glitch).`);
    } else if (callbackRef.current) {
      console.log(`[BLE] 📡 Forwarding packet to consumer callback | ch=${packet.channel} stable=${packet.stable} val=${packet.valueFormatted}`);
      callbackRef.current(packet);
    }
  }, []);

  // Handle characteristic notification event from ESP32-S3
  const handleCharacteristicValue = useCallback((event: Event) => {
    try {
      const target = event.target as BluetoothRemoteGATTCharacteristicLike;
      if (!target?.value) return;

      // ── LOG 1: Raw bytes arriving from ESP32 ─────────────────────────────
      const bytes = new Uint8Array(target.value.buffer);
      const hex = Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join(' ');
      console.log(`[BLE] 📻 Raw GATT notification (${bytes.length} bytes): ${hex}`);

      const packet = decodeBleFrame(target.value);
      handlePacket(packet);
    } catch (err: unknown) {
      console.warn('[BLE] ❌ Frame decode error:', err);
    }
  }, [handlePacket]);

  // Handle GATT disconnection
  const handleDisconnected = useCallback(() => {
    setConnectionState('disconnected');
    setDeviceName(null);
    setDeviceSerial(null);
    measureCharRef.current = null;
    controlCharRef.current = null;
    deviceRef.current = null;
  }, []);

  // Connect to the physical ESP32-S3 BLE scale
  const connect = useCallback(async () => {
    if (typeof window === 'undefined') return;
    const nav = navigator as NavigatorWithBluetooth;

    if (!nav.bluetooth) {
      setErrorMessage('Web Bluetooth is not supported in this browser. Please open in Google Chrome or Microsoft Edge.');
      setConnectionState('unsupported');
      return;
    }

    try {
      setErrorMessage(null);
      setConnectionState('scanning');

      // Request ESP32-S3 device advertising CGMS GATT service
      const device = await nav.bluetooth.requestDevice({
        filters: [
          { namePrefix: BLE_DEVICE_NAME_PREFIX },
          { services: [BLE_GATT_SERVICE_UUID] },
        ],
        optionalServices: [BLE_GATT_SERVICE_UUID],
      });

      deviceRef.current = device;
      setDeviceName(device.name || 'CGMS-ANKUR-S3');
      setDeviceSerial(device.id || 'ESP32-S3');

      device.addEventListener('gattserverdisconnected', handleDisconnected);

      setConnectionState('connecting');
      const server = await device.gatt?.connect();
      if (!server) throw new Error('Could not connect to ESP32 GATT server');

      const service = await server.getPrimaryService(BLE_GATT_SERVICE_UUID);
      
      // 1. Measurement Characteristic (Notify)
      const measureChar = await service.getCharacteristic(BLE_GATT_MEASUREMENT_CHAR_UUID);
      measureCharRef.current = measureChar;
      await measureChar.startNotifications();
      measureChar.addEventListener('characteristicvaluechanged', handleCharacteristicValue);

      // 2. Control Characteristic (Write - optional for triggers / tare)
      try {
        const controlChar = await service.getCharacteristic(BLE_GATT_CONTROL_CHAR_UUID);
        controlCharRef.current = controlChar;
      } catch (cErr) {
        console.info('[BLE ESP32] Control characteristic not present or optional:', cErr);
      }

      setConnectionState('connected');
    } catch (err: unknown) {
      console.error('[BLE ESP32] Connection failed:', err);
      const isUserCancel = err instanceof Error && err.name === 'NotFoundError';
      if (!isUserCancel) {
        setErrorMessage(err instanceof Error ? err.message : 'Failed to connect to ESP32 scale');
        setConnectionState('error');
      } else {
        setConnectionState('disconnected');
      }
    }
  }, [handleCharacteristicValue, handleDisconnected]);

  // Send Trigger Capture command (0x02) to ESP32
  const triggerMeasurement = useCallback(async () => {
    if (controlCharRef.current) {
      try {
        await controlCharRef.current.writeValue(new Uint8Array([0x02]));
        console.log('[BLE ESP32] Trigger command sent (0x02)');
      } catch (err) {
        console.warn('[BLE ESP32] Failed to send trigger command:', err);
      }
    }
  }, []);

  // Send Tare / Zero command (0x01) to ESP32
  const tareScale = useCallback(async () => {
    if (controlCharRef.current) {
      try {
        await controlCharRef.current.writeValue(new Uint8Array([0x01]));
        console.log('[BLE ESP32] Tare command sent (0x01)');
      } catch (err) {
        console.warn('[BLE ESP32] Failed to send tare command:', err);
      }
    }
  }, []);

  // Disconnect ESP32 device
  const disconnect = useCallback(() => {
    if (measureCharRef.current) {
      try {
        measureCharRef.current.removeEventListener('characteristicvaluechanged', handleCharacteristicValue);
        measureCharRef.current.stopNotifications().catch(() => {});
      } catch (_) {}
      measureCharRef.current = null;
    }

    if (deviceRef.current && deviceRef.current.gatt?.connected) {
      try {
        deviceRef.current.gatt.disconnect();
      } catch (_) {}
    }

    handleDisconnected();
  }, [handleCharacteristicValue, handleDisconnected]);

  const resetReadings = useCallback(() => {
    setWeight(null);
    setLength(null);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      if (deviceRef.current && deviceRef.current.gatt?.connected) {
        deviceRef.current.gatt.disconnect();
      }
    };
  }, []);

  return {
    isSupported,
    connectionState,
    deviceName,
    deviceSerial,
    errorMessage,
    weight,
    length,
    connect,
    disconnect,
    triggerMeasurement,
    tareScale,
    resetReadings,
  };
}
