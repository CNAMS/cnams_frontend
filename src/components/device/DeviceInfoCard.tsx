'use client';

import { useTranslations } from 'next-intl';
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
  const t = useTranslations();
  const [isRenaming, setIsRenaming] = useState(false);
  const [newName, setNewName] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [status, setStatus] = useState<{ text: string; ok: boolean } | null>(null);

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
      setStatus({ text: t('dmRenamed'), ok: true });
      setIsRenaming(false);
      setTimeout(() => setStatus(null), 3000);
    } catch (err: unknown) {
      setStatus({ text: err instanceof Error ? err.message : t('dmRenameFailed'), ok: false });
    } finally {
      setIsSaving(false);
    }
  };

  const handleFactoryReset = async () => {
    if (!confirm(t('dmFactoryResetConfirm'))) {
      return;
    }
    try {
      await factoryReset();
      setStatus({ text: t('dmResetDone'), ok: true });
      setTimeout(() => setStatus(null), 3000);
    } catch (err: unknown) {
      setStatus({ text: err instanceof Error ? err.message : t('dmResetFailed'), ok: false });
    }
  };

  return (
    <Card flush>
      {/* Header Banner */}
      <div className="flex flex-wrap items-center justify-between gap-4 border-b border-border/60 bg-muted/30 px-6 py-4">
        <div className="flex items-center gap-3">
          <div
            className={cn(
              'flex h-10 w-10 items-center justify-center rounded-control transition-colors',
              isConnected
                ? 'bg-success/15 text-success'
                : 'bg-muted text-muted-foreground'
            )}
          >
            {isConnected ? <BluetoothConnected className="h-5 w-5" /> : <Bluetooth className="h-5 w-5" />}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-lg font-semibold text-foreground">
                {deviceName || t('dmScaleFallbackName')}
              </h3>
              {isConnected && (
                <span className="inline-flex items-center gap-1 rounded-full bg-success/10 px-2 py-0.5 text-xs font-medium text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                  {t('scaleConnected')}
                </span>
              )}
            </div>
            <p className="text-xs text-muted-foreground">
              {isConnected ? `ID: ${deviceSerial || 'ESP32-S3'}` : t('dmBleDevice')}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {isConnected ? (
            <>
              <Button variant="secondary" size="sm" onClick={() => fetchDeviceInfo()} title={t('dmRefresh')} aria-label={t('dmRefresh')}>
                <RefreshCw className="h-4 w-4" />
              </Button>
              <Button variant="secondary" size="sm" onClick={handleStartRename}>
                <Edit2 className="mr-1.5 h-3.5 w-3.5" />
                {t('dmRename')}
              </Button>
              <Button variant="ghost" size="sm" onClick={disconnect} className="text-danger hover:bg-danger/10">
                {t('scaleDisconnect')}
              </Button>
            </>
          ) : (
            <Button variant="primary" onClick={connect}>
              <Bluetooth className="mr-2 h-4 w-4" />
              {connectionState === 'connecting' ? t('scaleConnecting') : connectionState === 'scanning' ? t('scaleScanning') : t('scaleConnect')}
            </Button>
          )}
        </div>
      </div>

      {/* Errors used to show in the same green as successes. */}
      {status && (
        <div
          role={status.ok ? 'status' : 'alert'}
          className={cn(
            'border-b border-outline-variant px-6 py-2 text-xs font-medium',
            status.ok ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger',
          )}
        >
          {status.text}
        </div>
      )}

      {/* Body Content */}
      <div className="p-6">
        {isConnected ? (
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Metric 1: Firmware */}
            <div className="rounded-control border border-border/60 bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-medium">{t('dmFirmware')}</span>
                <Cpu className="h-4 w-4 text-primary" />
              </div>
              <div className="mt-2 text-xl font-semibold text-foreground">
                {diagnostics?.fw || 'v1.3.0'}
              </div>
              <p className="mt-1 text-xs text-muted-foreground">
                {t('dmHardware')}: {diagnostics?.hw || 'ESP32-S3 N16R8'}
              </p>
            </div>

            {/* Metric 2: Calibration Factors */}
            <div className="rounded-control border border-border/60 bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-medium">{t('dmCalibration')}</span>
                <Sparkles className="h-4 w-4 text-warning" />
              </div>
              <div className="mt-2 text-sm font-semibold text-foreground">
                {t('dmScaleFactor')}: <span className="font-mono text-primary">{diagnostics?.w_cal ?? '420.0'}</span>
              </div>
              <p className="mt-1 text-xs text-muted-foreground font-mono">
                {t('dmEncoder')}: {diagnostics?.l_cal ?? '0.50'} mm/tick
              </p>
            </div>

            {/* Metric 3: Uptime */}
            <div className="rounded-control border border-border/60 bg-card p-4 shadow-sm">
              <div className="flex items-center justify-between text-muted-foreground">
                <span className="text-xs font-medium">{t('dmUptime')}</span>
                <Clock className="h-4 w-4 text-brand" />
              </div>
              <div className="mt-2 text-xl font-semibold text-foreground">
                {diagnostics?.uptime ? `${Math.floor(diagnostics.uptime / 60)}m ${diagnostics.uptime % 60}s` : t('dmActive')}
              </div>
              <p className="mt-1 text-xs text-muted-foreground font-mono">
                MAC: {diagnostics?.mac || deviceSerial || '94:A9:90:...'}
              </p>
            </div>

            {/* Metric 4: Factory Reset Action */}
            <div className="flex flex-col justify-between rounded-control border border-border/60 bg-card p-4 shadow-sm">
              <div>
                <span className="text-xs font-medium text-muted-foreground">
                  {t('dmMaintenance')}
                </span>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t('dmMaintenanceHint')}
                </p>
              </div>
              <Button
                variant="secondary"
                size="sm"
                onClick={handleFactoryReset}
                className="mt-3 text-xs text-muted-foreground hover:text-destructive"
              >
                <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                {t('dmFactoryReset')}
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-10 text-center">
            <div className="flex h-16 w-16 items-center justify-center rounded-card bg-muted/60 text-muted-foreground">
              <Radio className="h-8 w-8 animate-pulse" />
            </div>
            <h4 className="mt-4 text-base font-semibold text-foreground">
              {t('dmNoScale')}
            </h4>
            <p className="mt-1 max-w-sm text-sm text-muted-foreground">
              {t('dmNoScaleHint')}
            </p>
          </div>
        )}
      </div>

      {/* Rename Modal */}
      {isRenaming && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4 page-enter">
          <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="rename-scale-title"
            className="w-full max-w-md rounded-dialog border border-outline-variant bg-raised p-6 shadow-lg page-enter"
          >
            <h3 id="rename-scale-title" className="text-section font-semibold text-on-surface">
              {t('dmRenameTitle')}
            </h3>
            <p className="mt-1 text-xs text-on-surface-variant leading-relaxed">
              {t('dmRenameHint')}
            </p>

            <div className="mt-4">
              <input
                type="text"
                maxLength={24}
                value={newName}
                onChange={(e) => setNewName(e.target.value)}
                aria-label={t('dmRenameTitle')}
                autoFocus
                className="w-full h-10 rounded-control border border-outline bg-surface-container px-3 text-sm font-medium text-on-surface placeholder:text-faint focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25 shadow-xs"
                placeholder="CGMS-ANKUR-S3"
              />
            </div>

            <div className="mt-6 flex items-center justify-end gap-3">
              <Button variant="secondary" size="sm" onClick={() => setIsRenaming(false)} disabled={isSaving}>
                <X className="mr-1.5 h-4 w-4" />
                {t('cancel')}
              </Button>
              <Button variant="primary" size="sm" onClick={handleSaveRename} disabled={isSaving || !newName.trim()}>
                {isSaving ? <RefreshCw className="mr-1.5 h-4 w-4 animate-spin" /> : <Check className="mr-1.5 h-4 w-4" />}
                {t('dmSaveToScale')}
              </Button>
            </div>
          </div>
        </div>
      )}
    </Card>
  );
}
