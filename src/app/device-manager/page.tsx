'use client';

import React from 'react';
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
  const ble = useBleDevice();

  return (
    <AppShell
      title="ESP32 Device Manager"
      subtitle="Configure hardware identity, calibrate precision sensors, and update scale firmware."
    >
      <div className="max-w-5xl space-y-8 pb-12">
        {/* 1. Device Overview & Renaming */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
            <Cpu className="h-4 w-4 text-primary" />
            <span>Scale Status & Identity</span>
          </div>
          <DeviceInfoCard ble={ble} />
        </section>

        {/* 2. Sensor Diagnostics & Calibration */}
        <section className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
            <Sliders className="h-4 w-4 text-primary" />
            <span>Precision Sensor Calibration</span>
          </div>
          <CalibrationWizard ble={ble} />
        </section>

        {/* 3. Firmware Update Options */}
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
          {/* BLE OTA Update */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
              <Zap className="h-4 w-4 text-sky-500" />
              <span>Wireless Bluetooth OTA</span>
            </div>
            <BleOtaUpdater ble={ble} />
          </section>

          {/* USB Cable Flasher */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold uppercase tracking-wider text-muted-foreground">
              <ShieldCheck className="h-4 w-4 text-purple-500" />
              <span>Direct USB Cable Flashing</span>
            </div>
            <WebSerialFlasher />
          </section>
        </div>
      </div>
    </AppShell>
  );
}
