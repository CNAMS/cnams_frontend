import React from 'react';
import type { LucideIcon } from 'lucide-react';
import { cn } from '@/lib/cn';

/**
 * A metric tile: big number, small label, optional icon.
 *
 * Ported from DashStatTile in the app's dashboard_widgets.dart, including its
 * tint approach — a 12%-alpha wash of the accent colour rather than a solid
 * pastel fill. The portal's KPI row used fully saturated containers
 * (bg-sam-container, bg-mam-container, ...), which turned the dashboard into a
 * patchwork where four cards shouted at once.
 *
 * `tone` is deliberately limited. A tile is either neutral (the default, which
 * is most of them) or carries a clinical colour because the number IS a
 * clinical count. There is no decorative colour option.
 */

export type StatTone = 'neutral' | 'normal' | 'overweight' | 'mam' | 'sam' | 'indeterminate';

const TONES: Record<StatTone, { accent: string; wash: string }> = {
  neutral: { accent: 'var(--primary)', wash: 'var(--primary)' },
  normal: { accent: 'var(--class-normal)', wash: 'var(--class-normal)' },
  overweight: { accent: 'var(--class-overweight)', wash: 'var(--class-overweight)' },
  mam: { accent: 'var(--class-mam)', wash: 'var(--class-mam)' },
  sam: { accent: 'var(--class-sam)', wash: 'var(--class-sam)' },
  indeterminate: {
    accent: 'var(--class-indeterminate)',
    wash: 'var(--class-indeterminate)',
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
  /** Small qualifier under the label — e.g. "of 40 referred". */
  hint?: React.ReactNode;
  className?: string;
}) {
  const { accent, wash } = TONES[tone];

  return (
    <div
      className={cn(
        'rounded-2xl border border-outline-variant p-4 flex flex-col gap-1',
        className,
      )}
      style={{
        // color-mix keeps one colour definition doing both jobs, instead of
        // maintaining a second hardcoded pastel per tone the way the old
        // *-container classes did.
        backgroundColor: `color-mix(in srgb, ${wash} 10%, var(--surface-container))`,
      }}
    >
      {Icon && (
        <Icon size={20} aria-hidden="true" style={{ color: accent }} className="mb-1" />
      )}
      <span
        className="text-3xl font-bold leading-none tabular-nums"
        style={{ color: accent }}
      >
        {value}
      </span>
      <span className="text-sm text-on-surface-variant leading-snug">{label}</span>
      {hint && <span className="text-xs text-on-surface-variant/80">{hint}</span>}
    </div>
  );
}
