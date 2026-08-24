'use client';

import { useState, useEffect, useCallback, useRef, startTransition } from 'react';
import {
  BLE_GATT_SERVICE_UUID,
  BLE_GATT_MEASUREMENT_CHAR_UUID,
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
  const characteristicRef = useRef<BluetoothRemoteGATTCharacteristicLike | null>(null);
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

  // Process a decoded packet from ESP32-S3
  const handlePacket = useCallback((packet: DecodedBlePacket) => {
    const reading: ChannelReading = {
      value: packet.valueFormatted,
      raw: packet.valueRaw,
      unit: packet.unit,
      stable: packet.stable,
      lastUpdated: Date.now(),
    };

    startTransition(() => {
      if (packet.channel === 'weight') {
        setWeight(reading);
      } else {
        setLength(reading);
      }

      if (callbackRef.current) {
        callbackRef.current(packet);
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
      console.warn('[BLE ESP32] Frame decode error:', err);
    }
  }, [handlePacket]);

  // Handle GATT disconnection
  const handleDisconnected = useCallback(() => {
    setConnectionState('disconnected');
    setDeviceName(null);
    setDeviceSerial(null);
    characteristicRef.current = null;
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
      const characteristic = await service.getCharacteristic(BLE_GATT_MEASUREMENT_CHAR_UUID);
      characteristicRef.current = characteristic;

      await characteristic.startNotifications();
      characteristic.addEventListener('characteristicvaluechanged', handleCharacteristicValue);

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

  // Disconnect ESP32 device
  const disconnect = useCallback(() => {
    if (characteristicRef.current) {
      try {
        characteristicRef.current.removeEventListener('characteristicvaluechanged', handleCharacteristicValue);
        characteristicRef.current.stopNotifications().catch(() => {});
      } catch (_) {}
      characteristicRef.current = null;
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
    resetReadings,
  };
}
