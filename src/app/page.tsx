'use client';
/* mini */
import Link from 'next/link';
import { Activity, ClipboardCheck, ShieldCheck, Users } from 'lucide-react';
import { getDashboardMetrics } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import { AnkurWordmark, SproutMark } from '@/components/brand/SproutMark';
import { ButtonLink } from '@/components/ui/Button';
import { Card, SectionHeader } from '@/components/ui/Card';
import { StatTile } from '@/components/ui/StatTile';
import { SampleDataChip } from '@/components/ui/Feedback';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';

/**
 * The public landing page.
 *
 * Renders in the default AWW field theme — a visitor who is not signed in
 * holds no role, so the brand teal is the correct skin here.
 *
 * The figures are marked as sample data. They come from src/data/mockData.ts,
 * and this page is public: presenting "42 children monitored" unqualified to
 * any visitor asserts a programme statistic that is not true.
 */
export default function PublicLandingPage() {
  const metrics = getDashboardMetrics();
  const { t } = useLanguage();

  const features = [
    { icon: ClipboardCheck, title: t('featureOfflineTitle'), body: t('featureOfflineBody') },
    { icon: Activity, title: t('featureZScoreTitle'), body: t('featureZScoreBody') },
    { icon: ShieldCheck, title: t('featureReferralTitle'), body: t('featureReferralBody') },
  ];

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans flex flex-col">
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-brand focus:text-on-primary focus:px-4 focus:py-2.5 focus:rounded-xl"
      >
        {t('skipToContent')}
      </a>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="border-b border-outline-variant bg-surface-container">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-3">
          <Link href="/" className="inline-flex min-w-0">
            <AnkurWordmark size={32} />
          </Link>
          <div className="flex-1" />
          <ThemeToggle className="hidden sm:inline-flex" />
          <LanguageToggle />
          <ButtonLink
            href="/login"
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex"
          >
            {t('loginPortalBtn')}
          </ButtonLink>
        </div>
      </header>

      <main id="main" className="flex-1">
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="px-4 sm:px-6 py-14 sm:py-20">
          <div className="max-w-3xl mx-auto text-center flex flex-col items-center gap-5">
            <SproutMark size={68} title="" />
            <h1 className="text-3xl sm:text-5xl font-bold tracking-tight text-balance">
              {t('publicWebsiteTitle')}
            </h1>
            {/* The tagline carries the brand idea: अंकुर means "sprout". */}
            <p className="text-lg sm:text-xl font-medium text-brand">{t('ankurTagline')}</p>
            <p className="text-base sm:text-lg text-on-surface-variant max-w-2xl text-balance">
              {t('publicWebsiteSubtitle')}
            </p>
            <ButtonLink href="/login" variant="primary" size="lg" className="mt-2">
              {t('loginPortalBtn')}
            </ButtonLink>
          </div>
        </section>

        {/* ── What the system does ──────────────────────────────────────── */}
        <section className="px-4 sm:px-6 pb-14 max-w-5xl mx-auto">
          <SectionHeader title={t('whatItDoes')} />
          <div className="grid gap-4 sm:grid-cols-3">
            {features.map(({ icon: Icon, title, body }) => (
              <Card key={title} className="flex flex-col gap-2">
                <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center">
                  <Icon size={20} className="text-on-primary-container" aria-hidden="true" />
                </div>
                <h3 className="font-semibold">{title}</h3>
                <p className="text-sm text-on-surface-variant leading-relaxed">{body}</p>
              </Card>
            ))}
          </div>
        </section>

        {/* ── Coverage ──────────────────────────────────────────────────── */}
        <section className="px-4 sm:px-6 pb-20 max-w-5xl mx-auto">
          <SectionHeader title={t('systemOverview')} action={<SampleDataChip />} />
          <div className="grid gap-4 sm:grid-cols-3">
            <StatTile
              icon={ShieldCheck}
              value={metrics.centres.length}
              label={t('totalCentresActive')}
            />
            <StatTile
              icon={Users}
              tone="normal"
              value={metrics.totalScreened}
              label={t('childrenMonitored')}
            />
            <StatTile
              icon={Activity}
              tone="sam"
              value={metrics.totalSam + metrics.totalMam}
              label={t('totalSamMam')}
            />
          </div>
        </section>
      </main>

      <footer className="border-t border-outline-variant bg-surface-container">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-6 flex items-center gap-3 text-sm text-on-surface-variant">
          <SproutMark size={22} title="" />
          <span>{t('footerLine')}</span>
        </div>
      </footer>
    </div>
  );
}
