'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, ArrowRight, Baby, CloudOff, Ruler, Users } from 'lucide-react';
import { getDashboardMetrics } from '@/data/mockData';
import { useTheme } from '@/context/ThemeContext';
import { AppShell } from '@/components/nav/AppShell';
import { Card, CardHeader, SectionHeader } from '@/components/ui/Card';
import { StatTile } from '@/components/ui/StatTile';
import { StatusBadge } from '@/components/ui/ClassificationBadge';
import { EmptyState, SampleDataChip } from '@/components/ui/Feedback';
import { ButtonLink } from '@/components/ui/Button';
import { useTranslations } from 'next-intl';

/**
 * The AWW's home (§EX3): today's list, screened / flagged tiles, a large
 * "new measurement" action and the sync backlog.
 *
 * Capture runs on the phone and, with a Web Bluetooth browser, on the portal's
 * /worker/measure page too — so the primary action links there.
 */
export default function WorkerDashboard() {
  const t = useTranslations();
  const { role, setRole } = useTheme();
  const metrics = getDashboardMetrics();

  useEffect(() => {
    if (role !== 'aww') setRole('aww');
  }, [role, setRole]);

  // The AWW is scoped to a single centre, not the whole sector.
  const centre = metrics.centres[0];
  const flagged = metrics.pendingReferrals.filter((c) => c.centreId === centre?.id);

  return (
    <AppShell
      title={t('workerDashboard')}
      subtitle={centre?.name}
      actions={<SampleDataChip />}
    >
      <div className="space-y-6">
        {/* The primary action is the largest thing on the page — the roadmap's
            "big New measurement" and low-tap field flow. It was rendered
            disabled even after /worker/measure shipped. */}
        <section className="rounded-card border border-outline-variant bg-primary-container p-5 sm:p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-start gap-4">
            <span className="grid place-items-center w-11 h-11 rounded-card bg-brand text-on-primary shrink-0">
              <Ruler size={20} aria-hidden="true" />
            </span>
            <div>
              <h2 className="text-section font-semibold text-on-primary-container">
                {t('newMeasurement')}
              </h2>
              <p className="text-sm text-on-primary-container/80 mt-0.5">
                {t('newMeasurementHint')}
              </p>
            </div>
          </div>
          <ButtonLink href="/worker/measure" variant="primary" size="lg">
            {t('newMeasurement')}
            <ArrowRight size={18} aria-hidden="true" />
          </ButtonLink>
        </section>

        <section>
          <SectionHeader title={t('todayAtCentre')} />
          <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
            <StatTile
              icon={Users}
              value={centre?.screenedThisMonth ?? 0}
              label={t('screenedThisMonth')}
            />
            <StatTile
              icon={AlertTriangle}
              tone="sam"
              value={centre?.samCases ?? 0}
              label={t('classSam')}
            />
            <StatTile
              icon={AlertTriangle}
              tone="mam"
              value={centre?.mamCases ?? 0}
              label={t('classMam')}
            />
            <StatTile
              icon={CloudOff}
              tone="indeterminate"
              value={0}
              label={t('syncBacklog')}
              hint={t('syncBacklogHint')}
            />
          </div>
        </section>

        <section>
          <Card flush>
            <CardHeader
              title={t('flaggedCases')}
              action={
                <ButtonLink href="/worker/children" variant="ghost" size="sm">
                  {t('navChildren')}
                </ButtonLink>
              }
            />
            {flagged.length === 0 ? (
              <EmptyState icon={Baby} title={t('noFlaggedHere')} description={t('noFlaggedHereBody')} />
            ) : (
              <ul className="divide-y divide-outline-variant">
                {flagged.map((child) => (
                  <li
                    key={child.id}
                    className="px-5 sm:px-6 py-3 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium">
                        {child.initials}
                        <span className="ml-2 text-xs font-normal text-faint">{child.icdsId}</span>
                      </p>
                      <p className="text-xs text-on-surface-variant tabular-nums">
                        {child.daysElapsed} {t('daysElapsed')}
                      </p>
                    </div>
                    <StatusBadge status={child.status} />
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
