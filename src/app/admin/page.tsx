'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import {
  Activity,
  BarChart3,
  ChevronRight,
  Cog,
  ScrollText,
  Users,
  type LucideIcon,
} from 'lucide-react';
import { mockCentres } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { AppShell } from '@/components/nav/AppShell';
import { Card, SectionHeader } from '@/components/ui/Card';
import { StatTile } from '@/components/ui/StatTile';
import { SampleDataChip } from '@/components/ui/Feedback';
import { cn } from '@/lib/cn';

/**
 * The admin console (§EX3).
 *
 * Follows the roadmap's "never cramp" rule explicitly: the admin surface holds
 * users, centres, two separate analytics views, config and audit, so this page
 * shows summary cards and routes the depth to sub-pages rather than trying to
 * fit all of it into one scroll.
 *
 * Note the two distinct analytics destinations the roadmap insists on —
 * programme analytics (child health outcomes) and app analytics (system health:
 * adoption, sync backlog, crash-free rate). They are deliberately not merged.
 */

type Destination = {
  href: string;
  labelKey: string;
  descriptionKey: string;
  icon: LucideIcon;
  built?: boolean;
};

const DESTINATIONS: Destination[] = [
  { href: '/admin/users', labelKey: 'navUsers', descriptionKey: 'adminUsersHint', icon: Users },
  {
    href: '/admin/analytics',
    labelKey: 'navAnalytics',
    descriptionKey: 'adminProgramHint',
    icon: BarChart3,
  },
  {
    href: '/admin/app-health',
    labelKey: 'navAppHealth',
    descriptionKey: 'adminAppHealthHint',
    icon: Activity,
  },
  { href: '/admin/config', labelKey: 'navConfig', descriptionKey: 'adminConfigHint', icon: Cog },
  { href: '/admin/audit', labelKey: 'adminAudit', descriptionKey: 'adminAuditHint', icon: ScrollText },
];

export default function AdminDashboard() {
  const { t } = useLanguage();
  const { role, setRole } = useTheme();

  useEffect(() => {
    if (role !== 'admin') setRole('admin');
  }, [role, setRole]);

  const connected = mockCentres.filter((c) => c.deviceStatus === 'connected').length;

  return (
    <AppShell title={t('adminConsole')} subtitle={t('adminConsoleSubtitle')} actions={<SampleDataChip />}>
      <div className="space-y-8">
        <section>
          <SectionHeader title={t('systemOverview')} />
          <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
            <StatTile icon={Users} value={5} label={t('activeUsers')} />
            <StatTile icon={Activity} value={mockCentres.length} label={t('totalCentresActive')} />
            <StatTile
              tone="normal"
              value={`${connected}/${mockCentres.length}`}
              label={t('devicesOnline')}
            />
            <StatTile tone="indeterminate" value={0} label={t('deadLetters')} />
          </div>
        </section>

        <section>
          <SectionHeader title={t('manage')} description={t('manageHint')} />
          <ul className="grid gap-3 sm:grid-cols-2">
            {DESTINATIONS.map(({ href, labelKey, descriptionKey, icon: Icon, built }) => {
              const content = (
                <>
                  <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shrink-0">
                    <Icon size={19} className="text-on-primary-container" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold">{t(labelKey)}</p>
                    <p className="text-sm text-on-surface-variant">{t(descriptionKey)}</p>
                  </div>
                </>
              );

              // Not yet built — rendered as a disabled card rather than hidden,
              // so the shape of the console stays visible without 404s.
              return (
                <li key={href}>
                  {built ? (
                    <Link
                      href={href}
                      className={cn(
                        'group flex items-center gap-3 h-full p-4 rounded-2xl',
                        'bg-surface-container border border-outline-variant',
                        'transition-colors duration-fast ease-ankur hover:border-brand',
                      )}
                    >
                      {content}
                      <ChevronRight size={18} aria-hidden="true" className="text-on-surface-variant" />
                    </Link>
                  ) : (
                    <Card
                      className="flex items-center gap-3 h-full opacity-60"
                      aria-disabled="true"
                    >
                      {content}
                      <span className="text-[10px] uppercase tracking-wide rounded-full bg-surface-variant px-2 py-0.5 shrink-0">
                        {t('navComingSoon')}
                      </span>
                    </Card>
                  )}
                </li>
              );
            })}
          </ul>
        </section>
      </div>
    </AppShell>
  );
}
