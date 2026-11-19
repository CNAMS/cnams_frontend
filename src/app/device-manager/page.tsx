'use client';

import React, { useState, useEffect } from 'react';
import { useTranslations } from 'next-intl';
import { AppShell } from '@/components/nav/AppShell';
import { useBleDevice } from '@/lib/useBleDevice';
import { DeviceInfoCard } from '@/components/device/DeviceInfoCard';
import { CalibrationWizard } from '@/components/device/CalibrationWizard';
import { BleOtaUpdater } from '@/components/device/BleOtaUpdater';
import { WebSerialFlasher } from '@/components/device/WebSerialFlasher';
import { Cpu, ShieldCheck, Zap, Sliders } from 'lucide-react';

export default function DeviceManagerPage() {
  const t = useTranslations();
  const ble = useBleDevice();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <AppShell
        title={t('dmTitle')}
        subtitle={t('dmSubtitle')}
      >
        <div className="max-w-5xl space-y-8 pb-12">
          <div className="h-48 rounded-xl border border-border/60 bg-muted/20 animate-pulse" />
          <div className="h-64 rounded-xl border border-border/60 bg-muted/20 animate-pulse" />
        </div>
      </AppShell>
    );
  }

  return (
    <AppShell
      title={t('dmTitle')}
      subtitle={t('dmSubtitle')}
    >
      <div className="space-y-6">
        {/* 1. Device Overview & Renaming */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-section font-semibold text-on-surface">
            <Cpu className="h-4 w-4 text-brand" aria-hidden="true" />
            <span>{t('dmSectionStatus')}</span>
          </div>
          <DeviceInfoCard ble={ble} />
        </section>

        {/* 2. Sensor Diagnostics & Calibration */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-section font-semibold text-on-surface">
            <Sliders className="h-4 w-4 text-brand" aria-hidden="true" />
            <span>{t('dmSectionCalibration')}</span>
          </div>
          <CalibrationWizard ble={ble} />
        </section>

        {/* 3. Firmware Update Options */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
          {/* BLE OTA Update */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-section font-semibold text-on-surface">
              <Zap className="h-4 w-4 text-brand" />
              <span>{t('dmSectionOta')}</span>
            </div>
            <BleOtaUpdater ble={ble} />
          </section>

          {/* USB Cable Flasher */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-section font-semibold text-on-surface">
              <ShieldCheck className="h-4 w-4 text-brand" />
              <span>{t('dmSectionUsb')}</span>
            </div>
            <WebSerialFlasher />
          </section>
        </div>
      </div>
    </AppShell>
  );
}
