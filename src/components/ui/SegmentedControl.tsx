'use client';

import React from 'react';
import { cn } from '@/lib/cn';

/**
 * A small set of mutually exclusive filters (All / SAM / MAM, Pending /
 * Resolved). docs/DESIGN.md §6.
 *
 * Rendered as a radiogroup with roving arrow-key focus, which is what a
 * screen reader expects for "pick one of these". Each page used to hand-roll
 * its own pill row with a 2px accent border, so the same control looked
 * different on three pages.
 */
export type Segment<T extends string> = {
  value: T;
  label: React.ReactNode;
  /** Optional count shown after the label, e.g. the number of SAM cases. */
  count?: number;
};

export function SegmentedControl<T extends string>({
  value,
  onChange,
  segments,
  label,
  className,
}: {
  value: T;
  onChange: (value: T) => void;
  segments: Segment<T>[];
  /** Accessible name for the group. */
  label: string;
  className?: string;
}) {
  const refs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const move = (from: number, delta: number) => {
    const next = (from + delta + segments.length) % segments.length;
    onChange(segments[next].value);
    refs.current[next]?.focus();
  };

  return (
    <div
      role="radiogroup"
      aria-label={label}
      className={cn(
        'inline-flex max-w-full overflow-x-auto items-center gap-0.5 p-0.5',
        'rounded-control bg-surface-variant border border-outline-variant',
        className,
      )}
    >
      {segments.map((s, i) => {
        const active = s.value === value;
        return (
          <button
            key={s.value}
            ref={(el) => {
              refs.current[i] = el;
            }}
            type="button"
            role="radio"
            aria-checked={active}
            tabIndex={active ? 0 : -1}
            onClick={() => onChange(s.value)}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowDown') {
                e.preventDefault();
                move(i, 1);
              } else if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') {
                e.preventDefault();
                move(i, -1);
              }
            }}
            className={cn(
              'inline-flex items-center gap-1.5 h-8 pointer-coarse:h-10 px-3 rounded-[6px] text-sm whitespace-nowrap',
              'transition-colors duration-fast ease-ankur',
              active
                ? 'bg-surface-container text-on-surface font-medium shadow-xs'
                : 'text-on-surface-variant hover:text-on-surface',
            )}
          >
            {s.label}
            {s.count !== undefined && (
              <span
                className={cn(
                  'tabular-nums text-xs rounded px-1 leading-5',
                  active ? 'bg-surface-variant text-on-surface-variant' : 'text-faint',
                )}
              >
                {s.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
