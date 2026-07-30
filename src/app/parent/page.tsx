'use client';

import React, { useEffect } from 'react';
import { CalendarClock, IdCard } from 'lucide-react';
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { AppShell } from '@/components/nav/AppShell';
import { Card } from '@/components/ui/Card';
import { ClassificationBadge } from '@/components/ui/ClassificationBadge';
import { SampleDataChip } from '@/components/ui/Feedback';
import { ButtonLink } from '@/components/ui/Button';
import { SproutMark } from '@/components/brand/SproutMark';

/**
 * The parent view (§EX3): their child front and centre, in plain language.
 *
 * "Minimal, reassuring" — the roadmap is explicit that this surface is not
 * clinical. It shows one status, one plain-language sentence and the next
 * visit, with no z-scores, no tables and no jargon. Access is limited to the
 * parent's own linked child (§1 access rule).
 */
/** The child's recent weights — the same series the printable card shows. */
const parentTrend = [
  { month: 'मार्च · Mar', weight: 9.4 },
  { month: 'अप्रैल · Apr', weight: 9.6 },
  { month: 'मई · May', weight: 10.0 },
  { month: 'जून · Jun', weight: 10.3 },
  { month: 'जुल · Jul', weight: 10.7 },
];

export default function ParentDashboard() {
  const { t } = useLanguage();
  const { role, setRole } = useTheme();

  useEffect(() => {
    if (role !== 'parent') setRole('parent');
  }, [role, setRole]);

  return (
    <AppShell title={t('myChild')} actions={<SampleDataChip />}>
      <div className="max-w-2xl mx-auto space-y-6">
        {/* ── Status, stated plainly ────────────────────────────────────── */}
        <Card elevation="raised" className="text-center space-y-4 py-8">
          <SproutMark size={56} title="" className="mx-auto" />
          <div>
            <p className="text-sm text-on-surface-variant">{t('childInitials')}</p>
            <p className="text-2xl font-bold">R. K.</p>
          </div>
          <div className="flex justify-center">
            <ClassificationBadge growthClass="normal" size="md" />
          </div>
          <p className="text-on-surface-variant leading-relaxed max-w-md mx-auto">
            {t('parentStatusNormal')}
          </p>
        </Card>

        {/* ── Next visit ────────────────────────────────────────────────── */}
        <Card className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shrink-0">
              <CalendarClock size={20} className="text-on-primary-container" aria-hidden="true" />
            </div>
            <div>
              <p className="font-semibold">{t('nextVisit')}</p>
              <p className="text-sm text-on-surface-variant">{t('nextVisitHint')}</p>
            </div>
          </div>
        </Card>

        {/* ── Growth so far ─────────────────────────────────────────────────
            A parent's second question after "is my child alright?" is "have
            they been growing?", and the dashboard previously had no answer —
            just a link to a card that did not exist. */}
        <Card>
          <h2 className="font-semibold mb-1">{t('growthCardWeightTrend')}</h2>
          <p className="text-sm text-on-surface-variant mb-3">{t('parentTrendHint')}</p>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={parentTrend} margin={{ top: 8, right: 8, left: -22, bottom: 0 }}>
                <defs>
                  <linearGradient id="parentHomeFill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--primary)" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="var(--primary)" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--outline-variant)" />
                <XAxis
                  dataKey="month"
                  tickLine={false}
                  axisLine={false}
                  tick={{ fill: 'var(--on-surface-variant)', fontSize: 11 }}
                  dy={8}
                />
                <YAxis
                  tickLine={false}
                  axisLine={false}
                  width={40}
                  tick={{ fill: 'var(--on-surface-variant)', fontSize: 11 }}
                  unit=" kg"
                />
                <Tooltip
                  contentStyle={{
                    borderRadius: 12,
                    border: '1px solid var(--outline-variant)',
                    background: 'var(--surface-container)',
                    color: 'var(--on-surface)',
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="weight"
                  name={t('measureWeight')}
                  stroke="var(--primary)"
                  strokeWidth={2.5}
                  fill="url(#parentHomeFill)"
                  dot={{ r: 3, fill: 'var(--primary)' }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </Card>

        {/* ── Growth card ───────────────────────────────────────────────── */}
        <Card className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center shrink-0">
              <IdCard size={20} className="text-on-primary-container" aria-hidden="true" />
            </div>
            <div>
              <p className="font-semibold">{t('navGrowthCard')}</p>
              <p className="text-sm text-on-surface-variant">{t('growthCardHint')}</p>
            </div>
          </div>
          <ButtonLink href="/parent/card" variant="secondary" size="sm">
            {t('growthCardOpen')}
          </ButtonLink>
        </Card>
      </div>
    </AppShell>
  );
}
