'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { Battery, ChevronRight, Users, Wifi, WifiOff, Wrench } from 'lucide-react';
import { mockCentres, type CentreData } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { AppShell } from '@/components/nav/AppShell';
import { Card } from '@/components/ui/Card';
import { StatusBadge } from '@/components/ui/ClassificationBadge';
import { EmptyState, SampleDataChip } from '@/components/ui/Feedback';
import { cn } from '@/lib/cn';

/**
 * The centres index.
 *
 * This route did not exist — only /centres/[id] did, so a supervisor could
 * reach a centre only by clicking through from the dashboard table, and
 * /centres itself was a 404. The nav needs a real destination.
 */

const DEVICE_STATUS = {
  connected: { icon: Wifi, tone: 'text-class-normal', labelKey: 'connected' },
  calibration_overdue: { icon: Wrench, tone: 'text-class-mam', labelKey: 'calOverdue' },
  disconnected: { icon: WifiOff, tone: 'text-class-indeterminate', labelKey: 'disconnected' },
} as const;

export default function CentresPage() {
  const { t } = useLanguage();
  const { role, setRole } = useTheme();

  useEffect(() => {
    if (role !== 'supervisor') setRole('supervisor');
  }, [role, setRole]);

  return (
    <AppShell
      breadcrumbs={[{ labelKey: 'navOverview', href: '/supervisor' }, { labelKey: 'navCentres' }]}
      title={t('navCentres')}
      subtitle={t('centresSubtitle')}
      actions={<SampleDataChip />}
    >
      {mockCentres.length === 0 ? (
        <Card>
          <EmptyState icon={Users} title={t('noCentres')} />
        </Card>
      ) : (
        <ul className="grid gap-3 sm:grid-cols-2">
          {mockCentres.map((centre: CentreData) => {
            const status = DEVICE_STATUS[centre.deviceStatus];
            const StatusIcon = status.icon;
            return (
              <li key={centre.id}>
                <Link
                  href={`/centres/${centre.id}`}
                  className={cn(
                    'group block h-full rounded-2xl border border-outline-variant',
                    'bg-surface-container p-5 space-y-4',
                    'transition-colors duration-fast ease-ankur hover:border-brand',
                  )}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="min-w-0">
                      <h2 className="font-semibold truncate group-hover:text-brand">
                        {centre.name}
                      </h2>
                      <p
                        className={cn(
                          'mt-1 inline-flex items-center gap-1.5 text-sm',
                          status.tone,
                        )}
                      >
                        <StatusIcon size={14} aria-hidden="true" />
                        {t(status.labelKey)}
                      </p>
                    </div>
                    <ChevronRight
                      size={18}
                      aria-hidden="true"
                      className="shrink-0 text-on-surface-variant group-hover:text-brand"
                    />
                  </div>

                  <dl className="flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                    <div>
                      <dt className="text-xs text-on-surface-variant">{t('screened')}</dt>
                      <dd className="font-semibold tabular-nums">{centre.screenedThisMonth}</dd>
                    </div>
                    <div>
                      <dt className="text-xs text-on-surface-variant">{t('battery')}</dt>
                      <dd className="font-semibold tabular-nums inline-flex items-center gap-1">
                        <Battery size={14} aria-hidden="true" />
                        {centre.batteryPercentage}%
                      </dd>
                    </div>
                  </dl>

                  {(centre.samCases > 0 || centre.mamCases > 0) && (
                    <div className="flex flex-wrap items-center gap-2">
                      {centre.samCases > 0 && (
                        <span className="inline-flex items-center gap-1.5">
                          <StatusBadge status="SAM" subtle />
                          <span className="text-sm font-semibold tabular-nums">
                            {centre.samCases}
                          </span>
                        </span>
                      )}
                      {centre.mamCases > 0 && (
                        <span className="inline-flex items-center gap-1.5">
                          <StatusBadge status="MAM" subtle />
                          <span className="text-sm font-semibold tabular-nums">
                            {centre.mamCases}
                          </span>
                        </span>
                      )}
                    </div>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </AppShell>
  );
}
