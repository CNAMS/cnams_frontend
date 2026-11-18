'use client';

import { useTranslations } from 'next-intl';
import React, { useState, useRef } from 'react';
import {
  Upload,
  Cpu,
  CheckCircle2,
  AlertCircle,
  Sparkles,
  Bluetooth,
  FileCode,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { useBleDevice } from '@/lib/useBleDevice';

interface BleOtaUpdaterProps {
  ble: ReturnType<typeof useBleDevice>;
}

export function BleOtaUpdater({ ble }: BleOtaUpdaterProps) {
  const t = useTranslations();
  const [file, setFile] = useState<File | null>(null);
  const [fileBuffer, setFileBuffer] = useState<ArrayBuffer | null>(null);
  const [isUpdating, setIsUpdating] = useState(false);
  const [progress, setProgress] = useState(0);
  const [speed, setSpeed] = useState(0);
  const [status, setStatus] = useState<'idle' | 'flashing' | 'success' | 'error'>('idle');
  const [errorText, setErrorText] = useState<string | null>(null);

  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const { connectionState, startBleOta, deviceName } = ble;
  const isConnected = connectionState === 'connected';

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    if (!selected.name.endsWith('.bin')) {
      setErrorText(t('fwInvalidFile'));
      return;
    }

    setFile(selected);
    setErrorText(null);
    setStatus('idle');
    setProgress(0);

    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        setFileBuffer(reader.result);
      }
    };
    reader.readAsArrayBuffer(selected);
  };

  const handleStartOta = async () => {
    if (!fileBuffer || !isConnected) return;

    setIsUpdating(true);
    setStatus('flashing');
    setProgress(0);
    setErrorText(null);

    try {
      await startBleOta(fileBuffer, (pct, speedKb) => {
        setProgress(pct);
        setSpeed(speedKb);
      });
      setStatus('success');
    } catch (err: unknown) {
      console.error('[BLE OTA] Update error:', err);
      setStatus('error');
      setErrorText(err instanceof Error ? err.message : t('otaFailed'));
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <Card flush>
      <div className="border-b border-border/60 bg-muted/30 px-6 py-4">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-control bg-brand/10 text-brand">
            <Cpu className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-base font-semibold text-foreground">
              {t('otaTitle')}
            </h3>
            <p className="text-xs text-muted-foreground">
              {t('otaSubtitle', { name: deviceName || t('dmScaleFallbackName') })}
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center py-6 text-center">
            <Bluetooth className="h-8 w-8 text-muted-foreground" />
            <p className="mt-2 text-sm text-muted-foreground">
              {t('otaConnectFirst')}
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {/* File Dropzone / Selector */}
            <div
              onClick={() => fileInputRef.current?.click()}
              className={cn(
                'group relative flex cursor-pointer flex-col items-center justify-center rounded-card border border-dashed p-6 text-center transition-all',
                file
                  ? 'border-primary/50 bg-primary/5'
                  : 'border-border/80 hover:border-primary/40 hover:bg-muted/30'
              )}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept=".bin"
                onChange={handleFileSelect}
                className="hidden"
                disabled={isUpdating}
              />
              <div className="flex h-12 w-12 items-center justify-center rounded-control bg-primary/10 text-primary transition-transform group-hover:scale-105">
                <FileCode className="h-6 w-6" />
              </div>
              {file ? (
                <div className="mt-3">
                  <p className="text-sm font-semibold text-foreground">{file.name}</p>
                  <p className="text-xs text-muted-foreground font-mono mt-0.5">
                    {(file.size / 1024).toFixed(1)} KB · {t('fwReady')}
                  </p>
                </div>
              ) : (
                <div className="mt-3">
                  <p className="text-sm font-medium text-foreground">
                    {t('fwChoose')}
                  </p>
                  <p className="text-xs text-muted-foreground mt-0.5">
                    {t('fwChooseHint')}
                  </p>
                </div>
              )}
            </div>

            {/* Flash Progress Bar */}
            {status === 'flashing' && (
              <div className="rounded-control border border-border/60 bg-card p-4 space-y-3">
                <div className="flex items-center justify-between text-xs font-semibold">
                  <span className="text-foreground">{t('otaSending')}</span>
                  <span className="text-primary font-mono">{progress}% ({speed.toFixed(1)} KB/s)</span>
                </div>
                <div className="h-2.5 w-full overflow-hidden rounded-full bg-muted">
                  <div
                    className="h-full rounded-full bg-primary transition-all duration-300 ease-out"
                    style={{ width: `${progress}%` }}
                  />
                </div>
                <p className="text-xs text-muted-foreground animate-pulse">
                  {t('otaKeepClose')}
                </p>
              </div>
            )}

            {/* Success Banner */}
            {status === 'success' && (
              <div className="flex items-center gap-3 rounded-control border border-success/40 bg-success/10 p-4 text-success">
                <CheckCircle2 className="h-5 w-5 flex-shrink-0 text-success" />
                <div className="text-xs">
                  <p className="font-semibold">{t('otaDoneTitle')}</p>
                  <p className="mt-0.5">{t('otaDoneBody')}</p>
                </div>
              </div>
            )}

            {/* Error Banner */}
            {status === 'error' && errorText && (
              <div className="flex items-center gap-3 rounded-control border border-destructive/40 bg-destructive/10 p-4 text-destructive">
                <AlertCircle className="h-5 w-5 flex-shrink-0" />
                <div className="text-xs">
                  <p className="font-semibold">{t('otaFailedTitle')}</p>
                  <p className="mt-0.5">{errorText}</p>
                </div>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center justify-end gap-3">
              <Button
                onClick={handleStartOta}
                disabled={!fileBuffer || isUpdating}
                variant="primary"
              >
                {isUpdating ? (
                  <>
                    <Upload className="mr-2 h-4 w-4 animate-bounce" />
                    {t('otaInstalling', { progress })}
                  </>
                ) : (
                  <>
                    <Sparkles className="mr-2 h-4 w-4" />
                    {t('otaStart')}
                  </>
                )}
              </Button>
            </div>
          </div>
        )}
      </div>
    </Card>
  );
}
