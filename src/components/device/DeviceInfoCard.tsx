'use client';

import React, { useState } from 'react';
import {
  Cpu,
  Edit2,
  RefreshCw,
  Bluetooth,
  BluetoothConnected,
  RotateCcw,
  Check,
  X,
  Radio,
  Clock,
  Sparkles,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { useBleDevice } from '@/lib/useBleDevice';

interface DeviceInfoCardProps {
  ble: ReturnType<typeof useBleDevice>;
}

export function DeviceInfoCard({ ble }: DeviceInfoCardProps) {
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [statusMsg, setStatusMsg] = useState<string | null>(null);

  const {
    connectionState,
    deviceName,
    deviceSerial,
    diagnostics,
    connect,
    disconnect,
    renameDevice,
    factoryReset,
    fetchDeviceInfo,
  } = ble;

  const isConnected = connectionState === 'connected';

  const handleStartRename = () => {
    setNewName(deviceName || 'CGMS-ANKUR-S3');
    setIsRenaming(true);
  };

  const handleSaveRename = async () => {
    if (!newName.trim()) return;
    setIsSaving(true);
    try {
      await renameDevice(newName.trim());
      setStatusMsg('Device name updated successfully!');
      setIsRenaming(false);
      setTimeout(() => setStatusMsg(null), 3000);
    } catch (err: unknown) {
      setStatusMsg(err instanceof Error ? err.message : 'Failed to rename');
    } finally {
      setIsSaving(false);
    }
  };

  const handleFactoryReset = async () => {
    if (!confirm('Are you sure you want to reset all calibration and name settings to factory defaults?')) {
      return;
    }
    try {
      await factoryReset();
      setStatusMsg('Device reset to factory defaults.');
      setTimeout(() => setStatusMsg(null), 3000);
    } catch (err: unknown) {
      setStatusMsg(err instanceof Error ? err.message : 'Reset failed');
    }
  };

  return (
    <Card className="overflow-hidden border-border/80 shadow-md">
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 bg-muted/30 px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-xl transition-colors',
              isConnected
                ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                : 'bg-muted text-muted-foreground'
            )}
          >
            {isConnected ? <BluetoothConnected className="h-5 w-5" /> : <Bluetooth className="h-5 w-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-foreground">
                {deviceName || 'ESP32 Smart Scale'}
              </h3>
              {isConnected && (
                <span className="inline-flex items-center gap-1 rounded-full bg-emerald-500/10 px-2 py-0.5 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Connected
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {isConnected ? `ID: ${deviceSerial || 'ESP32-S3'}` : 'Bluetooth Low Energy Device'}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              <Button variant="secondary" size="sm" onClick={() => fetchDeviceInfo()} title="Refresh Diagnostics">
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="sm" onClick={handleStartRename}>
                <Edit2 className="mr-1.5 h-3.5 w-3.5" />
                Rename
              </Button>
              <Button variant="ghost" size="sm" onClick={disconnect} className="text-rose-600 hover:bg-rose-500/10">
                Disconnect
              </Button>
            </>
          ) : (
            <Button
              onClick={connect}
              className="bg-emerald-600 hover:bg-emerald-700 text-white shadow-sm transition-all"
            >
              <Bluetooth className="mr-2 h-4 w-4" />
              {connectionState === 'connecting' ? 'Connecting... (Click to pick)' : connectionState === 'scanning' ? 'Scanning...' : 'Connect Scale'}
            </Button>
          )}
        </div>
      </div>

      {statusMsg && (
        <div className="border-b border-border/40 bg-emerald-500/10 px-6 py-2 text-xs font-medium text-emerald-700 dark:text-emerald-300">
          {statusMsg}
        </div>
      )}

      {/* Body Content */}
      <div className="p-6">
        {isConnected ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Metric 1: Firmware */}
            <div className="rounded-xl border border-border/60 bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-medium uppercase tracking-wider">Firmware</span>
                <Cpu className="h-4 w-4 text-primary" />
              </div>
              <div className="mt-2 text-xl font-bold text-foreground">
                {diagnostics?.fw || 'v1.3.0'}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                Hardware: {diagnostics?.hw || 'ESP32-S3 N16R8'}
              </p>
            </div>

            {/* Metric 2: Calibration Factors */}
            <div className="rounded-xl border border-border/60 bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-medium uppercase tracking-wider">Calibration</span>
                <Sparkles className="h-4 w-4 text-amber-500" />
              </div>
              <div className="mt-2 text-sm font-semibold text-foreground">
                Scale: <span className="font-mono text-primary">{diagnostics?.w_cal ?? '420.0'}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground font-mono">
                Encoder: {diagnostics?.l_cal ?? '0.50'} mm/tick
              </p>
            </div>

            {/* Metric 3: Uptime */}
            <div className="rounded-xl border border-border/60 bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-medium uppercase tracking-wider">Uptime</span>
                <Clock className="h-4 w-4 text-sky-500" />
              </div>
              <div className="mt-2 text-xl font-bold text-foreground">
                {diagnostics?.uptime ? `${Math.floor(diagnostics.uptime / 60)}m ${diagnostics.uptime % 60}s` : 'Active'}
              </div>
              <p className="mt-1 text-xs text-muted-foreground font-mono">
                MAC: {diagnostics?.mac || deviceSerial || '94:A9:90:...'}
              </p>
            </div>

            {/* Metric 4: Factory Reset Action */}
            <div className="flex flex-col justify-between rounded-xl border border-border/60 bg-card p-4 shadow-sm">
              <div>
                <span className="text-xs font-medium uppercase tracking-wider text-muted-foreground">
                  Maintenance
                </span>
                <p className="mt-1 text-xs text-muted-foreground">
                  Restore default factory calibration
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleFactoryReset}
                className="mt-3 text-xs text-muted-foreground hover:text-destructive"
              >
                <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                Factory Reset
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-muted/60 text-muted-foreground">
              <Radio className="h-8 w-8 animate-pulse" />
            </div>
            <h4 className="mt-4 text-base font-semibold text-foreground">
              No Hardware Scale Connected
            </h4>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              Turn on your ESP32-S3 scale and click &ldquo;Connect Scale&rdquo; to manage settings, calibrate sensors, and update firmware.
            </p>
          </div>
        )}
      </div>

      {/* Rename Modal */}
      {isRenaming && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-md">
          <div className="w-full max-w-md rounded-2xl border-2 border-outline/30 bg-surface-container p-6 shadow-2xl animate-in fade-in zoom-in-95">
            <h3 className="text-lg font-bold text-on-surface">Rename Scale</h3>
            <p className="mt-1 text-xs text-on-surface-variant leading-relaxed">
              Enter a custom identifier for this scale (e.g. &ldquo;CGMS-ROOM-1&rdquo; or &ldquo;SCALE-ANM-02&rdquo;). Max 24 characters.
            </p>

            <div className="mt-4">
              <input
                type="text"
                maxLength={24}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                className="w-full rounded-xl border-2 border-outline/40 bg-surface-variant px-4 py-2.5 text-sm font-semibold text-on-surface placeholder:text-on-surface-variant/50 focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 shadow-inner"
                placeholder="CGMS-ANKUR-S3"
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <Button variant="secondary" size="sm" onClick={() => setIsRenaming(false)} disabled={isSaving}>
                <X className="mr-1.5 h-4 w-4" />
                Cancel
              </Button>
              <Button size="sm" onClick={handleSaveRename} disabled={isSaving || !newName.trim()} className="bg-brand text-on-primary hover:bg-brand-dark shadow-sm">
                {isSaving ? <RefreshCw className="mr-1.5 h-4 w-4 animate-spin" /> : <Check className="mr-1.5 h-4 w-4" />}
                Save to ESP32
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
