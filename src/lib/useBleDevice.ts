'use client';

import { useEffect } from 'react';
import {
  useBleContext,
  type BleContextValue,
  type ChannelReading,
  type BleConnectionState,
} from '@/context/BleDeviceContext';
import type { DecodedBlePacket } from './bleCodec';

export type { BleConnectionState, ChannelReading };
export type UseBleDeviceReturn = Omit<BleContextValue, 'addPacketListener'>;

export function useBleDevice(onReading?: (packet: DecodedBlePacket) => void): UseBleDeviceReturn {
  const ctx = useBleContext();

  useEffect(() => {
    if (!onReading) return;
    return ctx.addPacketListener(onReading);
  }, [ctx, onReading]);

  return ctx;
}
