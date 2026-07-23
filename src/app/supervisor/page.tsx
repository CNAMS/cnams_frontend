'use client';

import Link from 'next/link';
import { getDashboardMetrics } from '@/data/mockData';
import { Users, AlertTriangle, Activity, Clock } from 'lucide-react';
import LanguageToggle from '@/components/LanguageToggle';
import { useLanguage } from '@/context/LanguageContext';

export default function DashboardHome() {
  const metrics = getDashboardMetrics();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans">

      {/* ── Header ───────────────────────────────────────────────── */}
      <header className="bg-brand px-6 py-4 flex justify-between items-center shadow-md sticky top-0 z-50">
        <div>
          <h1 className="text-xl font-bold text-white tracking-tight">{t('appTitle')}</h1>
          <p className="text-white/70 text-sm">{t('trackDOverview')}</p>
        </div>
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <Link href="/login" className="text-sm font-bold bg-white text-brand px-4 py-2 rounded-full shadow hover:bg-primary-container transition-colors">
            {t('logout')}
          </Link>
        </div>
      </header>

      {/* ── KPI row ──────────────────────────────────────────────── */}
      <main className="max-w-6xl mx-auto p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">

          <div className="bg-card border border-outline rounded-2xl p-5 flex items-center gap-4 border-t-4 border-t-brand shadow-sm">
            <div className="w-12 h-12 rounded-full bg-primary-container flex items-center justify-center flex-shrink-0">
              <Users size={24} className="text-brand" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{t('screenedThisMonth')}</p>
              <p className="text-2xl font-extrabold">{metrics.totalScreened}</p>
            </div>
          </div>

          <div className="bg-sam-container border border-outline rounded-2xl p-5 flex items-center gap-4 border-t-4 border-t-class-sam shadow-sm">
            <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center flex-shrink-0">
              <Activity size={24} className="text-class-sam" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{t('totalSamMam')}</p>
              <p className="text-2xl font-extrabold">{metrics.totalSam + metrics.totalMam}</p>
            </div>
          </div>

          <div className="bg-indeterminate-container border border-outline rounded-2xl p-5 flex items-center gap-4 border-t-4 border-t-class-indeterminate shadow-sm">
            <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center flex-shrink-0">
              <Clock size={24} className="text-class-indeterminate" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{t('nonReportingCentres')}</p>
              <p className="text-2xl font-extrabold">{metrics.nonReportingCentres.length}</p>
            </div>
          </div>

          <div className="bg-mam-container border border-outline rounded-2xl p-5 flex items-center gap-4 border-t-4 border-t-class-mam shadow-sm">
            <div className="w-12 h-12 rounded-full bg-card flex items-center justify-center flex-shrink-0">
              <AlertTriangle size={24} className="text-class-mam" />
            </div>
            <div>
              <p className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{t('pendingReferrals')}</p>
              <p className="text-2xl font-extrabold">{metrics.pendingReferrals.length}</p>
            </div>
          </div>

        </div>

        {/* ── Main grid ────────────────────────────────────────────── */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* Centres table */}
          <div className="bg-card border border-outline rounded-2xl shadow-sm overflow-hidden">
            <div className="bg-primary-container px-5 py-4 border-b border-brand/20 flex justify-between items-center">
              <h3 className="font-bold text-on-primary-container text-lg">{t('centresOverview')}</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead>
                  <tr className="border-b border-outline bg-surface text-xs font-bold uppercase tracking-wider text-on-surface-variant">
                    <th className="px-5 py-3 text-left">{t('centre')}</th>
                    <th className="px-5 py-3 text-right">{t('screened')}</th>
                    <th className="px-5 py-3 text-right">{t('sam')}</th>
                    <th className="px-5 py-3 text-right">{t('mam')}</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-outline/40">
                  {metrics.centres.map(centre => (
                    <tr key={centre.id} className="hover:bg-primary-container/30 transition-colors">
                      <td className="px-5 py-3">
                        <Link href={`/centres/${centre.id}`} className="font-semibold text-brand hover:underline">
                          {centre.name}
                        </Link>
                      </td>
                      <td className="px-5 py-3 text-right font-medium">{centre.screenedThisMonth}</td>
                      <td className="px-5 py-3 text-right">
                        <span className="inline-block bg-class-sam text-white text-xs font-bold px-2 py-0.5 rounded">{centre.samCases}</span>
                      </td>
                      <td className="px-5 py-3 text-right">
                        <span className="inline-block bg-class-mam text-on-surface text-xs font-bold px-2 py-0.5 rounded">{centre.mamCases}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Right panel */}
          <div className="space-y-6">

            {/* Pending referrals */}
            <div className="bg-card border border-outline rounded-2xl shadow-sm overflow-hidden">
              <div className="bg-primary-container px-5 py-4 border-b border-brand/20 flex justify-between items-center">
                <h3 className="font-bold text-on-primary-container text-lg">{t('pendingReferrals')}</h3>
                <Link href="/referrals" className="text-xs font-bold uppercase tracking-wider text-brand hover:underline">{t('viewAll')}</Link>
              </div>
              <ul className="divide-y divide-outline/40">
                {metrics.pendingReferrals.slice(0, 3).map(child => (
                  <li key={child.id} className="px-5 py-4 flex items-center justify-between hover:bg-primary-container/20 transition-colors">
                    <div>
                      <p className="font-bold">{child.initials} <span className="text-xs text-on-surface-variant ml-1">({child.icdsId})</span></p>
                      <p className="text-xs text-on-surface-variant mt-0.5">{child.centreName}</p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-block px-2 py-1 rounded text-xs font-bold ${child.status === 'SAM' ? 'bg-class-sam text-white' : 'bg-class-mam text-on-surface'}`}>
                        {child.status}
                      </span>
                      <p className="text-xs text-on-surface-variant mt-1">{child.daysElapsed} {t('daysElapsed')}</p>
                    </div>
                  </li>
                ))}
                {metrics.pendingReferrals.length === 0 && (
                  <li className="px-5 py-8 text-center text-on-surface-variant font-medium">{t('noPendingReferrals')}</li>
                )}
              </ul>
            </div>

            {/* Non-reporting alert */}
            {metrics.nonReportingCentres.length > 0 && (
              <div className="bg-sam-container border border-class-sam/30 rounded-2xl p-5 shadow-sm">
                <h3 className="font-bold text-class-sam flex items-center gap-2 mb-3 text-sm uppercase tracking-wider">
                  <AlertTriangle size={18} />
                  {t('nonReportingCentres')}
                </h3>
                <ul className="space-y-2">
                  {metrics.nonReportingCentres.map(c => (
                    <li key={c.id} className="text-sm font-semibold text-class-sam flex justify-between">
                      <span>{c.name}</span>
                      <span className="opacity-75">{new Date(c.lastReported).toLocaleDateString()}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

          </div>
        </div>
      </main>
    </div>
  );
}
