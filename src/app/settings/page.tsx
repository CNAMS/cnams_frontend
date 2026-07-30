'use client';

import React from 'react';
import { Globe, Info, Palette, ShieldCheck, UserCog } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { APP_ROLES, type AppRole } from '@/theme/roles';
import { ROLE_LABEL_KEY } from '@/components/nav/navigation';
import { AppShell } from '@/components/nav/AppShell';
import { Card, SectionHeader } from '@/components/ui/Card';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import { SproutMark } from '@/components/brand/SproutMark';
import { cn } from '@/lib/cn';

/**
 * Settings — shared by every role.
 *
 * The language switch lives here because §P1 requires it to be reachable from
 * Settings and to persist across restarts, not only from a header control that
 * disappears on small screens.
 */

function Row({
  icon: Icon,
  title,
  description,
  control,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
  control: React.ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
      <div className="flex items-start gap-3 min-w-0">
        <div className="w-9 h-9 rounded-full bg-primary-container flex items-center justify-center shrink-0">
          <Icon size={17} className="text-on-primary-container" aria-hidden="true" />
        </div>
        <div className="min-w-0">
          <p className="font-semibold">{title}</p>
          <p className="text-sm text-on-surface-variant leading-relaxed">{description}</p>
        </div>
      </div>
      <div className="shrink-0">{control}</div>
    </div>
  );
}

export default function SettingsPage() {
  const { t } = useLanguage();
  const { role, setRole } = useTheme();

  return (
    <AppShell title={t('navSettings')} subtitle={t('settingsSubtitle')}>
      <div className="max-w-3xl space-y-8">
        {/* ── Appearance & language ─────────────────────────────────────── */}
        <section>
          <SectionHeader title={t('settingsGeneral')} />
          <Card className="divide-y divide-outline-variant">
            <Row
              icon={Globe}
              title={t('settingsLanguage')}
              description={t('settingsLanguageHint')}
              control={<LanguageToggle />}
            />
            <Row
              icon={Palette}
              title={t('settingsTheme')}
              description={t('settingsThemeHint')}
              control={<ThemeToggle />}
            />
          </Card>
        </section>

        {/* ── Role switcher ─────────────────────────────────────────────────
            A development affordance, labelled as one. Once the identity layer
            lands (EX2) the role comes from the signed-in account and this
            becomes read-only — pretending otherwise now would hide that the
            portal has no real authorisation yet. */}
        <section>
          <SectionHeader title={t('settingsRole')} description={t('settingsRoleHint')} />
          <Card>
            <div
              role="radiogroup"
              aria-label={t('settingsRole')}
              className="grid grid-cols-2 sm:grid-cols-3 gap-2"
            >
              {APP_ROLES.map((r: AppRole) => {
                const active = role === r;
                return (
                  <button
                    key={r}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setRole(r)}
                    className={cn(
                      'flex items-center justify-center gap-2 rounded-xl border-2',
                      'min-h-touch px-3 text-sm font-medium',
                      'transition-colors duration-fast ease-ankur',
                      active
                        ? 'border-brand bg-primary-container text-on-primary-container'
                        : 'border-outline-variant text-on-surface-variant hover:bg-surface-variant',
                    )}
                  >
                    <UserCog size={16} aria-hidden="true" />
                    {t(ROLE_LABEL_KEY[r])}
                  </button>
                );
              })}
            </div>
          </Card>
        </section>

        {/* ── Data & privacy ────────────────────────────────────────────── */}
        <section>
          <SectionHeader title={t('settingsPrivacy')} />
          <Card className="space-y-3">
            <div className="flex items-start gap-3">
              <ShieldCheck size={18} className="text-class-normal shrink-0 mt-0.5" aria-hidden="true" />
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {t('settingsPrivacyBody')}
              </p>
            </div>
          </Card>
        </section>

        {/* ── About ─────────────────────────────────────────────────────── */}
        <section>
          <SectionHeader title={t('settingsAbout')} />
          <Card className="flex items-start gap-4">
            <SproutMark size={44} title="" />
            <div className="min-w-0 space-y-2">
              <div>
                <p className="font-semibold">
                  अंकुर <span className="opacity-70">Ankur</span>
                </p>
                <p className="text-sm text-on-surface-variant">{t('ankurTagline')}</p>
              </div>
              <dl className="text-sm space-y-1">
                <div className="flex gap-2">
                  <dt className="text-on-surface-variant">{t('aboutPortalVersion')}</dt>
                  <dd className="font-medium tabular-nums">0.2.0</dd>
                </div>
                <div className="flex gap-2">
                  <dt className="text-on-surface-variant">{t('aboutEngine')}</dt>
                  <dd className="font-medium">WHO LMS 2006</dd>
                </div>
              </dl>
              <p className="flex items-start gap-2 text-xs text-on-surface-variant">
                <Info size={13} className="shrink-0 mt-0.5" aria-hidden="true" />
                {t('aboutMockNotice')}
              </p>
            </div>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
