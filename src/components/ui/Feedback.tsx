'use client';

import React from 'react';
import { FlaskConical, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/cn';

/**
 * Empty, loading and honesty states.
 *
 * The portal's empty states were bare table rows of bold grey text
 * ("No pending referrals.") with no icon and no explanation of what would put
 * something there. The roadmap asks for localised empty and loading states on
 * every surface (§EX3 DoD).
 */

export function EmptyState({
  icon: Icon,
  title,
  description,
  action,
  className,
}: {
  icon?: LucideIcon;
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex flex-col items-center justify-center text-center gap-2 px-6 py-12',
        className,
      )}
    >
      {Icon && (
        <div className="w-12 h-12 rounded-full bg-surface-variant flex items-center justify-center mb-1">
          <Icon size={22} className="text-on-surface-variant" aria-hidden="true" />
        </div>
      )}
      <p className="font-semibold text-on-surface">{title}</p>
      {description && (
        <p className="text-sm text-on-surface-variant max-w-sm">{description}</p>
      )}
      {action && <div className="mt-2">{action}</div>}
    </div>
  );
}

/**
 * Marks a surface or figure as illustrative sample data.
 *
 * Ported from SampleChip in the app's dashboard_widgets.dart, where the stated
 * reason is worth repeating: the dashboards show representative figures until
 * the multi-centre aggregates and backend telemetry are live, and the app
 * chose to stay honest about that rather than pass sample numbers off as real.
 *
 * The portal has the same problem and had no such marker — it renders
 * src/data/mockData.ts as though it were live, including on the PUBLIC landing
 * page, where "42 children monitored" reads as a real programme statistic.
 */
export function SampleDataChip({ className }: { className?: string }) {
  const { t } = useLanguage();
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 shrink-0',
        'rounded-full bg-surface-variant border border-outline-variant',
        'px-2.5 py-1 text-xs font-medium text-on-surface-variant',
        className,
      )}
    >
      <FlaskConical size={13} aria-hidden="true" />
      {t('sampleData')}
    </span>
  );
}

/** A shimmer placeholder sized by className. */
export function Skeleton({ className }: { className?: string }) {
  return (
    <div
      aria-hidden="true"
      className={cn('animate-pulse rounded-md bg-surface-variant', className)}
    />
  );
}
