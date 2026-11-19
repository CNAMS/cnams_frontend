'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { AlertTriangle, Baby, Clock, Ruler, Search, ShieldOff, X } from 'lucide-react';
import {
  mockRoster,
  isOverdue,
  daysSinceMeasured,
  type RosterChild,
} from '@/data/rosterData';
import { useTheme } from '@/context/ThemeContext';
import { SegmentedControl } from '@/components/ui/SegmentedControl';
import { AppShell } from '@/components/nav/AppShell';
import { Card } from '@/components/ui/Card';
import { StatTile } from '@/components/ui/StatTile';
import { ClassificationBadge } from '@/components/ui/ClassificationBadge';
import { EmptyState, SampleDataChip } from '@/components/ui/Feedback';
import { Button, ButtonLink } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { useTranslations } from 'next-intl';

type Filter = 'all' | 'overdue' | 'flagged' | 'noConsent';

/**
 * The child roster (FR-APP-5) — search, filter by overdue, sort.
 *
 * Rendered as cards rather than a table at every width. This is the screen an
 * AWW uses most, on a phone, often outdoors: a card carries a 48px tap target
 * and keeps the child's identity, status and staleness together, which a table
 * row cannot do at that width.
 */
export default function ChildrenRosterPage() {
  const t = useTranslations();
  const { role, setRole } = useTheme();
  const [query, setQuery] = useState('');
  const [filter, setFilter] = useState<Filter>('all');

  useEffect(() => {
    if (role !== 'aww') setRole('aww');
  }, [role, setRole]);

  // An AWW sees their own centre only (§1 access rule).
  const centreRoster = useMemo(() => mockRoster.filter((c) => c.centreId === 'c1'), []);

  const counts = useMemo(
    () => ({
      total: centreRoster.length,
      overdue: centreRoster.filter(isOverdue).length,
      flagged: centreRoster.filter((c) => c.latestClass === 'sam' || c.latestClass === 'mam').length,
      noConsent: centreRoster.filter((c) => c.consent !== 'given').length,
    }),
    [centreRoster],
  );

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    return centreRoster
      .filter((c) => {
        if (filter === 'overdue' && !isOverdue(c)) return false;
        if (filter === 'flagged' && c.latestClass !== 'sam' && c.latestClass !== 'mam') return false;
        if (filter === 'noConsent' && c.consent === 'given') return false;
        if (!q) return true;
        return (
          c.initials.toLowerCase().includes(q) || c.icdsId.toLowerCase().includes(q)
        );
      })
      // Overdue first — the roster exists to answer "who still needs measuring".
      .sort((a, b) => Number(isOverdue(b)) - Number(isOverdue(a)));
  }, [centreRoster, query, filter]);

  const FILTERS: { key: Filter; labelKey: string; count: number }[] = [
    { key: 'all', labelKey: 'all', count: counts.total },
    { key: 'overdue', labelKey: 'rosterOverdue', count: counts.overdue },
    { key: 'flagged', labelKey: 'rosterFlagged', count: counts.flagged },
    { key: 'noConsent', labelKey: 'rosterNoConsent', count: counts.noConsent },
  ];

  return (
    <AppShell
      breadcrumbs={[{ labelKey: 'navHome', href: '/worker' }, { labelKey: 'navChildren' }]}
      title={t('navChildren')}
      subtitle={t('rosterSubtitle')}
      actions={<SampleDataChip />}
    >
      <div className="space-y-6">
        <div className="grid gap-3 sm:gap-4 grid-cols-2 lg:grid-cols-4">
          <StatTile icon={Baby} value={counts.total} label={t('rosterRegistered')} />
          <StatTile icon={AlertTriangle} tone="mam" value={counts.overdue} label={t('rosterOverdue')} />
          <StatTile icon={Ruler} tone="sam" value={counts.flagged} label={t('rosterFlagged')} />
          <StatTile icon={ShieldOff} tone="indeterminate" value={counts.noConsent} label={t('rosterNoConsent')} />
        </div>

        {/* ── Toolbar: search + filter ──────────────────────────────────── */}
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <div className="relative w-full lg:max-w-sm">
            <Search
              size={16}
              aria-hidden="true"
              className="absolute left-3 top-1/2 -translate-y-1/2 text-faint pointer-events-none"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t('rosterSearchPlaceholder')}
              aria-label={t('rosterSearchPlaceholder')}
              className={cn(
                'w-full h-10 pointer-coarse:h-11 pl-9 pr-10 rounded-control bg-surface-container text-sm',
                'border border-line-strong shadow-xs focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/25',
                'transition-[border-color,box-shadow] duration-fast ease-ankur',
                'placeholder:text-faint',
              )}
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label={t('rosterClearSearch')}
                className="absolute right-1.5 top-1/2 -translate-y-1/2 w-7 h-7 rounded-[6px] grid place-items-center text-faint hover:text-on-surface hover:bg-surface-variant"
              >
                <X size={14} aria-hidden="true" />
              </button>
            )}
          </div>

          <SegmentedControl
            label={t('filter')}
            value={filter}
            onChange={setFilter}
            segments={FILTERS.map(({ key, labelKey, count }) => ({
              value: key,
              label: t(labelKey),
              count,
            }))}
          />
        </div>

        {/* Search and filtering change the list silently for anyone not
            watching it. A polite live region announces the new count without
            interrupting whatever the user is currently reading. */}
        <p aria-live="polite" className="sr-only">
          {results.length} {t('rosterResultsAnnounce')}
        </p>

        {/* ── Roster ────────────────────────────────────────────────────── */}
        {results.length === 0 ? (
          <Card>
            <EmptyState
              icon={Search}
              title={t('rosterNoMatches')}
              description={t('rosterNoMatchesBody')}
              action={
                <Button
                  variant="secondary"
                  size="sm"
                  onClick={() => {
                    setQuery('');
                    setFilter('all');
                  }}
                >
                  {t('rosterClearFilters')}
                </Button>
              }
            />
          </Card>
        ) : (
          <ul className="grid gap-3 sm:grid-cols-2">
            {results.map((child) => (
              <ChildCard key={child.id} child={child} />
            ))}
          </ul>
        )}
      </div>
    </AppShell>
  );
}

