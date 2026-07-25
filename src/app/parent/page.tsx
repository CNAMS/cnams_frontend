'use client';

import React, { useEffect } from 'react';
import { CalendarClock, IdCard } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { AppShell } from '@/components/nav/AppShell';
import { Card } from '@/components/ui/Card';
import { ClassificationBadge } from '@/components/ui/ClassificationBadge';
import { SampleDataChip } from '@/components/ui/Feedback';
import { Button } from '@/components/ui/Button';
import { SproutMark } from '@/components/brand/SproutMark';

/**
 * The parent view (§EX3): their child front and centre, in plain language.
 *
 * "Minimal, reassuring" — the roadmap is explicit that this surface is not
 * clinical. It shows one status, one plain-language sentence and the next
 * visit, with no z-scores, no tables and no jargon. Access is limited to the
 * parent's own linked child (§1 access rule).
 */
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
          <Button variant="secondary" size="sm" disabled>
            {t('navComingSoon')}
          </Button>
        </Card>
      </div>
    </AppShell>
  );
}
