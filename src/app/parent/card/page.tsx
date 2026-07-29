'use client';

import React, { useEffect } from 'react';
import { Printer, Share2 } from 'lucide-react';
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
import { Button } from '@/components/ui/Button';
import { SampleDataChip } from '@/components/ui/Feedback';
import { SproutMark } from '@/components/brand/SproutMark';

/**
 * The parent growth card (FR-APP-11) — preview, share, print.
 *
 * This is the one surface that reliably leaves the system: it gets printed,
 * photographed, sent over WhatsApp and photocopied in greyscale. Two
 * consequences drive the design:
 *
 *  1. It must survive losing colour entirely. The classification renders as
 *     colour + word + icon, and the growth line is distinguishable by shape
 *     and label, not hue.
 *  2. It carries a child's health information out of the app, so it shows
 *     initials and an ICDS ID only — never a full name.
 */

const growthSeries = [
  { month: 'फ़र · Feb', weight: 9.1 },
  { month: 'मार्च · Mar', weight: 9.4 },
  { month: 'अप्रैल · Apr', weight: 9.6 },
  { month: 'मई · May', weight: 10.0 },
  { month: 'जून · Jun', weight: 10.3 },
  { month: 'जुल · Jul', weight: 10.7 },
];

export default function GrowthCardPage() {
  const { t } = useLanguage();
  const { role, setRole } = useTheme();

  useEffect(() => {
    if (role !== 'parent') setRole('parent');
  }, [role, setRole]);

  return (
    <AppShell title={t('navGrowthCard')} subtitle={t('growthCardSubtitle')} actions={<SampleDataChip />}>
      <div className="max-w-2xl space-y-4">
        {/* ── The card itself ───────────────────────────────────────────── */}
        <Card elevation="raised" className="space-y-5 print:shadow-none print:border-black">
          <header className="flex items-center gap-3 pb-4 border-b border-outline-variant">
            <SproutMark size={40} title="" />
            <div className="min-w-0">
              <p className="font-bold">
                अंकुर <span className="opacity-70">Ankur</span>
              </p>
              <p className="text-sm text-on-surface-variant">{t('growthCardTitle')}</p>
            </div>
          </header>

          {/* Identity — initials and ICDS ID only, never a full name. */}
          <dl className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <dt className="text-on-surface-variant">{t('childInitials')}</dt>
              <dd className="font-semibold text-base">R. K.</dd>
            </div>
            <div>
              <dt className="text-on-surface-variant">{t('icdsId')}</dt>
              <dd className="font-semibold text-base">ICDS-9912-A</dd>
            </div>
            <div>
              <dt className="text-on-surface-variant">{t('centre')}</dt>
              <dd className="font-medium">AWC North-1</dd>
            </div>
            <div>
              <dt className="text-on-surface-variant">{t('rosterLastMeasured')}</dt>
              <dd className="font-medium tabular-nums">
                {new Date(Date.now() - 4 * 86400000).toLocaleDateString()}
              </dd>
            </div>
          </dl>

          {/* Status: colour + word + icon, so it survives a greyscale copy. */}
          <div className="flex flex-wrap items-center gap-3 p-4 rounded-xl bg-surface-variant">
            <ClassificationBadge growthClass="normal" size="md" />
            <p className="text-sm flex-1 min-w-[12rem]">{t('parentStatusNormal')}</p>
          </div>

          {/* ── Growth trend ────────────────────────────────────────────── */}
          <section>
            <h3 className="font-semibold mb-1">{t('growthCardWeightTrend')}</h3>
            <p className="text-sm text-on-surface-variant mb-3">{t('growthCardWeightHint')}</p>
            <div className="h-56">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={growthSeries} margin={{ top: 8, right: 8, left: -20, bottom: 0 }}>
                  <defs>
                    <linearGradient id="parentWeightFill" x1="0" y1="0" x2="0" y2="1">
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
                    width={44}
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
                    formatter={(value) => [`${value ?? '—'} kg`, t('measureWeight')]}
                  />
                  <Area
                    type="monotone"
                    dataKey="weight"
                    name={t('measureWeight')}
                    stroke="var(--primary)"
                    strokeWidth={2.5}
                    fill="url(#parentWeightFill)"
                    // Dots make each visit individually readable on paper,
                    // where a hover tooltip does not exist.
                    dot={{ r: 3, fill: 'var(--primary)' }}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </section>

          <p className="text-xs text-on-surface-variant border-t border-outline-variant pt-3 leading-relaxed">
            {t('growthCardFooter')}
          </p>
        </Card>

        {/* Actions are outside the card so they do not appear on a printout. */}
        <div className="flex flex-wrap gap-3 print:hidden">
          <Button variant="primary" onClick={() => window.print()}>
            <Printer size={16} aria-hidden="true" />
            {t('growthCardPrint')}
          </Button>
          <Button variant="secondary" disabled>
            <Share2 size={16} aria-hidden="true" />
            {t('growthCardShare')}
          </Button>
        </div>
      </div>
    </AppShell>
  );
}
