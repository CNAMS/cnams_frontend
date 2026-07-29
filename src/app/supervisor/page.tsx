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
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { AppShell } from '@/components/nav/AppShell';
import { Card, CardHeader, SectionHeader } from '@/components/ui/Card';
import { StatTile } from '@/components/ui/StatTile';
import { DataTable, type Column } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/ClassificationBadge';
import { EmptyState, SampleDataChip } from '@/components/ui/Feedback';
import { ButtonLink } from '@/components/ui/Button';
import type { CentreData, FlaggedChild } from '@/data/mockData';

/**
 * The supervisor's sector rollup (§EX3): children screened across centres,
 * SAM/MAM counts, overdue centres and referral follow-up.
 */
export default function SupervisorDashboard() {
  const metrics = getDashboardMetrics();
  const { t } = useLanguage();
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
        <Link href={`/centres/${c.id}`} className="font-semibold text-brand hover:underline">
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
    <AppShell title={t('appTitle')} subtitle={t('trackDOverview')} actions={<SampleDataChip />}>
      <div className="space-y-8">
        {/* ── Sector rollup ─────────────────────────────────────────────── */}
        <section>
          <SectionHeader title={t('sectorOverview')} />
          <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
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
          <Card as="section" className="border-class-sam/40">
            <h2 className="flex items-center gap-2 font-semibold text-class-sam mb-3">
              <AlertTriangle size={18} aria-hidden="true" />
              {t('nonReportingCentres')}
            </h2>
            <ul className="space-y-2">
              {metrics.nonReportingCentres.map((c) => (
                <li
                  key={c.id}
                  className="flex flex-wrap items-baseline justify-between gap-2 text-sm"
                >
                  <Link href={`/centres/${c.id}`} className="font-semibold hover:underline">
                    {c.name}
                  </Link>
                  <span className="text-on-surface-variant">
                    {t('lastReported')} {new Date(c.lastReported).toLocaleDateString()}
                  </span>
                </li>
              ))}
            </ul>
          </Card>
        )}

        {/* ── Sector trend ──────────────────────────────────────────────────
            The dashboard previously showed only "now" — four counts with no
            indication of direction. A supervisor's actual question is whether
            things are improving, which a single month cannot answer. */}
        <section>
          <SectionHeader
            title={t('analyticsMalnutritionTrend')}
            description={t('analyticsTrendHint')}
          />
          <Card>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart
                  data={mockProgrammeTrend}
                  margin={{ top: 8, right: 8, left: -22, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--outline-variant)" />
                  <XAxis
                    dataKey="month"
                    tickLine={false}
                    axisLine={false}
                    tick={{ fill: 'var(--on-surface-variant)', fontSize: 12 }}
                    dy={8}
                  />
                  <YAxis
                    tickLine={false}
                    axisLine={false}
                    allowDecimals={false}
                    tick={{ fill: 'var(--on-surface-variant)', fontSize: 12 }}
                  />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: '1px solid var(--outline-variant)',
                      background: 'var(--surface-container)',
                      color: 'var(--on-surface)',
                    }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                  <Line
                    type="monotone"
                    dataKey="sam"
                    name={t('classSam')}
                    stroke={styleFor('sam').color}
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                  />
                  <Line
                    type="monotone"
                    dataKey="mam"
                    name={t('classMam')}
                    stroke={styleFor('mam').color}
                    strokeWidth={2.5}
                    strokeDasharray="5 4"
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>

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

        {/* ── Pending referrals ─────────────────────────────────────────── */}
        <section>
          <Card flush>
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
                    className="px-5 py-4 flex flex-wrap items-center justify-between gap-3"
                  >
                    <div className="min-w-0">
                      <p className="font-semibold">
                        {child.initials}
                        <span className="ml-2 text-xs font-normal text-on-surface-variant">
                          {child.icdsId}
                        </span>
                      </p>
                      <p className="text-sm text-on-surface-variant">{child.centreName}</p>
                    </div>
                    <div className="flex items-center gap-3">
                      <StatusBadge status={child.status} />
                      <span className="text-sm text-on-surface-variant tabular-nums whitespace-nowrap">
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
    </AppShell>
  );
}
