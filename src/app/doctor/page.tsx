'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { CheckCircle2, Inbox, Stethoscope, X } from 'lucide-react';
import { mockFlaggedChildren, type FlaggedChild } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import type { TranslationKey } from '@/data/translations';
import { AppShell } from '@/components/nav/AppShell';
import { Card, CardHeader } from '@/components/ui/Card';
import { StatTile } from '@/components/ui/StatTile';
import { DataTable, type Column } from '@/components/ui/DataTable';
import { StatusBadge } from '@/components/ui/ClassificationBadge';
import { EmptyState, SampleDataChip } from '@/components/ui/Feedback';
import { Button, IconButton } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

/**
 * The doctor's case inbox (§EX3): referred SAM/MAM cases, filterable by
 * severity, each awaiting a recorded outcome.
 *
 * Scope rule from §1: a doctor sees only cases referred to them — so this
 * lists referred children, not the full roster.
 */

/**
 * The four outcomes FR-APP-9 defines. `unknown` exists deliberately: a child
 * who cannot be traced is a real, recordable result, and forcing a choice
 * between "attended" and "not attended" would push someone into guessing.
 */
const OUTCOMES = ['attended', 'not_attended', 'unknown'] as const;
type Outcome = (typeof OUTCOMES)[number];

const OUTCOME_LABEL: Record<Outcome, TranslationKey> = {
  attended: 'outcomeAttended',
  not_attended: 'outcomeNotAttended',
  unknown: 'outcomeUnknown',
};

// Explicit, not `${OUTCOME_LABEL[o]}Hint` — a template literal defeats the
// TranslationKey union, which exists so a missing string fails the build.
const OUTCOME_HINT: Record<Outcome, TranslationKey> = {
  attended: 'outcomeAttendedHint',
  not_attended: 'outcomeNotAttendedHint',
  unknown: 'outcomeUnknownHint',
};

export default function DoctorDashboard() {
  const { t } = useLanguage();
  const { role, setRole } = useTheme();
  const [severity, setSeverity] = useState<'ALL' | 'SAM' | 'MAM'>('ALL');
  const [recording, setRecording] = useState<FlaggedChild | null>(null);
  const [recorded, setRecorded] = useState<Record<string, Outcome>>({});

  useEffect(() => {
    if (role !== 'doctor') setRole('doctor');
  }, [role, setRole]);

  const referred = useMemo(() => mockFlaggedChildren.filter((c) => c.referred), []);
  const cases = referred.filter((c) => severity === 'ALL' || c.status === severity);
  const awaitingOutcome = referred.filter((c) => !c.outcomeRecorded && !recorded[c.id]);

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
      cell: (c) => {
        const outcome = recorded[c.id];
        if (outcome) {
          return (
            <span className="inline-flex items-center gap-1.5 text-sm font-medium text-class-normal">
              <CheckCircle2 size={14} aria-hidden="true" />
              {t(OUTCOME_LABEL[outcome])}
            </span>
          );
        }
        if (c.outcomeRecorded) {
          return <span className="text-sm text-class-normal font-medium">{t('resolved')}</span>;
        }
        return (
          <Button variant="secondary" size="sm" onClick={() => setRecording(c)}>
            {t('recordOutcome')}
          </Button>
        );
      },
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
          <p aria-live="polite" className="sr-only">
            {cases.length} {t('caseList')}
          </p>
          <DataTable
            data={cases}
            columns={columns}
            getRowKey={(c) => c.id}
            caption={t('caseList')}
            empty={<EmptyState icon={Inbox} title={t('noCasesReferred')} description={t('noCasesReferredBody')} />}
          />
        </Card>
      </div>

      {recording && (
        <OutcomeDialog
          child={recording}
          onClose={() => setRecording(null)}
          onRecord={(outcome) => {
            setRecorded((r) => ({ ...r, [recording.id]: outcome }));
            setRecording(null);
          }}
        />
      )}
    </AppShell>
  );
}

/**
 * Outcome recorder.
 *
 * A dialog rather than an inline dropdown because recording an outcome closes
 * a referral — it deserves a deliberate confirmation step, not a control that
 * can be changed by a stray scroll over a select element.
 */
function OutcomeDialog({
  child,
  onClose,
  onRecord,
}: {
  child: FlaggedChild;
  onClose: () => void;
  onRecord: (outcome: Outcome) => void;
}) {
  const { t } = useLanguage();
  const [choice, setChoice] = useState<Outcome | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', onKey);
    const previous = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previous;
    };
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4">
      <div className="absolute inset-0 bg-black/40" onClick={onClose} aria-hidden="true" />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="outcome-title"
        className={cn(
          'relative w-full sm:max-w-md bg-surface-container',
          'rounded-t-2xl sm:rounded-2xl border border-outline-variant shadow-xl',
          'p-5 space-y-4',
        )}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h2 id="outcome-title" className="font-semibold">
              {t('recordOutcome')}
            </h2>
            <p className="text-sm text-on-surface-variant">
              {child.initials} · {child.icdsId}
            </p>
          </div>
          <IconButton label={t('close')} onClick={onClose}>
            <X size={18} aria-hidden="true" />
          </IconButton>
        </div>

        <div role="radiogroup" aria-label={t('recordOutcome')} className="space-y-2">
          {OUTCOMES.map((o) => (
            <button
              key={o}
              type="button"
              role="radio"
              aria-checked={choice === o}
              onClick={() => setChoice(o)}
              className={cn(
                'w-full text-left min-h-touch px-4 py-3 rounded-xl border-2',
                'transition-colors duration-fast ease-ankur',
                choice === o
                  ? 'border-brand bg-primary-container text-on-primary-container'
                  : 'border-outline-variant hover:bg-surface-variant',
              )}
            >
              <span className="font-medium block">{t(OUTCOME_LABEL[o])}</span>
              <span className="text-sm text-on-surface-variant">
                {t(OUTCOME_HINT[o])}
              </span>
            </button>
          ))}
        </div>

        <div className="flex gap-2 pt-1">
          <Button
            variant="primary"
            block
            disabled={choice === null}
            onClick={() => choice && onRecord(choice)}
          >
            {t('save')}
          </Button>
          <Button variant="ghost" onClick={onClose}>
            {t('cancel')}
          </Button>
        </div>
      </div>
    </div>
  );
}
