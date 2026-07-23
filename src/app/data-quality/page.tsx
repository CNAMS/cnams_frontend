'use client';

import React from 'react';
import Link from 'next/link';
import { mockDataQualityRecords, mockCentres } from '@/data/mockData';
import { ArrowLeft, RefreshCw, AlertCircle, Cpu, WifiOff } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

export default function DataQualityPage() {
  const { t } = useLanguage();
  const sevenDaysAgo = new Date(Date.now() - 7 * 24 * 60 * 60 * 1000);
  const staleDevices = mockCentres.filter(c => new Date(c.lastSync) < sevenDaysAgo);

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans">

      {/* ── Header ───────────────────────────────────────────────── */}
      <header className="bg-brand px-6 py-4 flex items-center justify-between shadow-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/supervisor" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">{t('dataQualityTitle')}</h1>
            <p className="text-white/70 text-sm">{t('dataQualitySubtitle')}</p>
          </div>
        </div>
        <LanguageToggle />
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-6">

        {/* ── KPI cards ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          <div className="bg-card border border-outline rounded-2xl p-5 flex items-center gap-4 border-t-4 border-t-class-indeterminate shadow-sm">
            <div className="w-12 h-12 rounded-full bg-indeterminate-container flex items-center justify-center flex-shrink-0">
              <Cpu size={24} className="text-class-indeterminate" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{t('engineMismatches')}</p>
              <p className="text-3xl font-extrabold">{mockDataQualityRecords.filter(r => r.type === 'engine_mismatch').length}</p>
            </div>
          </div>

          <div className="bg-mam-container border border-outline rounded-2xl p-5 flex items-center gap-4 border-t-4 border-t-class-mam shadow-sm">
            <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center flex-shrink-0">
              <AlertCircle size={24} className="text-class-mam" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{t('implausibleValues')}</p>
              <p className="text-3xl font-extrabold">{mockDataQualityRecords.filter(r => r.type === 'implausible_value').length}</p>
            </div>
          </div>

          <div className="bg-sam-container border border-outline rounded-2xl p-5 flex items-center gap-4 border-t-4 border-t-class-sam shadow-sm">
            <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center flex-shrink-0">
              <WifiOff size={24} className="text-class-sam" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{t('staleDevices7d')}</p>
              <p className="text-3xl font-extrabold">{staleDevices.length}</p>
            </div>
          </div>

        </div>

        {/* ── Diagnostics log ──────────────────────────────────────── */}
        <div className="bg-card border border-outline rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-primary-container px-6 py-4 border-b border-brand/20">
            <h3 className="font-bold text-on-primary-container text-lg">{t('diagnosticsLog')}</h3>
          </div>
          <div className="divide-y divide-outline/40">
            {mockDataQualityRecords.map(record => (
              <div key={record.id} className="p-5 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-primary-container/10 transition-colors">
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <span className={`inline-block px-2.5 py-1 rounded-full text-xs font-bold uppercase ${record.type === 'engine_mismatch' ? 'bg-class-indeterminate text-white' : 'bg-class-mam text-on-surface'}`}>
                      {record.type.replace('_', ' ')}
                    </span>
                    <span className="text-xs font-bold text-on-surface-variant">{new Date(record.timestamp).toLocaleString()}</span>
                  </div>
                  <p className="font-bold">
                    {t('centre')}: <span className="text-brand">{record.centreName}</span>{' '}
                    | Child: <code className="text-xs bg-surface px-2 py-0.5 rounded border border-outline">{record.childIcdsId}</code>
                  </p>
                  <p className="text-sm text-on-surface-variant bg-surface p-3 rounded-lg border border-outline">{record.details}</p>
                </div>
                <button className="inline-flex items-center gap-2 text-sm font-bold text-brand bg-primary-container border-2 border-brand/30 hover:bg-brand hover:text-white px-4 py-2 rounded-xl transition-colors shrink-0">
                  <RefreshCw size={16} /> {t('reevaluate')}
                </button>
              </div>
            ))}
            {mockDataQualityRecords.length === 0 && (
              <div className="p-8 text-center text-on-surface-variant font-bold text-lg">{t('noDataRecords')}</div>
            )}
          </div>
        </div>

        {/* ── Stale devices table ──────────────────────────────────── */}
        <div className="bg-card border border-outline rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-sam-container px-6 py-4 border-b border-class-sam/30">
            <h3 className="font-bold text-class-sam text-lg">{t('staleDevicesTitle')}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface border-b border-outline text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  <th className="px-6 py-4 text-left">{t('centre')}</th>
                  <th className="px-6 py-4 text-left">{t('serialNo')}</th>
                  <th className="px-6 py-4 text-left">{t('firmware')}</th>
                  <th className="px-6 py-4 text-left">{t('battery')}</th>
                  <th className="px-6 py-4 text-right">{t('lastSynced')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline/40">
                {staleDevices.map(device => (
                  <tr key={device.id} className="hover:bg-sam-container/30 transition-colors">
                    <td className="px-6 py-4 font-bold">{device.name}</td>
                    <td className="px-6 py-4"><code className="text-xs bg-surface px-2 py-0.5 rounded border border-outline font-bold">{device.serialNumber}</code></td>
                    <td className="px-6 py-4 font-medium text-on-surface-variant">{device.firmwareVersion}</td>
                    <td className="px-6 py-4">
                      <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-class-sam text-white">
                        <AlertCircle size={12}/>{device.batteryPercentage}%
                      </span>
                    </td>
                    <td className="px-6 py-4 text-right font-bold text-on-surface-variant">
                      {new Date(device.lastSync).toLocaleDateString()}
                      <span className="block text-xs opacity-60">{Math.floor((Date.now() - new Date(device.lastSync).getTime()) / 86400000)}d ago</span>
                    </td>
                  </tr>
                ))}
                {staleDevices.length === 0 && (
                  <tr><td colSpan={5} className="px-6 py-12 text-center text-on-surface-variant font-bold">{t('noStaleDetected')}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
