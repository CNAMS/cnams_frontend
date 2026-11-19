'use client';
/* mini */
import Link from 'next/link';
import {
  Activity,
  ArrowRight,
  Baby,
  ClipboardCheck,
  Cog,
  LayoutDashboard,
  ShieldCheck,
  Stethoscope,
  Users,
} from 'lucide-react';
import { getDashboardMetrics } from '@/data/mockData';
import { mockRoster } from '@/data/rosterData';
import { ROLE_PALETTES, type AppRole } from '@/theme/roles';
import { ROLE_LABEL_KEY } from '@/components/nav/navigation';
import { AnkurWordmark, SproutMark } from '@/components/brand/SproutMark';
import { SproutSplash } from '@/components/brand/SproutSplash';
import { ButtonLink } from '@/components/ui/Button';
import { Card, CardHeader } from '@/components/ui/Card';
import { StatTile } from '@/components/ui/StatTile';
import { ClassificationBadge } from '@/components/ui/ClassificationBadge';
import { SampleDataChip } from '@/components/ui/Feedback';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import { useTranslations } from 'next-intl';

/** The five roles Ankur serves, in the order they touch a child's record. */
const ROLE_SUMMARY: {
  role: AppRole;
  icon: React.ElementType;
  descriptionKey: string;
}[] = [
  { role: 'aww', icon: Baby, descriptionKey: 'roleAwwBlurb' },
  { role: 'supervisor', icon: LayoutDashboard, descriptionKey: 'roleSupervisorBlurb' },
  { role: 'doctor', icon: Stethoscope, descriptionKey: 'roleDoctorBlurb' },
  { role: 'parent', icon: Users, descriptionKey: 'roleParentBlurb' },
  { role: 'admin', icon: Cog, descriptionKey: 'roleAdminBlurb' },
];

/** A section's small heading: a short accent rule and a label, never uppercase. */
function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="flex items-center gap-2 text-eyebrow font-semibold text-brand">
      <span aria-hidden="true" className="h-px w-6 bg-brand" />
      {children}
    </p>
  );
}

/**
 * The public landing page.
 *
 * Renders in the default AWW field theme — a visitor who is not signed in
 * holds no role, so the brand teal is the correct skin here.
 *
 * Every figure and the product preview are marked as sample data. They come
 * from src/data/*, and this page is public: presenting "42 children
 * monitored" unqualified asserts a programme statistic that is not true.
 */
