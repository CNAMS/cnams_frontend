'use client';

/**
 * BleScaleCard — Web Bluetooth logic, live gauges, and device triggers.
 *
 * This component is imported with `next/dynamic` + `ssr: false`
 * to avoid hydration mismatches.
 */

import React, { useCallback, useRef, useEffect } from 'react';
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
  Play,
  RotateCcw,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { useBleDevice, type ChannelReading } from '@/lib/useBleDevice';
import type { DecodedBlePacket } from '@/lib/bleCodec';

interface BleScaleCardProps {
  ageMonths?: number;
  onPacket?: (packet: DecodedBlePacket) => void;
  onWeightLock?: (weightKg: string) => void;
  onLengthLock?: (lengthCm: string) => void;
}

export function BleScaleCard({
  ageMonths,
  onPacket,
  onWeightLock,
  onLengthLock,
}: BleScaleCardProps) {
  // Use refs for the lock callbacks so the BLE event handler (which fires from
  // a browser event, outside React's render cycle) always sees the latest values.
  const onWeightLockRef = useRef(onWeightLock);
  const onLengthLockRef = useRef(onLengthLock);
  const onPacketRef = useRef(onPacket);

  useEffect(() => { onWeightLockRef.current = onWeightLock; }, [onWeightLock]);
  useEffect(() => { onLengthLockRef.current = onLengthLock; }, [onLengthLock]);
  useEffect(() => { onPacketRef.current = onPacket; }, [onPacket]);

  // Stable callback reference — never recreated, always reads fresh refs
  const handleReading = useCallback((packet: DecodedBlePacket) => {
    if (onPacketRef.current) onPacketRef.current(packet);

    // Auto-fill: fire the lock handlers when ESP32 confirms a stable non-zero reading
    if (packet.stable && packet.valueRaw > 0) {
      if (packet.channel === 'weight' && onWeightLockRef.current) {
        onWeightLockRef.current(packet.valueFormatted);
      } else if (packet.channel === 'length' && onLengthLockRef.current) {
        onLengthLockRef.current(packet.valueFormatted);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // intentionally empty — refs keep it fresh without recreating

  const {
    isSupported: isBleSupported,
    connectionState: bleState,
    deviceName: bleDeviceName,
    errorMessage: bleError,
    weight: bleWeight,
    length: bleLength,
    connect: connectBle,
    disconnect: disconnectBle,
    triggerMeasurement,
    tareScale,
  } = useBleDevice(handleReading);

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
                ? 'Scale ready — press Take Measurement or click BOOT on ESP32'
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

        <div className="flex items-center gap-2">
          {bleState === 'connected' ? (
            <>
              <Button
                variant="primary"
                onClick={() => triggerMeasurement()}
                className="text-xs h-8 px-3 bg-brand hover:bg-brand/90 text-on-brand"
                title="Trigger a new measurement cycle on the ESP32 scale"
              >
                <Play size={13} className="mr-1 fill-current" />
                <span>Take Measurement</span>
              </Button>
              <Button
                variant="ghost"
                onClick={() => tareScale()}
                className="text-xs h-8 px-2 text-on-surface-variant hover:text-on-surface"
                title="Zero/Tare scale"
              >
                <RotateCcw size={13} className="mr-1" />
                <span>Zero</span>
              </Button>
              <Button
                variant="ghost"
                onClick={disconnectBle}
                className="text-xs h-8 px-2 text-error hover:bg-error-container"
              >
                <BluetoothOff size={13} className="mr-1" />
                <span>Disconnect</span>
              </Button>
            </>
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
            onUseValue={onWeightLock}
          />
          <Gauge
            label={ageMonths !== undefined && ageMonths < 24 ? 'Live Length' : 'Live Height'}
            icon={Ruler}
            unit="cm"
            reading={bleLength}
            onUseValue={onLengthLock}
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
  onUseValue,
}: {
  label: string;
  icon: React.ElementType;
  unit: string;
  reading: ChannelReading | null;
  onUseValue?: (val: string) => void;
}) {
  const isStable = reading?.stable ?? false;

  return (
    <div
      className={cn(
        'p-3.5 rounded-xl border-2 transition-all duration-300',
        isStable
          ? 'bg-emerald-500/10 border-emerald-500/50 shadow-sm'
          : 'bg-amber-500/5 border-amber-500/40'
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
              'inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full transition-colors',
              isStable
                ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 font-bold'
                : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300 animate-pulse'
            )}
          >
            {isStable ? (
              <span className="inline-flex items-center gap-1">
                <Lock size={11} className="text-emerald-600 dark:text-emerald-400" aria-hidden="true" />
                <span>Locked</span>
              </span>
            ) : (
              <span className="inline-flex items-center gap-1">
                <Unlock size={11} className="animate-pulse text-amber-600 dark:text-amber-400" aria-hidden="true" />
                <span>Stabilizing...</span>
              </span>
            )}
          </span>
        ) : (
          <span className="text-xs text-on-surface-variant">Waiting for ESP32...</span>
        )}
      </div>

      <div className="flex items-baseline justify-between">
        <span
          className={cn(
            'text-2xl font-bold tabular-nums tracking-tight transition-colors',
            isStable
              ? 'text-emerald-700 dark:text-emerald-300'
              : 'text-on-surface'
          )}
        >
          {reading ? reading.value : '—'}
        </span>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-on-surface-variant">{unit}</span>
          {reading && onUseValue && (
            <button
              type="button"
              onClick={() => onUseValue(reading.value)}
              className="text-[11px] font-semibold text-brand hover:underline inline-flex items-center gap-0.5 ml-1 px-1.5 py-0.5 rounded bg-primary-container"
            >
              <span>Use</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
