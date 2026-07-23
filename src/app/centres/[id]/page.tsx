'use client';

import React from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import { getCentreById, getChildrenByCentre } from '@/data/mockData';
import { ArrowLeft, HardDrive, Battery, CheckCircle, AlertTriangle, ShieldAlert, XCircle } from 'lucide-react';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

export default function CentreDetailPage({ params }: { params: { id: string } }) {
  const { t } = useLanguage();
  const centre = getCentreById(params.id);
  if (!centre) notFound();
  const flaggedChildren = getChildrenByCentre(centre.id);

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'connected':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase bg-class-normal text-white"><CheckCircle size={12} />{t('connected')}</span>;
      case 'calibration_overdue':
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase bg-class-mam text-on-surface"><AlertTriangle size={12} />{t('calOverdue')}</span>;
      default:
        return <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold uppercase bg-class-indeterminate text-white"><ShieldAlert size={12} />{t('disconnected')}</span>;
    }
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans">

      {/* ── Header ───────────────────────────────────────────────── */}
      <header className="bg-brand px-6 py-4 flex items-center justify-between shadow-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/supervisor" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">{centre.name}</h1>
            <p className="text-white/70 text-sm">{t('centreDrillDown')}</p>
          </div>
        </div>
        <LanguageToggle />
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-6">

        {/* ── Top 3-card row ───────────────────────────────────────── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Device card */}
          <div className="bg-card border border-outline rounded-2xl p-6 space-y-4 shadow-sm">
            <h3 className="font-bold flex items-center gap-2 text-on-surface-variant"><HardDrive size={18} />{t('deviceHardware')}</h3>
            <div className="space-y-3 text-sm">
              <div className="flex justify-between items-center"><span className="text-on-surface-variant font-semibold">{t('status')}</span>{getStatusBadge(centre.deviceStatus)}</div>
              <div className="flex justify-between items-center"><span className="text-on-surface-variant font-semibold">{t('battery')}</span>
                <span className="flex items-center gap-1 font-bold"><Battery size={14} className="text-class-normal" />{centre.batteryPercentage}%</span>
              </div>
              <div className="flex justify-between items-center"><span className="text-on-surface-variant font-semibold">{t('serialNo')}</span>
                <code className="text-xs bg-surface px-2 py-0.5 rounded border border-outline font-bold">{centre.serialNumber}</code>
              </div>
              <div className="flex justify-between items-center"><span className="text-on-surface-variant font-semibold">{t('lastSynced')}</span>
                <span className="text-xs font-bold">{new Date(centre.lastSync).toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* SAM / MAM card */}
          <div className="bg-card border border-outline rounded-2xl p-6 shadow-sm flex flex-col gap-4">
            <h3 className="font-bold text-on-surface-variant">{t('malnutritionSummary')}</h3>
            <div className="grid grid-cols-2 gap-3 flex-1">
              <div className="bg-sam-container border border-class-sam/30 rounded-xl p-4 text-center flex flex-col justify-center">
                <p className="text-xs font-bold uppercase tracking-widest text-class-sam">{t('sam')}</p>
                <p className="text-4xl font-extrabold text-class-sam mt-1">{centre.samCases}</p>
              </div>
              <div className="bg-mam-container border border-class-mam/40 rounded-xl p-4 text-center flex flex-col justify-center">
                <p className="text-xs font-bold uppercase tracking-widest text-class-mam">{t('mam')}</p>
                <p className="text-4xl font-extrabold text-class-mam mt-1">{centre.mamCases}</p>
              </div>
            </div>
            <p className="text-xs text-on-surface-variant text-center">{t('casesFromCriteria')}</p>
          </div>

          {/* Screening total — brand coloured */}
          <div className="bg-brand rounded-2xl p-6 shadow-sm flex flex-col justify-between">
            <h3 className="font-bold text-white/80">{t('screeningStatus')}</h3>
            <div>
              <p className="text-sm font-bold uppercase tracking-wide text-white/70 mt-4">{t('screenedThisMonth')}</p>
              <p className="text-5xl font-extrabold text-white mt-1">{centre.screenedThisMonth}</p>
            </div>
            <p className="text-xs bg-white/10 text-white/80 px-2 py-1 rounded w-fit mt-4">
              {t('lastReported')} {new Date(centre.lastReported).toLocaleDateString()}
            </p>
          </div>

        </div>

        {/* ── Trend chart ──────────────────────────────────────────── */}
        <div className="bg-card border border-outline rounded-2xl p-6 shadow-sm">
          <h3 className="font-bold text-on-surface-variant mb-4">{t('screeningHistory')}</h3>
          <div className="h-64">
            {centre.screeningTrend?.length ? (
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={centre.screeningTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="tealGrad" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%"  stopColor="#00695C" stopOpacity={0.25}/>
                      <stop offset="95%" stopColor="#00695C" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#B2CECA" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={{ fill:'#3F5B58', fontSize:12 }} dy={8}/>
                  <YAxis tickLine={false} axisLine={false} tick={{ fill:'#3F5B58', fontSize:12 }}/>
                  <Tooltip contentStyle={{ borderRadius:'8px', border:'1px solid #B2CECA', background:'#fff' }} labelStyle={{ fontWeight:700, color:'#003732' }} itemStyle={{ color:'#00695C', fontWeight:700 }}/>
                  <Area type="monotone" dataKey="screened" stroke="#00695C" strokeWidth={3} fill="url(#tealGrad)" />
                </AreaChart>
              </ResponsiveContainer>
            ) : (
              <div className="h-full flex items-center justify-center text-on-surface-variant font-bold">{t('noTrendData')}</div>
            )}
          </div>
        </div>

        {/* ── Flagged children table ────────────────────────────────── */}
        <div className="bg-card border border-outline rounded-2xl shadow-sm overflow-hidden">
          <div className="bg-primary-container px-6 py-4 border-b border-brand/20">
            <h3 className="font-bold text-on-primary-container text-lg">{t('flaggedCases')}</h3>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-surface border-b border-outline text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                  <th className="px-6 py-4 text-left">{t('childInitials')}</th>
                  <th className="px-6 py-4 text-left">{t('icdsId')}</th>
                  <th className="px-6 py-4 text-left">{t('classification')}</th>
                  <th className="px-6 py-4 text-left">{t('daysPending')}</th>
                  <th className="px-6 py-4 text-right">{t('referralState')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline/40">
                {flaggedChildren.map(child => (
                  <tr key={child.id} className="hover:bg-primary-container/20 transition-colors">
                    <td className="px-6 py-4 font-bold">{child.initials}</td>
                    <td className="px-6 py-4 font-mono text-xs font-bold text-on-surface-variant">{child.icdsId}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${child.status === 'SAM' ? 'bg-class-sam text-white' : 'bg-class-mam text-on-surface'}`}>
                        {child.status === 'SAM' ? <AlertTriangle size={12} /> : <AlertTriangle size={12} />}
                        {child.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-semibold text-on-surface-variant">{child.daysElapsed}d</td>
                    <td className="px-6 py-4 text-right">
                      {child.referred
                        ? <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-mam-container text-class-mam"><AlertTriangle size={12}/>{t('pendingOutcome')}</span>
                        : <span className="inline-flex items-center gap-1 text-xs font-bold px-2.5 py-1 rounded-full bg-class-sam text-white"><XCircle size={12}/>{t('notReferred')}</span>}
                    </td>
                  </tr>
                ))}
                {flaggedChildren.length === 0 && (
                  <tr><td colSpan={5} className="px-6 py-8 text-center text-on-surface-variant font-bold">{t('noFlaggedHere')}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