export default function PublicLandingPage() {
  const metrics = getDashboardMetrics();
  const t = useTranslations();
  const features = [
    { icon: ClipboardCheck, title: t('featureOfflineTitle'), body: t('featureOfflineBody') },
    { icon: Activity, title: t('featureZScoreTitle'), body: t('featureZScoreBody') },
    { icon: ShieldCheck, title: t('featureReferralTitle'), body: t('featureReferralBody') },
  ];
  const preview = mockRoster.slice(0, 4);

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans flex flex-col">
      {/* Sits over the page rather than gating it: the real content renders
          underneath from the first byte, so crawlers and reduced-motion users
          are never waiting on an animation. */}
      <SproutSplash />

      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:bg-brand focus:text-on-primary focus:px-4 focus:py-2.5 focus:rounded-control"
      >
        {t('skipToContent')}
      </a>

      {/* ── Header ──────────────────────────────────────────────────────── */}
      <header className="sticky top-0 z-40 border-b border-outline-variant bg-surface/85 backdrop-blur supports-[backdrop-filter]:bg-surface/75">
        <div className="max-w-content mx-auto h-16 px-4 sm:px-8 flex items-center gap-3">
          <Link href="/" className="inline-flex min-w-0 shrink-0 rounded-control" aria-label="Ankur">
            <AnkurWordmark size={28} />
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle className="hidden sm:inline-flex" />
            <LanguageToggle />
            <ButtonLink href="/login" variant="primary" size="sm" className="hidden sm:inline-flex">
              {t('signIn')}
            </ButtonLink>
          </div>
        </div>
      </header>

      <main id="main" className="flex-1">
        {/* ── Hero ──────────────────────────────────────────────────────── */}
        <section className="border-b border-outline-variant">
          <div className="max-w-content mx-auto px-4 sm:px-8 py-14 sm:py-20 lg:py-24 grid gap-12 lg:grid-cols-[1.05fr_1fr] lg:items-center">
            <div className="flex flex-col items-start gap-6">
              <Eyebrow>{t('landingEyebrow')}</Eyebrow>
              <h1 className="font-serif text-display font-semibold text-balance">
                {t('publicWebsiteTitle')}
              </h1>
              {/* The tagline carries the brand idea: अंकुर means "sprout". */}
              <p className="text-lg font-medium text-brand">{t('ankurTagline')}</p>
              <p className="text-base sm:text-lg text-on-surface-variant max-w-xl text-pretty">
                {t('publicWebsiteSubtitle')}
              </p>
              <div className="flex flex-wrap gap-3 pt-1">
                <ButtonLink href="/login" variant="primary" size="lg">
                  {t('loginPortalBtn')}
                  <ArrowRight size={18} aria-hidden="true" />
                </ButtonLink>
                <ButtonLink href="#features" variant="secondary" size="lg">
                  {t('landingSecondaryCta')}
                </ButtonLink>
              </div>
            </div>

            {/* A product preview built from the real components, not a
                screenshot — so it themes, translates and stays honest. */}
            <div className="relative">
              <div
                aria-hidden="true"
                className="absolute -inset-6 sm:-inset-10 rounded-[28px] bg-primary-container opacity-60 blur-2xl"
              />
              <Card flush elevation="raised" className="relative">
                <CardHeader
                  title={t('navChildren')}
                  description={t('rosterSubtitle')}
                  action={<SampleDataChip />}
                />
                <ul className="divide-y divide-outline-variant">
                  {preview.map((child) => (
                    <li key={child.id} className="flex items-center gap-3 px-5 sm:px-6 py-3">
                      <span className="grid place-items-center w-9 h-9 rounded-full bg-surface-variant border border-outline-variant text-xs font-semibold text-on-surface-variant shrink-0">
                        {child.initials}
                      </span>
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-medium truncate">{child.icdsId}</p>
                        <p className="text-xs text-faint tabular-nums">
                          {child.ageMonths} {t('months')}
                        </p>
                      </div>
                      <ClassificationBadge growthClass={child.latestClass} subtle />
                    </li>
                  ))}
                </ul>
                <div className="grid grid-cols-3 border-t border-outline-variant bg-surface-variant">
                  {[
                    { label: t('totalCentresActive'), value: metrics.centres.length },
                    { label: t('childrenMonitored'), value: metrics.totalScreened },
                    { label: t('totalSamMam'), value: metrics.totalSam + metrics.totalMam },
                  ].map((s, i) => (
                    <div
                      key={s.label}
                      className={`px-4 sm:px-5 py-3 ${i > 0 ? 'border-l border-outline-variant' : ''}`}
                    >
                      <p className="text-lg font-semibold tabular-nums">{s.value}</p>
                      <p className="text-xs text-faint leading-snug">{s.label}</p>
                    </div>
                  ))}
                </div>
              </Card>
            </div>
          </div>
        </section>

        {/* ── What the system does ──────────────────────────────────────── */}
        <section id="features" className="scroll-mt-20 border-b border-outline-variant bg-surface-container">
          <div className="max-w-content mx-auto px-4 sm:px-8 py-16 sm:py-20">
            <Eyebrow>{t('whatItDoes')}</Eyebrow>
            <div className="mt-8 grid gap-px bg-outline-variant border border-outline-variant rounded-card overflow-hidden sm:grid-cols-3">
              {features.map(({ icon: Icon, title, body }) => (
                <div key={title} className="bg-surface-container p-6 sm:p-7 flex flex-col gap-3">
                  <span className="grid place-items-center w-10 h-10 rounded-control bg-primary-container text-on-primary-container">
                    <Icon size={20} aria-hidden="true" />
                  </span>
                  <h3 className="text-section font-semibold">{title}</h3>
                  <p className="text-sm text-on-surface-variant leading-relaxed">{body}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Who it's for ──────────────────────────────────────────────────
            Each role is shown in its own accent — the same five colours the
            app and the portal switch to when that role signs in. */}
        <section className="border-b border-outline-variant">
          <div className="max-w-content mx-auto px-4 sm:px-8 py-16 sm:py-20">
            <Eyebrow>{t('whoItsFor')}</Eyebrow>
            <p className="mt-3 text-on-surface-variant max-w-2xl">{t('whoItsForHint')}</p>
            <ul className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-5">
              {ROLE_SUMMARY.map(({ role, icon: Icon, descriptionKey }) => {
                const accent = ROLE_PALETTES[role].primary;
                return (
                  <li
                    key={role}
                    className="relative rounded-card border border-outline-variant bg-surface-container p-5 flex flex-col gap-3 overflow-hidden"
                  >
                    <span
                      aria-hidden="true"
                      className="absolute inset-x-0 top-0 h-[3px]"
                      style={{ backgroundColor: accent }}
                    />
                    <span
                      className="grid place-items-center w-9 h-9 rounded-control"
                      style={{
                        backgroundColor: `color-mix(in srgb, ${accent} 12%, transparent)`,
                        color: accent,
                      }}
                    >
                      <Icon size={18} aria-hidden="true" />
                    </span>
                    <p className="font-semibold">{t(ROLE_LABEL_KEY[role])}</p>
                    <p className="text-sm text-on-surface-variant leading-relaxed">
                      {t(descriptionKey)}
                    </p>
                  </li>
                );
              })}
            </ul>
          </div>
        </section>

        {/* ── Coverage ──────────────────────────────────────────────────── */}
        <section>
          <div className="max-w-content mx-auto px-4 sm:px-8 py-16 sm:py-20">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <Eyebrow>{t('systemOverview')}</Eyebrow>
              <SampleDataChip />
            </div>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              <StatTile icon={ShieldCheck} value={metrics.centres.length} label={t('totalCentresActive')} />
              <StatTile icon={Users} tone="normal" value={metrics.totalScreened} label={t('childrenMonitored')} />
              <StatTile
                icon={Activity}
                tone="sam"
                value={metrics.totalSam + metrics.totalMam}
                label={t('totalSamMam')}
              />
            </div>

            <div className="mt-12 rounded-card border border-outline-variant bg-surface-container p-6 sm:p-8 flex flex-col sm:flex-row sm:items-center gap-5 justify-between">
              <div className="flex items-center gap-4">
                <SproutMark size={44} title="" />
                <p className="font-serif text-xl sm:text-2xl font-semibold text-balance">
                  {t('ankurTagline')}
                </p>
              </div>
              <ButtonLink href="/login" variant="primary" size="lg">
                {t('loginPortalBtn')}
                <ArrowRight size={18} aria-hidden="true" />
              </ButtonLink>
            </div>
          </div>
        </section>
      </main>

      <footer className="border-t border-outline-variant bg-surface-container">
        <div className="max-w-content mx-auto px-4 sm:px-8 py-8 flex flex-col sm:flex-row sm:items-center gap-4 justify-between text-sm text-on-surface-variant">
          <div className="flex items-center gap-3">
            <SproutMark size={22} title="" />
            <span>{t('footerLine')}</span>
          </div>
          <Link href="/login" className="hover:text-on-surface transition-colors duration-fast">
            {t('signIn')}
          </Link>
        </div>
      </footer>
    </div>
  );
}
