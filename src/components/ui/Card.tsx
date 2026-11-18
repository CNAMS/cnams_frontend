import React from 'react';
import { cn } from '@/lib/cn';

/**
 * The container surface (docs/DESIGN.md §4, §6).
 *
 * Borders before shadows: a card is a white sheet with a hairline. `raised`
 * exists for the rare card that genuinely floats above its neighbours (a
 * dialog-like callout), not for emphasis — emphasis comes from content.
 */

type Elevation = 'flat' | 'raised';

type CardProps = {
  elevation?: Elevation;
  /** Removes padding so the card can hold a flush table or list. */
  flush?: boolean;
  as?: 'div' | 'section' | 'article' | 'li';
  children: React.ReactNode;
  className?: string;
};

export function Card({
  elevation = 'flat',
  flush = false,
  as: Tag = 'div',
  children,
  className,
}: CardProps) {
  return (
    <Tag
      className={cn(
        'bg-surface-container border border-outline-variant rounded-card',
        'overflow-hidden',
        elevation === 'raised' && 'shadow-md',
        !flush && 'p-5 sm:p-6',
        className,
      )}
    >
      {children}
    </Tag>
  );
}

/**
 * A card's title bar. Sits flush against the card edge, so it is only valid
 * inside a `flush` Card.
 */
export function CardHeader({
  title,
  description,
  action,
  className,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  /** Usually a "view all" link. Optional — most cards do not need one. */
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4',
        'px-5 sm:px-6 py-4 border-b border-outline-variant',
        className,
      )}
    >
      <div className="min-w-0">
        <h3 className="text-section font-semibold text-on-surface">{title}</h3>
        {description && (
          <p className="text-sm text-on-surface-variant mt-0.5">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}

/**
 * A heading above a group of cards. Ported from DashSection in the Flutter
 * app's dashboard_widgets.dart.
 *
 * `level` exists because a screen reader's document outline depends on the
 * heading level, not on the font size.
 */
export function SectionHeader({
  title,
  description,
  action,
  level = 2,
  className,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  action?: React.ReactNode;
  level?: 2 | 3;
  className?: string;
}) {
  const Heading = level === 2 ? 'h2' : 'h3';
  return (
    <div className={cn('flex items-end justify-between gap-4 mb-4', className)}>
      <div className="min-w-0">
        <Heading className="text-section font-semibold text-on-surface">{title}</Heading>
        {description && (
          <p className="text-sm text-on-surface-variant mt-0.5">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
