'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { notFound } from 'next/navigation';
import {
  Battery,
  CheckCircle2,
  HardDrive,
  Users,
  Wifi,
  WifiOff,
  Wrench,
} from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { getCentreById, getChildrenByCentre, type FlaggedChild } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { AppShell } from '@/components/nav/AppShell';
import { Card, CardHeader, SectionHeader } from '@/components/ui/Card';
import { StatTile } from '@/components/ui/StatTile';
import { DataTable, type Column } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/ClassificationBadge';
import { EmptyState, SampleDataChip } from '@/components/ui/Feedback';
import { cn } from '@/lib/cn';

const DEVICE_STATUS = {
  connected: { icon: Wifi, tone: 'text-class-normal', labelKey: 'connected' },
  calibration_overdue: { icon: Wrench, tone: 'text-class-mam', labelKey: 'calOverdue' },
  disconnected: { icon: WifiOff, tone: 'text-class-indeterminate', labelKey: 'disconnected' },
} as const;

export default function CentreDetailPage({ params }: { params: { id: string } }) {
  const { t } = useLanguage();
  const { role, setRole } = useTheme();
  const centre = getCentreById(params.id);

  // Hooks must run before any early return, so this sits above the notFound
  // guard rather than after it.
  useEffect(() => {
    if (role !== 'supervisor') setRole('supervisor');
  }, [role, setRole]);

  if (!centre) notFound();

  const flaggedChildren = getChildrenByCentre(centre.id);
  const status = DEVICE_STATUS[centre.deviceStatus];
  const StatusIcon = status.icon;

  const childColumns: Column<FlaggedChild>[] = [
    {
      key: 'child',
      header: t('childInitials'),
      primary: true,
      cell: (c) => (
        <span>
          {c.initials}
          <span className="ml-2 text-xs font-normal text-on-surface-variant">{c.icdsId}</span>
        </span>
      ),
    },
    {
      key: 'class',
      header: t('classification'),
      cell: (c) => <StatusBadge status={c.status} />,
    },
    {
      key: 'days',
      header: t('daysPending'),
      align: 'right',
      cell: (c) => <span className="tabular-nums">{c.daysElapsed}</span>,
    },
    {
      key: 'referred',
      header: t('referralState'),
      align: 'right',
      cell: (c) => (
        <span
          className={cn(
            'text-sm font-medium',
            c.referred ? 'text-class-normal' : 'text-class-sam',
          )}
        >
          {c.referred ? t('referred') : t('notReferred')}
        </span>
      ),
    },
  ];

  return (
    <AppShell
      breadcrumbs={[{ labelKey: 'navOverview', href: '/supervisor' }, { labelKey: 'navCentres', href: '/centres' }, { labelKey: 'centreDetailCrumb' }]}
      title={centre.name}
      subtitle={t('centreDrillDown')}
      actions={<SampleDataChip />}
    >
      <div className="space-y-8">
        <p className="text-sm">
          <Link href="/centres" className="text-brand hover:underline">
            ← {t('navCentres')}
          </Link>
        </p>

        {/* ── Screening + classification counts ─────────────────────────── */}
        <section>
          <SectionHeader title={t('malnutritionSummary')} description={t('casesFromCriteria')} />
          <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
            <StatTile
              icon={Users}
              value={centre.screenedThisMonth}
              label={t('screenedThisMonth')}
            />
            <StatTile tone="sam" value={centre.samCases} label={t('classSam')} />
            <StatTile tone="mam" value={centre.mamCases} label={t('classMam')} />
            <StatTile
              tone="normal"
              value={Math.max(centre.screenedThisMonth - centre.samCases - centre.mamCases, 0)}
              label={t('classNormal')}
            />
          </div>
        </section>

        {/* ── Device ────────────────────────────────────────────────────── */}
        <section>
          <Card>
            <h2 className="flex items-center gap-2 font-semibold mb-4">
              <HardDrive size={18} aria-hidden="true" />
              {t('deviceHardware')}
            </h2>
            <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 text-sm">
              <div>
                <dt className="text-on-surface-variant">{t('status')}</dt>
                <dd className={cn('mt-1 inline-flex items-center gap-1.5 font-semibold', status.tone)}>
                  <StatusIcon size={15} aria-hidden="true" />
                  {t(status.labelKey)}
                </dd>
              </div>
              <div>
                <dt className="text-on-surface-variant">{t('battery')}</dt>
                <dd className="mt-1 inline-flex items-center gap-1.5 font-semibold tabular-nums">
                  <Battery size={15} aria-hidden="true" />
                  {centre.batteryPercentage}%
                </dd>
              </div>
              <div>
                <dt className="text-on-surface-variant">{t('serialNo')}</dt>
                <dd className="mt-1">
                  <code className="text-xs bg-surface-variant px-2 py-1 rounded border border-outline-variant">
                    {centre.serialNumber}
                  </code>
                </dd>
              </div>
              <div>
                <dt className="text-on-surface-variant">{t('lastSynced')}</dt>
                <dd className="mt-1 font-semibold">
                  <time dateTime={centre.lastSync}>
                    {new Date(centre.lastSync).toLocaleDateString()}
                  </time>
                </dd>
              </div>
            </dl>
          </Card>
        </section>

        {/* ── Trend ─────────────────────────────────────────────────────── */}
        <section>
          <Card>
            <h2 className="font-semibold mb-4">{t('screeningHistory')}</h2>
            <div className="h-64">
              {centre.screeningTrend?.length ? (
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={centre.screeningTrend}
                    margin={{ top: 8, right: 8, left: -24, bottom: 0 }}
                  >
                    <defs>
                      {/* Reads the live token, so the chart follows the role
                          skin and dark mode instead of being pinned to the
                          AWW teal the way the hardcoded #00695C was. */}
                      <linearGradient id="screenedFill" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.28} />
                        <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid
                      strokeDasharray="3 3"
                      vertical={false}
                      stroke="var(--outline-variant)"
                    />
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
                      tick={{ fill: 'var(--on-surface-variant)', fontSize: 12 }}
                    />
                    <Tooltip
                      contentStyle={{
                        borderRadius: 12,
                        border: '1px solid var(--outline-variant)',
                        background: 'var(--surface-container)',
                        color: 'var(--on-surface)',
                      }}
                      labelStyle={{ fontWeight: 600, color: 'var(--on-surface)' }}
                      itemStyle={{ color: 'var(--primary)', fontWeight: 600 }}
                    />
                    <Area
                      type="monotone"
                      dataKey="screened"
                      name={t('screened')}
                      stroke="var(--primary)"
                      strokeWidth={2.5}
                      fill="url(#screenedFill)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              ) : (
                <EmptyState title={t('noTrendData')} />
              )}
            </div>
          </Card>
        </section>

        {/* ── Flagged children ──────────────────────────────────────────── */}
        <section>
          <Card flush>
            <CardHeader title={t('flaggedCases')} />
            <DataTable
              data={flaggedChildren}
              columns={childColumns}
              getRowKey={(c) => c.id}
              caption={t('flaggedCases')}
              empty={
                <EmptyState
                  icon={CheckCircle2}
                  title={t('noFlaggedHere')}
                  description={t('noFlaggedHereBody')}
                />
              }
            />
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
