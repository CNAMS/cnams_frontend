import React from 'react';
import { cn } from '@/lib/cn';

/**
 * A table that stops being a table on small screens.
 *
 * The portal wrapped every table in `overflow-x-auto` and called it
 * responsive. That is not responsive, it is a horizontal scrollbar: the
 * referrals table has seven columns, so on the phone that supervisors actually
 * carry, reading one row means scrolling sideways and losing the child's name
 * off the left edge before reaching the referral state.
 *
 * Below `md` each row is rendered instead as a stacked card — the `primary`
 * column becomes the heading, and the rest become label/value pairs that stay
 * readable at any width. Above `md` it is a real <table>, because that is the
 * right structure for comparing rows and for screen-reader table navigation.
 *
 * Both renderings come from one column definition, so they cannot drift.
 */

export type Column<T> = {
  /** Stable identity for the column. */
  key: string;
  header: React.ReactNode;
  cell: (row: T) => React.ReactNode;
  align?: 'left' | 'right' | 'center';
  /**
   * Marks the identifying column — becomes the card heading on mobile.
   * Exactly one column should set this.
   */
  primary?: boolean;
  /** Omit from the mobile card when the value is redundant there. */
  hideOnMobile?: boolean;
  /** Extra classes for the <td>. */
  cellClassName?: string;
};

const ALIGN = {
  left: 'text-left',
  right: 'text-right',
  center: 'text-center',
} as const;

export function DataTable<T>({
  data,
  columns,
  getRowKey,
  caption,
  empty,
  className,
}: {
  data: T[];
  columns: Column<T>[];
  getRowKey: (row: T) => string;
  /**
   * Describes the table for screen readers. Required, not optional — a table
   * announced as "table with 7 columns" and no name is unnavigable. Visually
   * hidden by default since the surrounding card already carries a title.
   */
  caption: string;
  empty?: React.ReactNode;
  className?: string;
}) {
  if (data.length === 0 && empty) {
    return <>{empty}</>;
  }

  const primary = columns.find((c) => c.primary) ?? columns[0];
  const secondary = columns.filter((c) => c !== primary && !c.hideOnMobile);

  return (
    <div className={className}>
      {/* ── Mobile: one card per row ──────────────────────────────────────── */}
      <ul className="md:hidden divide-y divide-outline-variant">
        {data.map((row) => (
          <li key={getRowKey(row)} className="px-4 py-4 space-y-2">
            <div className="font-semibold text-on-surface">{primary.cell(row)}</div>
            <dl className="grid grid-cols-2 gap-x-4 gap-y-1.5">
              {secondary.map((col) => (
                <React.Fragment key={col.key}>
                  <dt className="text-xs text-on-surface-variant self-center">
                    {col.header}
                  </dt>
                  <dd className="text-sm text-on-surface justify-self-end text-right">
                    {col.cell(row)}
                  </dd>
                </React.Fragment>
              ))}
            </dl>
          </li>
        ))}
      </ul>

      {/* ── Desktop: a real table ─────────────────────────────────────────── */}
      <div className="hidden md:block overflow-x-auto">
        <table className="w-full text-sm border-collapse">
          <caption className="sr-only">{caption}</caption>
          <thead>
            <tr className="border-b border-outline-variant bg-surface-variant">
              {columns.map((col) => (
                <th
                  key={col.key}
                  // `scope` is what lets a screen reader announce the column
                  // name with each cell. None of the original tables had it.
                  scope="col"
                  className={cn(
                    'px-5 py-3 text-xs font-semibold uppercase tracking-wide',
                    'text-on-surface-variant',
                    ALIGN[col.align ?? 'left'],
                  )}
                >
                  {col.header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-outline-variant">
            {data.map((row) => (
              <tr
                key={getRowKey(row)}
                className="hover:bg-surface-variant/60 transition-colors duration-fast ease-ankur"
              >
                {columns.map((col) => (
                  <td
                    key={col.key}
                    className={cn(
                      'px-5 py-3 text-on-surface',
                      ALIGN[col.align ?? 'left'],
                      col.cellClassName,
                    )}
                  >
                    {col.cell(row)}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
