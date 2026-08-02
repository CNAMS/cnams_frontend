'use client';
/* mini */
import Link from 'next/link';
import { Activity, Baby, ClipboardCheck, Cog, LayoutDashboard, ShieldCheck, Stethoscope, Users } from 'lucide-react';
import { getDashboardMetrics } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import type { AppRole } from '@/theme/roles';
import type { TranslationKey } from '@/data/translations';
import { ROLE_LABEL_KEY } from '@/components/nav/navigation';
import { AnkurWordmark, SproutMark } from '@/components/brand/SproutMark';
import { SproutSplash } from '@/components/brand/SproutSplash';
import { ButtonLink } from '@/components/ui/Button';
import { Card, SectionHeader } from '@/components/ui/Card';
import { StatTile } from '@/components/ui/StatTile';
import { SampleDataChip } from '@/components/ui/Feedback';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';

/** The five roles Ankur serves, in the order they touch a child's record. */
const ROLE_SUMMARY: {
  role: AppRole;
  icon: React.ElementType;
  descriptionKey: TranslationKey;
}[] = [
  { role: 'aww', icon: Baby, descriptionKey: 'roleAwwBlurb' },
  { role: 'supervisor', icon: LayoutDashboard, descriptionKey: 'roleSupervisorBlurb' },
  { role: 'doctor', icon: Stethoscope, descriptionKey: 'roleDoctorBlurb' },
  { role: 'parent', icon: Users, descriptionKey: 'roleParentBlurb' },
  { role: 'admin', icon: Cog, descriptionKey: 'roleAdminBlurb' },
];

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
      {/* Sits over the page rather than gating it: the real content renders
          underneath from the first byte, so crawlers and reduced-motion users
          are never waiting on an animation. */}
      <SproutSplash />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-brand focus:text-on-primary focus:px-4 focus:py-2.5 focus:rounded-xl"
      >
        {t('skipToContent')}
      </a>

      {/* ── Floating pill header ────────────────────────────────────────── */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-5xl">
        <div className="bg-surface-container/85 backdrop-blur-xl border border-outline-variant rounded-full px-6 sm:px-8 py-3 flex items-center gap-4 sm:gap-6 shadow-lg shadow-black/[0.06]">
          <Link href="/" className="inline-flex min-w-0 shrink-0">
            <AnkurWordmark size={30} />
          </Link>
          <div className="flex-1" />
          <ThemeToggle className="hidden sm:inline-flex" />
          <LanguageToggle />
          <ButtonLink
            href="/login"
            variant="primary"
            size="sm"
            className="hidden sm:inline-flex rounded-full"
          >
            {t('loginPortalBtn')}
          </ButtonLink>
        </div>
      </header>

      <main id="main" className="flex-1">
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="px-4 sm:px-6 pt-24 sm:pt-28 pb-20 sm:pb-32">
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
        <section className="px-4 sm:px-6 pb-20 sm:pb-28 max-w-5xl mx-auto">
          <SectionHeader title={t('whatItDoes')} />
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-3">
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

        {/* ── Who it's for ──────────────────────────────────────────────────
            Ankur is a five-role product, and the landing page described none
            of them — a visitor could not tell whether it was for them. */}
        <section className="px-4 sm:px-6 pb-20 sm:pb-28 max-w-5xl mx-auto">
          <SectionHeader title={t('whoItsFor')} description={t('whoItsForHint')} />
          <ul className="grid gap-5 sm:gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {ROLE_SUMMARY.map(({ role, icon: Icon, descriptionKey }) => (
              <li key={role}>
                <Card className="flex items-start gap-3 h-full">
                  <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                    <Icon size={17} className="text-on-primary-container" aria-hidden="true" />
                  </div>
                  <div className="min-w-0">
                    <p className="font-semibold">{t(ROLE_LABEL_KEY[role])}</p>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      {t(descriptionKey)}
                    </p>
                  </div>
                </Card>
              </li>
            ))}
          </ul>
        </section>

        {/* ── Coverage ──────────────────────────────────────────────────── */}
        <section className="px-4 sm:px-6 pb-28 sm:pb-36 max-w-5xl mx-auto">
          <SectionHeader title={t('systemOverview')} action={<SampleDataChip />} />
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-3">
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