function ChildCard({ child }: { child: RosterChild }) {
  const t = useTranslations();
  const overdue = isOverdue(child);
  const days = daysSinceMeasured(child);
  const consentBlocked = child.consent !== 'given';

  return (
    <Card as="li" className="space-y-3">
      <div className="flex items-start justify-between gap-3">
        <div className="min-w-0">
          <p className="font-medium">
            {child.initials}
            <span className="ml-2 text-xs font-normal text-faint">{child.icdsId}</span>
          </p>
          <p className="text-sm text-on-surface-variant">
            {child.sex === 'M' ? t('sexMale') : t('sexFemale')} ·{' '}
            <span className="tabular-nums">{child.ageMonths}</span> {t('months')}
            {/* An estimated DOB changes how the z-score should be read, so it
                is surfaced rather than hidden (P0 data-model rule). */}
            {child.dobPrecision !== 'exact' && (
              <span className="ml-1.5 text-xs rounded-md border border-outline-variant bg-surface-variant px-1.5 py-0.5">
                {child.dobPrecision === 'estimated' ? t('dobEstimated') : t('dobMonthOnly')}
              </span>
            )}
          </p>
        </div>
        <ClassificationBadge growthClass={child.latestClass} />
      </div>

      {/* Oedema forces SAM under the WHO rule regardless of z-score, so it is
          called out separately rather than folded into the badge. */}
      {child.oedema && (
        <p className="flex items-center gap-1.5 text-sm font-medium text-class-sam">
          <AlertTriangle size={14} aria-hidden="true" />
          {t('oedemaPresent')}
        </p>
      )}

      <dl className="flex flex-wrap gap-x-5 gap-y-1 text-sm">
        <div>
          <dt className="text-xs text-faint">{t('rosterLastMeasured')}</dt>
          {/* Warning tone, not MAM amber: amber text is 1.9:1 on white. The
              icon and word carry the meaning for anyone who can't see it. */}
          <dd
            className={cn(
              'inline-flex items-center gap-1 font-medium tabular-nums',
              overdue && 'text-warning',
            )}
          >
            {overdue && <Clock size={13} aria-hidden="true" />}
            {days === null ? t('rosterNever') : `${days} ${t('daysAgo')}`}
            {overdue && <span className="ml-0.5 text-xs">{t('overdue')}</span>}
          </dd>
        </div>
        {child.waz !== null && (
          <div>
            <dt className="text-xs text-faint">{t('waz')}</dt>
            <dd className="font-medium tabular-nums">{child.waz.toFixed(1)}</dd>
          </div>
        )}
        {child.muacMm !== null && (
          <div>
            <dt className="text-xs text-faint">{t('muac')}</dt>
            <dd className="font-medium tabular-nums">{child.muacMm} mm</dd>
          </div>
        )}
      </dl>

      {consentBlocked ? (
        // Measurement is not offered at all without consent — the control is
        // absent rather than present-and-disabled, so it cannot be half-tried.
        <p className="flex items-start gap-1.5 text-sm text-on-surface-variant border-t border-outline-variant pt-3">
          <ShieldOff size={14} className="shrink-0 mt-0.5" aria-hidden="true" />
          {child.consent === 'withdrawn' ? t('consentWithdrawnNote') : t('consentMissingNote')}
        </p>
      ) : (
        <ButtonLink href="/worker/measure" variant="secondary" size="sm" block>
          <Ruler size={15} aria-hidden="true" />
          {t('newMeasurement')}
        </ButtonLink>
      )}
    </Card>
  );
}
