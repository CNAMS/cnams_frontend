'use client';

/**
 * BleScaleCard — all Web Bluetooth logic lives here.
 *
 * This component is intentionally imported with `next/dynamic` + `ssr: false`
 * so it never renders on the server. This avoids the React hydration mismatch
 * (NotFoundError: insertBefore) caused by navigator.bluetooth being undefined
 * on the server while the client immediately modifies connection state.
 */

import React from 'react';
import {
  Bluetooth,
  BluetoothConnected,
  BluetoothOff,
  Lock,
  Radio,
  Ruler,
  Scale,
  Unlock,
  AlertCircle,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { useBleDevice, type ChannelReading } from '@/lib/useBleDevice';
import type { DecodedBlePacket } from '@/lib/bleCodec';

interface BleScaleCardProps {
  ageMonths?: number;
  onPacket: (packet: DecodedBlePacket) => void;
}

export function BleScaleCard({ ageMonths, onPacket }: BleScaleCardProps) {
  const {
    isSupported: isBleSupported,
    connectionState: bleState,
    deviceName: bleDeviceName,
    errorMessage: bleError,
    weight: bleWeight,
    length: bleLength,
    connect: connectBle,
    disconnect: disconnectBle,
  } = useBleDevice(onPacket);

  return (
    <Card className="border-2 border-brand/20 bg-surface-container/60 shadow-sm space-y-4">
      {/* ── Header Row ──────────────────────────────────────────────── */}
      <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant pb-3">
        <div className="flex items-center gap-2.5">
          <div
            className={cn(
              'w-9 h-9 rounded-lg flex items-center justify-center transition-colors',
              bleState === 'connected'
                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                : bleState === 'scanning' || bleState === 'connecting'
                ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 animate-pulse'
                : 'bg-surface-variant text-on-surface-variant'
            )}
          >
            {bleState === 'connected' ? (
              <BluetoothConnected size={20} />
            ) : bleState === 'scanning' || bleState === 'connecting' ? (
              <Radio size={20} className="animate-spin" />
            ) : (
              <Bluetooth size={20} />
            )}
          </div>
          <div>
            <h3 className="font-semibold text-sm flex items-center gap-2">
              <span>ESP32-S3 Wireless Scale</span>
              {bleState === 'connected' && (
                <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{bleDeviceName ?? 'Connected'}</span>
                </span>
              )}
            </h3>
            <p className="text-xs text-on-surface-variant">
              {bleState === 'connected'
                ? 'Receiving live GATT notifications from ESP32 scale'
                : bleState === 'connecting'
                ? 'Connecting to ESP32-S3...'
                : bleState === 'scanning'
                ? 'Scanning for CGMS-ANKUR-S3...'
                : isBleSupported
                ? 'Connect to ESP32-S3 for automatic measurement lock-in'
                : 'Web Bluetooth not available — use Google Chrome or MS Edge'}
            </p>
          </div>
        </div>

        <div>
          {bleState === 'connected' ? (
            <Button
              variant="ghost"
              onClick={disconnectBle}
              className="text-xs h-8 px-2.5 text-error hover:bg-error-container"
            >
              <BluetoothOff size={14} className="mr-1" />
              <span>Disconnect</span>
            </Button>
          ) : (
            <Button
              variant="primary"
              onClick={connectBle}
              disabled={!isBleSupported || bleState === 'connecting' || bleState === 'scanning'}
              className="text-xs h-8 px-3"
            >
              <Bluetooth size={14} className="mr-1.5" />
              <span>
                {bleState === 'scanning'
                  ? 'Scanning...'
                  : bleState === 'connecting'
                  ? 'Connecting...'
                  : 'Connect Scale'}
              </span>
            </Button>
          )}
        </div>
      </div>

      {/* ── Error Banner ────────────────────────────────────────────── */}
      {bleError && (
        <div className="flex items-center gap-2 p-2.5 rounded-lg bg-error-container text-on-error-container text-xs">
          <AlertCircle size={15} className="shrink-0" />
          <span>{bleError}</span>
        </div>
      )}

      {/* ── Live Gauges (only shown when connected) ─────────────────── */}
      {bleState === 'connected' && (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
          <Gauge
            label="Live Weight"
            icon={Scale}
            unit="kg"
            reading={bleWeight}
          />
          <Gauge
            label={ageMonths !== undefined && ageMonths < 24 ? 'Live Length' : 'Live Height'}
            icon={Ruler}
            unit="cm"
            reading={bleLength}
          />
        </div>
      )}
    </Card>
  );
}

// ── Internal Gauge component ─────────────────────────────────────────────────

function Gauge({
  label,
  icon: Icon,
  unit,
  reading,
}: {
  label: string;
  icon: React.ElementType;
  unit: string;
  reading: ChannelReading | null;
}) {
  const isStable = reading?.stable ?? false;

  return (
    <div
      className={cn(
        'p-3.5 rounded-xl border-2 transition-all duration-300',
        isStable
          ? 'bg-emerald-500/10 border-emerald-500/40'
          : 'bg-surface border-outline-variant'
      )}
    >
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-xs font-semibold text-on-surface-variant flex items-center gap-1.5">
          <Icon size={14} aria-hidden="true" />
          <span>{label}</span>
        </span>

        {reading ? (
          <span
            className={cn(
              'inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full',
              isStable
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
            )}
          >
            {isStable ? (
              <span className="inline-flex items-center gap-1">
                <Lock size={10} aria-hidden="true" />
                <span>Locked</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1">
                <Unlock size={10} className="animate-pulse" aria-hidden="true" />
                <span>Reading...</span>
              </span>
            )}
          </span>
        ) : (
          <span className="text-xs text-on-surface-variant">Waiting for ESP32...</span>
        )}
      </div>

      <div className="flex items-baseline justify-between">
        <span className="text-2xl font-bold tabular-nums tracking-tight">
          {reading ? reading.value : '—'}
        </span>
        <span className="text-sm font-medium text-on-surface-variant">{unit}</span>
      </div>
    </div>
  );
}
