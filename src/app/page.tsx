'use client';
/* mini */
import Link from 'next/link';
import { getDashboardMetrics } from '@/data/mockData';
import { Activity, ShieldCheck, Users } from 'lucide-react';
import LanguageToggle from '@/components/LanguageToggle';
import { useLanguage } from '@/context/LanguageContext';

export default function PublicLandingPage() {
  const metrics = getDashboardMetrics();
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans">

      {/* ── Header ───────────────────────────────────────────────── */}
      <header className="bg-brand px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold text-white tracking-tight">{t('publicWebsiteTitle')}</h1>
        <div className="flex items-center gap-4">
          <LanguageToggle />
          <Link
            href="/login"
            className="text-sm font-bold bg-white text-brand px-4 py-2 rounded-full shadow hover:bg-primary-container transition-colors"
          >
            {t('loginPortalBtn')}
          </Link>
        </div>
      </header>

      {/* ── Hero ─────────────────────────────────────────────────── */}
      <div className="bg-primary-container border-b border-brand/20 py-16 px-6 text-center">
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-on-primary-container">{t('publicWebsiteTitle')}</h2>
        <p className="mt-4 text-lg text-on-surface-variant max-w-2xl mx-auto">{t('publicWebsiteSubtitle')}</p>
      </div>

      {/* ── Stats ────────────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-6 py-12 space-y-10">
        <h3 className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{t('systemOverview')}</h3>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

          {/* Active Centres */}
          <div className="bg-card border border-outline rounded-2xl p-6 flex flex-col gap-3 border-t-4 border-t-brand shadow-sm">
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
              <ShieldCheck size={22} className="text-brand" />
            </div>
            <span className="text-4xl font-extrabold text-on-surface">{metrics.centres.length}</span>
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{t('totalCentresActive')}</span>
          </div>

          {/* Children Monitored */}
          <div className="bg-card border border-outline rounded-2xl p-6 flex flex-col gap-3 border-t-4 border-t-class-normal shadow-sm">
            <div className="w-10 h-10 rounded-full bg-normal-container flex items-center justify-center">
              <Users size={22} className="text-class-normal" />
            </div>
            <span className="text-4xl font-extrabold text-on-surface">{metrics.totalScreened}</span>
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">{t('childrenMonitored')}</span>
          </div>

          {/* Live Tracking */}
          <div className="bg-card border border-outline rounded-2xl p-6 flex flex-col gap-3 border-t-4 border-t-class-overweight shadow-sm">
            <div className="w-10 h-10 rounded-full bg-overweight-container flex items-center justify-center">
              <Activity size={22} className="text-class-overweight" />
            </div>
            <span className="text-4xl font-extrabold text-on-surface">Live</span>
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant">Analytics Tracking</span>
          </div>

        </div>
      </main>
    </div>
  );
}
