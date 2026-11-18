'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, Clock, Inbox, TrendingUp, Users } from 'lucide-react';
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { getDashboardMetrics } from '@/data/mockData';
import { mockProgrammeTrend } from '@/data/rosterData';
import { styleFor } from '@/theme/classification';
import { useTheme } from '@/context/ThemeContext';
import { chartGrid, chartLegend, chartTooltip } from '@/components/ui/chartTheme';
import { AppShell } from '@/components/nav/AppShell';
import { Card, CardHeader } from '@/components/ui/Card';
import { StatTile } from '@/components/ui/StatTile';
import { DataTable, type Column } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/ClassificationBadge';
import { EmptyState, SampleDataChip } from '@/components/ui/Feedback';
import { ButtonLink } from '@/components/ui/Button';
import type { CentreData, FlaggedChild } from '@/data/mockData';
import { useTranslations } from 'next-intl';

/**
 * The supervisor's sector rollup (§EX3): children screened across centres,
 * SAM/MAM counts, overdue centres and referral follow-up.
 */
export default function SupervisorDashboard() {
  const metrics = getDashboardMetrics();
  const t = useTranslations();
  const { role, setRole } = useTheme();

  // Landing here directly (a bookmark, a deep link, a page refresh) should put
  // the portal in the supervisor skin rather than leaving whatever role was
  // last stored. Real route guards arrive with the identity layer in EX2.
  useEffect(() => {
    if (role !== 'supervisor') setRole('supervisor');
  }, [role, setRole]);

  const centreColumns: Column<CentreData>[] = [
    {
      key: 'name',
      header: t('centre'),
      primary: true,
      cell: (c) => (
        <Link href={`/centres/${c.id}`} className="font-medium text-brand hover:underline">
          {c.name}
        </Link>
      ),
    },
    {
      key: 'screened',
      header: t('screened'),
      align: 'right',
      cell: (c) => <span className="tabular-nums">{c.screenedThisMonth}</span>,
    },
    {
      key: 'sam',
      header: t('sam'),
      align: 'right',
      cell: (c) =>
        c.samCases > 0 ? (
          <span className="inline-flex items-center gap-1.5">
            <StatusBadge status="SAM" subtle />
            <span className="tabular-nums font-semibold">{c.samCases}</span>
          </span>
        ) : (
          <span className="text-on-surface-variant tabular-nums">0</span>
        ),
    },
    {
      key: 'mam',
      header: t('mam'),
      align: 'right',
      cell: (c) =>
        c.mamCases > 0 ? (
          <span className="inline-flex items-center gap-1.5">
            <StatusBadge status="MAM" subtle />
            <span className="tabular-nums font-semibold">{c.mamCases}</span>
          </span>
        ) : (
          <span className="text-on-surface-variant tabular-nums">0</span>
        ),
    },
  ];

  return (
    <AppShell
      title={t('sectorOverview')}
      subtitle={t('supervisorSubtitle')}
      actions={
        <>
          <SampleDataChip />
          <ButtonLink href="/referrals" variant="primary" size="sm">
            <Inbox size={16} aria-hidden="true" />
            {t('pendingReferrals')}
          </ButtonLink>
        </>
      }
    >
      <div className="space-y-6">
        {/* ── Sector rollup ─────────────────────────────────────────────── */}
        <section aria-label={t('sectorOverview')}>
          <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
            <StatTile
              icon={Users}
              value={metrics.totalScreened}
              label={t('screenedThisMonth')}
            />
            <StatTile
              icon={AlertTriangle}
              tone="sam"
              value={metrics.totalSam}
              label={t('classSam')}
              hint={`${t('mam')}: ${metrics.totalMam}`}
            />
            <StatTile
              icon={Clock}
              tone="indeterminate"
              value={metrics.nonReportingCentres.length}
              label={t('nonReportingCentres')}
            />
            <StatTile
              icon={Inbox}
              tone="mam"
              value={metrics.pendingReferrals.length}
              label={t('pendingReferrals')}
            />
          </div>
        </section>

        {/* ── Non-reporting alert ───────────────────────────────────────────
            Sits above the tables: a centre that has not reported in 30 days is
            the one thing on this page that needs acting on today. */}
        {metrics.nonReportingCentres.length > 0 && (
          <section
            aria-labelledby="non-reporting"
            className="relative overflow-hidden rounded-card border border-outline-variant bg-surface-container pl-5 pr-4 py-4"
          >
            <span aria-hidden="true" className="absolute inset-y-0 left-0 w-[3px] bg-class-sam" />
            <div className="flex flex-col gap-3 sm:flex-row sm:items-start">
              <h2
                id="non-reporting"
                className="flex items-center gap-2 text-sm font-semibold text-on-surface shrink-0 sm:w-56"
              >
                <AlertTriangle size={16} aria-hidden="true" className="text-class-sam" />
                {t('nonReportingCentres')}
              </h2>
              <ul className="flex-1 grid gap-x-6 gap-y-1.5 sm:grid-cols-2">
                {metrics.nonReportingCentres.map((c) => (
                  <li key={c.id} className="flex items-baseline justify-between gap-3 text-sm">
                    <Link href={`/centres/${c.id}`} className="font-medium hover:underline truncate">
                      {c.name}
                    </Link>
                    <span className="text-faint whitespace-nowrap tabular-nums">
                      {t('lastReported')} {new Date(c.lastReported).toLocaleDateString()}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </section>
        )}

        <div className="grid gap-6 lg:grid-cols-3">
        {/* ── Sector trend ──────────────────────────────────────────────────
            The dashboard previously showed only "now" — four counts with no
            indication of direction. A supervisor's actual question is whether
            things are improving, which a single month cannot answer. */}
        <section className="lg:col-span-2">
          <Card flush className="h-full">
            <CardHeader
              title={t('analyticsMalnutritionTrend')}
              description={t('analyticsTrendHint')}
            />
            <div className="h-64 px-3 sm:px-4 pt-4 pb-2">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={mockProgrammeTrend}
                  margin={{ top: 8, right: 8, left: -22, bottom: 0 }}
                >
                  <CartesianGrid {...chartGrid} />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: 'var(--text-faint)', fontSize: 12 }}
                    dy={8}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                    tick={{ fill: 'var(--text-faint)', fontSize: 12 }}
                  />
                  <Tooltip
                    {...chartTooltip}
                  />
                  <Legend {...chartLegend} />
                  <Line
                    type="monotone"
                    dataKey="sam"
                    name={t('classSam')}
                    stroke={styleFor('sam').color}
                    strokeWidth={2}
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="mam"
                    name={t('classMam')}
                    stroke={styleFor('mam').color}
                    strokeWidth={2}
                    strokeDasharray="5 4"
                    dot={false}
                    activeDot={{ r: 4 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>

        {/* ── Pending referrals ─────────────────────────────────────────── */}
        <section>
          <Card flush className="h-full">
            <CardHeader
              title={t('pendingReferrals')}
              action={
                <ButtonLink href="/referrals" variant="ghost" size="sm">
                  {t('viewAll')}
                </ButtonLink>
              }
            />
            {metrics.pendingReferrals.length === 0 ? (
              <EmptyState
                icon={TrendingUp}
                title={t('noPendingReferrals')}
                description={t('noPendingReferralsBody')}
              />
            ) : (
              <ul className="divide-y divide-outline-variant">
                {metrics.pendingReferrals.slice(0, 4).map((child: FlaggedChild) => (
                  <li
                    key={child.id}
                    className="px-5 sm:px-6 py-3 flex items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="text-sm font-medium truncate">
                        {child.initials}
                        <span className="ml-2 text-xs font-normal text-faint">{child.icdsId}</span>
                      </p>
                      <p className="text-xs text-on-surface-variant truncate">{child.centreName}</p>
                    </div>
                    <div className="flex flex-col items-end gap-1 shrink-0">
                      <StatusBadge status={child.status} />
                      <span className="text-xs text-faint tabular-nums whitespace-nowrap">
                        {child.daysElapsed} {t('daysElapsed')}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Card>
        </section>
        </div>

        {/* ── Centres ───────────────────────────────────────────────────── */}
        <section>
          <Card flush>
            <CardHeader
              title={t('centresOverview')}
              action={
                <ButtonLink href="/centres" variant="ghost" size="sm">
                  {t('viewAll')}
                </ButtonLink>
              }
            />
            <DataTable
              data={metrics.centres}
              columns={centreColumns}
              getRowKey={(c) => c.id}
              caption={t('centresOverview')}
              empty={<EmptyState icon={Users} title={t('noCentres')} />}
            />
          </Card>
        </section>

      </div>
    </AppShell>
  );
}
