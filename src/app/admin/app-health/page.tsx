'use client';

import React, { useEffect } from 'react';
import { Activity, CloudOff, Gauge, Smartphone, WifiOff } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { mockAppHealth, mockSyncHealth, mockVersionSpread } from '@/data/rosterData';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { AppShell } from '@/components/nav/AppShell';
import { Card, CardHeader, SectionHeader } from '@/components/ui/Card';
import { StatTile } from '@/components/ui/StatTile';
import { SampleDataChip } from '@/components/ui/Feedback';
import { cn } from '@/lib/cn';

/**
 * App health — SYSTEM PERFORMANCE, NOT CHILDREN.
 *
 * The operations view for the project team: adoption, sync health, crash-free
 * rate, offline usage, version spread. Kept apart from programme analytics by
 * §EX3, and it uses the BRAND palette rather than the clinical one on purpose —
 * a failed sync is an engineering problem, and painting it the same red as
 * severe acute malnutrition would cheapen a colour that has to mean one thing.
 */
export default function AppHealthPage() {
  const { t } = useLanguage();
  const { role, setRole } = useTheme();

  useEffect(() => {
    if (role !== 'admin') setRole('admin');
  }, [role, setRole]);

  const totalDevices = mockVersionSpread.reduce((s, v) => s + v.devices, 0);
  const axis = { fill: 'var(--on-surface-variant)', fontSize: 12 };

  return (
    <AppShell
      breadcrumbs={[{ labelKey: 'navConsole', href: '/admin' }, { labelKey: 'navAppHealth' }]} title={t('navAppHealth')} subtitle={t('appHealthSubtitle')} actions={<SampleDataChip />}>
      <div className="space-y-8">
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          <StatTile
            icon={Activity}
            value={`${mockAppHealth.crashFreeSessionsPct}%`}
            label={t('healthCrashFree')}
          />
          <StatTile
            icon={Gauge}
            value={`${mockAppHealth.medianSyncLatencyMs}ms`}
            label={t('healthSyncLatency')}
          />
          <StatTile
            icon={CloudOff}
            value={mockAppHealth.outboxBacklog}
            label={t('healthOutboxBacklog')}
            hint={t('healthOutboxHint')}
          />
          <StatTile
            icon={Smartphone}
            value={mockAppHealth.activeDevices7d}
            label={t('healthActiveDevices')}
          />
        </div>

        {/* ── Dead letters ──────────────────────────────────────────────────
            Called out on its own. A dead-lettered record is data that will
            never sync without intervention — the one number here that means
            a child's measurement may be silently missing from the server. */}
        <Card
          className={cn(
            'flex flex-wrap items-center justify-between gap-4',
            mockAppHealth.deadLetters > 0 && 'border-class-sam/40',
          )}
        >
          <div className="flex items-center gap-3">
            <WifiOff
              size={20}
              aria-hidden="true"
              className={mockAppHealth.deadLetters > 0 ? 'text-class-sam' : 'text-class-normal'}
            />
            <div>
              <p className="font-semibold">{t('healthDeadLetters')}</p>
              <p className="text-sm text-on-surface-variant">{t('healthDeadLettersHint')}</p>
            </div>
          </div>
          <p className="text-2xl font-bold tabular-nums">{mockAppHealth.deadLetters}</p>
        </Card>

        {/* ── Sync health ───────────────────────────────────────────────── */}
        <section>
          <SectionHeader title={t('healthSyncTitle')} description={t('healthSyncHint')} />
          <Card>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={mockSyncHealth} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--outline-variant)" />
                  <XAxis dataKey="day" tickLine={false} axisLine={false} tick={axis} dy={8} />
                  <YAxis tickLine={false} axisLine={false} tick={axis} allowDecimals={false} />
                  <Tooltip
                    contentStyle={{
                      borderRadius: 12,
                      border: '1px solid var(--outline-variant)',
                      background: 'var(--surface-container)',
                      color: 'var(--on-surface)',
                    }}
                    cursor={{ fill: 'var(--surface-variant)' }}
                  />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                  {/* Brand primary and a muted outline — engineering colours,
                      deliberately not the clinical green/red. */}
                  <Bar
                    dataKey="synced"
                    name={t('healthSynced')}
                    stackId="s"
                    fill="var(--primary)"
                    radius={[0, 0, 0, 0]}
                  />
                  <Bar
                    dataKey="failed"
                    name={t('healthFailed')}
                    stackId="s"
                    fill="var(--outline)"
                    radius={[6, 6, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>

        {/* ── Offline usage ─────────────────────────────────────────────── */}
        <section>
          <SectionHeader title={t('healthOfflineTitle')} description={t('healthOfflineHint')} />
          <Card className="space-y-3">
            <div className="flex items-baseline justify-between">
              <span className="text-sm text-on-surface-variant">{t('healthOfflineSessions')}</span>
              <span className="text-2xl font-bold tabular-nums">
                {mockAppHealth.offlineSessionsPct}%
              </span>
            </div>
            <div
              className="h-3 rounded-full bg-surface-variant overflow-hidden"
              role="img"
              aria-label={`${mockAppHealth.offlineSessionsPct}% ${t('healthOfflineSessions')}`}
            >
              <div
                className="h-full bg-brand rounded-full transition-[width] duration-base ease-ankur"
                style={{ width: `${mockAppHealth.offlineSessionsPct}%` }}
              />
            </div>
          </Card>
        </section>

        {/* ── Version spread ────────────────────────────────────────────── */}
        <section>
          <Card flush>
            <CardHeader title={t('healthVersionSpread')} />
            <ul className="divide-y divide-outline-variant">
              {mockVersionSpread.map((v) => {
                const pct = Math.round((v.devices / totalDevices) * 100);
                return (
                  <li key={v.version} className="px-5 py-4 space-y-2">
                    <div className="flex items-center justify-between gap-3">
                      <span className="font-medium">
                        {v.version}
                        {v.current && (
                          <span className="ml-2 text-xs rounded-full bg-primary-container text-on-primary-container px-2 py-0.5">
                            {t('healthCurrent')}
                          </span>
                        )}
                      </span>
                      <span className="text-sm text-on-surface-variant tabular-nums">
                        {v.devices} {t('healthDevices')} · {pct}%
                      </span>
                    </div>
                    <div className="h-2 rounded-full bg-surface-variant overflow-hidden">
                      <div
                        className={cn('h-full rounded-full', v.current ? 'bg-brand' : 'bg-outline')}
                        style={{ width: `${pct}%` }}
                      />
                    </div>
                  </li>
                );
              })}
            </ul>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
