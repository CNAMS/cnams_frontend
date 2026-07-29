'use client';

import React, { useEffect } from 'react';
import { Activity, TrendingDown, Users } from 'lucide-react';
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { mockClassBreakdown, mockProgrammeTrend } from '@/data/rosterData';
import { styleFor } from '@/theme/classification';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { AppShell } from '@/components/nav/AppShell';
import { Card, SectionHeader } from '@/components/ui/Card';
import { StatTile } from '@/components/ui/StatTile';
import { SampleDataChip } from '@/components/ui/Feedback';

/**
 * Programme analytics — CHILD HEALTH OUTCOMES.
 *
 * §EX3 is explicit that the admin has two analytics surfaces and that they
 * stay apart: this one answers "are children getting better?", /admin/app-health
 * answers "is the software working?". They have different audiences and merging
 * them produces a dashboard that serves neither.
 *
 * Chart colours come from the clinical palette via styleFor(), so a SAM line is
 * the same red as a SAM badge. An analytics page inventing its own "chart
 * colours" is how a red line ends up meaning something different from a red
 * pill three pages away.
 */
export default function ProgrammeAnalyticsPage() {
  const { t } = useLanguage();
  const { role, setRole } = useTheme();

  useEffect(() => {
    if (role !== 'admin') setRole('admin');
  }, [role, setRole]);

  const latest = mockProgrammeTrend[mockProgrammeTrend.length - 1];
  const first = mockProgrammeTrend[0];
  const totalClassified = mockClassBreakdown.reduce((s, d) => s + d.count, 0);
  const samDelta = latest.sam - first.sam;

  const axis = { fill: 'var(--on-surface-variant)', fontSize: 12 };
  const tooltipStyle = {
    borderRadius: 12,
    border: '1px solid var(--outline-variant)',
    background: 'var(--surface-container)',
    color: 'var(--on-surface)',
  };

  return (
    <AppShell
      title={t('navAnalytics')}
      subtitle={t('analyticsSubtitle')}
      actions={<SampleDataChip />}
    >
      <div className="space-y-8">
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          <StatTile icon={Users} value={latest.screened} label={t('analyticsScreenedLatest')} />
          <StatTile icon={Activity} tone="sam" value={latest.sam} label={t('classSam')} />
          <StatTile tone="mam" value={latest.mam} label={t('classMam')} />
          <StatTile
            icon={TrendingDown}
            tone={samDelta <= 0 ? 'normal' : 'sam'}
            value={`${samDelta > 0 ? '+' : ''}${samDelta}`}
            label={t('analyticsSamChange')}
            hint={t('analyticsSinceFeb')}
          />
        </div>

        {/* ── Coverage ──────────────────────────────────────────────────── */}
        <section>
          <SectionHeader title={t('analyticsCoverage')} description={t('analyticsCoverageHint')} />
          <Card>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockProgrammeTrend} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--outline-variant)" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={axis} dy={8} />
                  <YAxis tickLine={false} axisLine={false} tick={axis} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Line
                    type="monotone"
                    dataKey="screened"
                    name={t('screened')}
                    stroke="var(--primary)"
                    strokeWidth={2.5}
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>

        {/* ── SAM / MAM trend ───────────────────────────────────────────── */}
        <section>
          <SectionHeader title={t('analyticsMalnutritionTrend')} description={t('analyticsTrendHint')} />
          <Card>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockProgrammeTrend} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--outline-variant)" />
                  <XAxis dataKey="month" tickLine={false} axisLine={false} tick={axis} dy={8} />
                  <YAxis tickLine={false} axisLine={false} tick={axis} allowDecimals={false} />
                  <Tooltip contentStyle={tooltipStyle} />
                  <Legend wrapperStyle={{ fontSize: 12, paddingTop: 8 }} />
                  {/* Clinical colours, not chart colours — SAM red here is the
                      same red as a SAM badge anywhere else in the product. */}
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
                    // Dashed as well as amber, so the two series stay separable
                    // in greyscale and for a colour-blind reader.
                    strokeDasharray="5 4"
                    dot={{ r: 3 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>

        {/* ── Current classification mix ────────────────────────────────── */}
        <section>
          <SectionHeader
            title={t('analyticsCurrentMix')}
            description={`${totalClassified} ${t('analyticsChildrenClassified')}`}
          />
          <Card>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={mockClassBreakdown.map((d) => ({
                    ...d,
                    label: t(styleFor(d.growthClass).labelKey),
                  }))}
                  margin={{ top: 8, right: 8, left: -20, bottom: 0 }}
                >
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--outline-variant)" />
                  <XAxis dataKey="label" tickLine={false} axisLine={false} tick={axis} dy={8} />
                  <YAxis tickLine={false} axisLine={false} tick={axis} allowDecimals={false} />
                  <Tooltip contentStyle={tooltipStyle} cursor={{ fill: 'var(--surface-variant)' }} />
                  <Bar dataKey="count" name={t('analyticsChildren')} radius={[6, 6, 0, 0]}>
                    {mockClassBreakdown.map((d) => (
                      <Cell key={d.growthClass} fill={styleFor(d.growthClass).color} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
