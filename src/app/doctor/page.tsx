'use client';

import React, { useEffect, useState } from 'react';
import { Inbox, Stethoscope } from 'lucide-react';
import { mockFlaggedChildren, type FlaggedChild } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { AppShell } from '@/components/nav/AppShell';
import { Card, CardHeader } from '@/components/ui/Card';
import { StatTile } from '@/components/ui/StatTile';
import { DataTable, type Column } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/ClassificationBadge';
import { EmptyState, SampleDataChip } from '@/components/ui/Feedback';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

/**
 * The doctor's case inbox (§EX3): referred SAM/MAM cases, filterable by
 * severity, each awaiting a recorded outcome.
 *
 * Scope rule from §1: a doctor sees only cases referred to them — so this
 * lists referred children, not the full roster.
 */
export default function DoctorDashboard() {
  const { t } = useLanguage();
  const { role, setRole } = useTheme();
  const [severity, setSeverity] = useState<'ALL' | 'SAM' | 'MAM'>('ALL');

  useEffect(() => {
    if (role !== 'doctor') setRole('doctor');
  }, [role, setRole]);

  const referred = mockFlaggedChildren.filter((c) => c.referred);
  const cases = referred.filter((c) => severity === 'ALL' || c.status === severity);
  const awaitingOutcome = referred.filter((c) => !c.outcomeRecorded);

  const columns: Column<FlaggedChild>[] = [
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
    { key: 'centre', header: t('centre'), cell: (c) => c.centreName },
    { key: 'status', header: t('classification'), cell: (c) => <StatusBadge status={c.status} /> },
    {
      key: 'days',
      header: t('daysPending'),
      align: 'right',
      cell: (c) => <span className="tabular-nums">{c.daysElapsed}</span>,
    },
    {
      key: 'outcome',
      header: t('outcomeRecorded'),
      align: 'right',
      cell: (c) =>
        c.outcomeRecorded ? (
          <span className="text-sm text-class-normal font-medium">{t('resolved')}</span>
        ) : (
          <Button variant="secondary" size="sm">
            {t('recordOutcome')}
          </Button>
        ),
    },
  ];

  return (
    <AppShell title={t('doctorInbox')} subtitle={t('doctorInboxSubtitle')} actions={<SampleDataChip />}>
      <div className="space-y-8">
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-3">
          <StatTile icon={Inbox} value={referred.length} label={t('casesReferred')} />
          <StatTile
            icon={Stethoscope}
            tone="mam"
            value={awaitingOutcome.length}
            label={t('awaitingOutcome')}
          />
          <StatTile
            tone="sam"
            value={referred.filter((c) => c.status === 'SAM').length}
            label={t('classSam')}
          />
        </div>

        <Card flush>
          <CardHeader title={t('caseList')} />
          <div
            role="radiogroup"
            aria-label={t('filter')}
            className="flex flex-wrap gap-2 px-5 py-3 border-b border-outline-variant"
          >
            {(['ALL', 'SAM', 'MAM'] as const).map((s) => (
              <button
                key={s}
                type="button"
                role="radio"
                aria-checked={severity === s}
                onClick={() => setSeverity(s)}
                className={cn(
                  'min-h-touch px-4 rounded-full text-sm font-semibold border-2',
                  'transition-colors duration-fast ease-ankur',
                  severity === s
                    ? 'border-brand bg-brand text-on-primary'
                    : 'border-outline-variant text-on-surface-variant hover:bg-surface-variant',
                )}
              >
                {s === 'ALL' ? t('all') : s}
              </button>
            ))}
          </div>
          <DataTable
            data={cases}
            columns={columns}
            getRowKey={(c) => c.id}
            caption={t('caseList')}
            empty={<EmptyState icon={Inbox} title={t('noCasesReferred')} description={t('noCasesReferredBody')} />}
          />
        </Card>
      </div>
    </AppShell>
  );
}
