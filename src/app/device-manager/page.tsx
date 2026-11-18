'use client';

import React from 'react';
import { useTranslations } from 'next-intl';
import dynamic from 'next/dynamic';
import { AppShell } from '@/components/nav/AppShell';
import { useBleDevice } from '@/lib/useBleDevice';
import { Cpu, ShieldCheck, Zap, Sliders } from 'lucide-react';

// Dynamic imports to prevent SSR execution of Web Bluetooth / Web Serial APIs
const DeviceInfoCard = dynamic(
  () => import('@/components/device/DeviceInfoCard').then((mod) => mod.DeviceInfoCard),
  { ssr: false }
);

const CalibrationWizard = dynamic(
  () => import('@/components/device/CalibrationWizard').then((mod) => mod.CalibrationWizard),
  { ssr: false }
);

const BleOtaUpdater = dynamic(
  () => import('@/components/device/BleOtaUpdater').then((mod) => mod.BleOtaUpdater),
  { ssr: false }
);

const WebSerialFlasher = dynamic(
  () => import('@/components/device/WebSerialFlasher').then((mod) => mod.WebSerialFlasher),
  { ssr: false }
);

export default function DeviceManagerPage() {
  const t = useTranslations();
  const ble = useBleDevice();

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
