'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { ArrowDownWideNarrow, ArrowUpNarrowWide, CheckCircle2, Inbox, XCircle } from 'lucide-react';
import { mockFlaggedChildren, type FlaggedChild } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { AppShell } from '@/components/nav/AppShell';
import { Card, CardHeader } from '@/components/ui/Card';
import { DataTable, type Column } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/ClassificationBadge';
import { EmptyState, SampleDataChip } from '@/components/ui/Feedback';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

type SortOrder = 'asc' | 'desc';
type Filter = 'ALL' | 'SAM' | 'MAM';

/**
 * The referral action list (§EX3, FR-APP-9): every flagged child pending a
 * referral or an outcome, oldest first by default.
 */
export default function ReferralsPage() {
  const { t } = useLanguage();
  const { role, setRole } = useTheme();
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [filter, setFilter] = useState<Filter>('ALL');

  useEffect(() => {
    if (role !== 'supervisor') setRole('supervisor');
  }, [role, setRole]);

  // The previous version called .sort() straight on the imported array, which
  // mutates the shared module-level mockFlaggedChildren in place — so the
  // dashboard's "first 3 pending referrals" silently changed order after a
  // visit here. Copy before sorting.
  const rows = useMemo(
    () =>
      mockFlaggedChildren
        .filter((c) => filter === 'ALL' || c.status === filter)
        .slice()
        .sort((a, b) =>
          sortOrder === 'asc'
            ? a.daysElapsed - b.daysElapsed
            : b.daysElapsed - a.daysElapsed,
        ),
    [filter, sortOrder],
  );

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
    {
      key: 'centre',
      header: t('centre'),
      cell: (c) => <span className="text-on-surface-variant">{c.centreName}</span>,
    },
    {
      key: 'status',
      header: t('classification'),
      cell: (c) => <StatusBadge status={c.status} />,
    },
    {
      key: 'days',
      header: t('daysPending'),
      align: 'right',
      cell: (c) => (
        <span
          className={cn(
            'tabular-nums font-semibold',
            // Age is a triage signal, so it is shown as one — but with a word,
            // never colour alone.
            c.daysElapsed >= 14 && 'text-class-sam',
          )}
        >
          {c.daysElapsed}
          {c.daysElapsed >= 14 && (
            <span className="ml-1 text-xs font-medium">{t('overdue')}</span>
          )}
        </span>
      ),
    },
    {
      key: 'referred',
      header: t('referralState'),
      align: 'center',
      cell: (c) =>
        c.referred ? (
          <span className="inline-flex items-center gap-1.5 text-sm text-class-normal font-medium">
            <CheckCircle2 size={14} aria-hidden="true" />
            {t('referred')}
          </span>
        ) : (
          <span className="inline-flex items-center gap-1.5 text-sm text-class-sam font-medium">
            <XCircle size={14} aria-hidden="true" />
            {t('notReferred')}
          </span>
        ),
    },
    {
      key: 'outcome',
      header: t('outcomeRecorded'),
      align: 'center',
      cell: (c) =>
        c.outcomeRecorded ? (
          <span className="inline-flex items-center gap-1.5 text-sm text-class-normal font-medium">
            <CheckCircle2 size={14} aria-hidden="true" />
            {t('resolved')}
          </span>
        ) : (
          <span className="text-sm text-on-surface-variant">{t('pendingOutcome')}</span>
        ),
    },
  ];

  return (
    <AppShell
      title={t('referralsListTitle')}
      subtitle={t('referralsListSubtitle')}
      actions={<SampleDataChip />}
    >
      <Card flush>
        <CardHeader
          title={`${rows.length} ${t('flaggedChildren')}`}
          action={
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSortOrder((s) => (s === 'asc' ? 'desc' : 'asc'))}
              aria-label={`${t('daysPending')} — ${sortOrder === 'asc' ? t('sortAsc') : t('sortDesc')}`}
            >
              {sortOrder === 'asc' ? (
                <ArrowUpNarrowWide size={16} aria-hidden="true" />
              ) : (
                <ArrowDownWideNarrow size={16} aria-hidden="true" />
              )}
              {t('daysPending')}
            </Button>
          }
        />

        {/* ── Filter ────────────────────────────────────────────────────── */}
        <div
          role="radiogroup"
          aria-label={t('filter')}
          className="flex flex-wrap items-center gap-2 px-5 py-3 border-b border-outline-variant"
        >
          {(['ALL', 'SAM', 'MAM'] as const).map((f) => {
            const active = filter === f;
            return (
              <button
                key={f}
                type="button"
                role="radio"
                aria-checked={active}
                onClick={() => setFilter(f)}
                className={cn(
                  'min-h-touch px-4 rounded-full text-sm font-semibold border-2',
                  'transition-colors duration-fast ease-ankur',
                  active
                    ? 'border-brand bg-brand text-on-primary'
                    : 'border-outline-variant text-on-surface-variant hover:bg-surface-variant',
                )}
              >
                {f === 'ALL' ? t('all') : f}
              </button>
            );
          })}
        </div>

        <DataTable
          data={rows}
          columns={columns}
          getRowKey={(c) => c.id}
          caption={t('referralsListTitle')}
          empty={
            <EmptyState
              icon={Inbox}
              title={t('noFlaggedFound')}
              description={filter !== 'ALL' ? t('tryClearingFilter') : undefined}
              action={
                filter !== 'ALL' ? (
                  <Button variant="secondary" size="sm" onClick={() => setFilter('ALL')}>
                    {t('all')}
                  </Button>
                ) : undefined
              }
            />
          }
        />
      </Card>
    </AppShell>
  );
}
