'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, Baby, CloudOff, Ruler, Users } from 'lucide-react';
import { getDashboardMetrics } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { AppShell } from '@/components/nav/AppShell';
import { Card, SectionHeader } from '@/components/ui/Card';
import { StatTile } from '@/components/ui/StatTile';
import { StatusBadge } from '@/components/ui/ClassificationBadge';
import { EmptyState, SampleDataChip } from '@/components/ui/Feedback';
import { Button } from '@/components/ui/Button';

/**
 * The AWW's home (§EX3): today's list, screened / flagged tiles, a large
 * "new measurement" action and the sync backlog.
 *
 * Capture itself lives on the phone — this portal view is the read-side and
 * the day's summary, not a replacement for the field flow.
 */
export default function WorkerDashboard() {
  const { t } = useLanguage();
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
      <div className="space-y-8">
        {/* The primary action is the largest thing on the page — the roadmap's
            "big New measurement" and low-tap field flow. */}
        <Card elevation="raised" className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <h2 className="font-semibold">{t('newMeasurement')}</h2>
            <p className="text-sm text-on-surface-variant mt-0.5">
              {t('newMeasurementHint')}
            </p>
          </div>
          <Button variant="primary" size="lg" disabled>
            <Ruler size={18} aria-hidden="true" />
            {t('newMeasurement')}
          </Button>
        </Card>

        <section>
          <SectionHeader title={t('todayAtCentre')} />
          <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
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
          <SectionHeader title={t('flaggedCases')} />
          <Card flush>
            {flagged.length === 0 ? (
              <EmptyState icon={Baby} title={t('noFlaggedHere')} description={t('noFlaggedHereBody')} />
            ) : (
              <ul className="divide-y divide-outline-variant">
                {flagged.map((child) => (
                  <li
                    key={child.id}
                    className="px-5 py-4 flex flex-wrap items-center justify-between gap-3"
                  >
                    <div>
                      <p className="font-semibold">
                        {child.initials}
                        <span className="ml-2 text-xs font-normal text-on-surface-variant">
                          {child.icdsId}
                        </span>
                      </p>
                      <p className="text-sm text-on-surface-variant">
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
