import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * A metric tile (docs/DESIGN.md §6): label, figure, optional qualifier.
 *
 * Ported from DashStatTile in the app's dashboard_widgets.dart. The figure is
 * always body-text colour; a clinical tone shows as the icon chip and a 3px
 * rule, never as coloured digits — MAM amber text is 1.9:1 on white, so
 * colouring the number made the one tile that mattered unreadable.
 *
 * `tone` is deliberately limited. A tile is either neutral (most of them) or
 * carries a clinical colour because the number IS a clinical count. There is
 * no decorative colour option.
 */

export type StatTone = 'neutral' | 'normal' | 'overweight' | 'mam' | 'sam' | 'indeterminate';

const TONES: Record<StatTone, { accent: string; ink: string }> = {
  neutral: { accent: 'var(--primary)', ink: 'var(--on-primary-container)' },
  normal: { accent: 'var(--class-normal)', ink: 'var(--class-normal-on-container)' },
  overweight: {
    accent: 'var(--class-overweight)',
    ink: 'var(--class-overweight-on-container)',
  },
  mam: { accent: 'var(--class-mam)', ink: 'var(--class-mam-on-container)' },
  sam: { accent: 'var(--class-sam)', ink: 'var(--class-sam-on-container)' },
  indeterminate: {
    accent: 'var(--class-indeterminate)',
    ink: 'var(--class-indeterminate-on-container)',
  },
};

export function StatTile({
  value,
  label,
  tone = 'neutral',
  icon: Icon,
  hint,
  className,
}: {
  value: React.ReactNode;
  label: React.ReactNode;
  tone?: StatTone;
  icon?: LucideIcon;
  /** Small qualifier under the figure — e.g. "of 40 referred". */
  hint?: React.ReactNode;
  className?: string;
}) {
  const { accent, ink } = TONES[tone];
  const clinical = tone !== 'neutral';

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-card border border-outline-variant',
        'bg-surface-container p-4 sm:p-5 flex flex-col gap-3',
        className,
      )}
    >
      {clinical && (
        <span
          aria-hidden="true"
          className="absolute inset-y-0 left-0 w-[3px]"
          style={{ backgroundColor: accent }}
        />
      )}
      <div className="flex items-start justify-between gap-3">
        <span className="text-sm text-on-surface-variant leading-snug">{label}</span>
        {Icon && (
          <span
            className="grid place-items-center w-8 h-8 rounded-control shrink-0"
            style={{
              // One colour definition doing both jobs: a 14% wash behind the
              // icon, with the icon in the readable on-container tone.
              backgroundColor: `color-mix(in srgb, ${accent} 14%, transparent)`,
              color: ink,
            }}
          >
            <Icon size={16} aria-hidden="true" />
          </span>
        )}
      </div>
      <div>
        <span className="block text-[1.75rem] font-semibold leading-none tracking-tight tabular-nums text-on-surface">
          {value}
        </span>
        {hint && <span className="block mt-1.5 text-xs text-faint">{hint}</span>}
      </div>
    </div>
  );
}
