import React from 'react';
import { cn } from '@/lib/cn';

/**
 * The container surface.
 *
 * The portal's cards all carried border + shadow + rounded-2xl + a 4px
 * coloured top rule at once, so every card competed for attention equally and
 * nothing read as more urgent than anything else. Emphasis here is a single
 * explicit prop with three levels, not an accumulation of decoration.
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
        'bg-surface-container border border-outline-variant rounded-2xl',
        'overflow-hidden',
        elevation === 'raised' && 'shadow-sm',
        !flush && 'p-5',
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
  action,
  className,
}: {
  title: React.ReactNode;
  /** Usually a "view all" link. Optional — most cards do not need one. */
  action?: React.ReactNode;
  className?: string;
}) {
  return (
    <div
      className={cn(
        'flex items-center justify-between gap-4',
        'px-5 py-4 border-b border-outline-variant bg-surface-variant',
        className,
      )}
    >
      <h3 className="font-semibold text-on-surface">{title}</h3>
      {action}
    </div>
  );
}

/**
 * A heading above a group of cards. Ported from DashSection in the Flutter
 * app's dashboard_widgets.dart.
 *
 * `level` exists because these were all rendering as visually-styled divs or
 * mismatched heading levels; a screen reader's document outline depends on
 * getting the level right, not on the font size.
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
    <div className={cn('flex items-end justify-between gap-4 mb-3', className)}>
      <div className="min-w-0">
        <Heading className="text-lg font-semibold text-on-surface">{title}</Heading>
        {description && (
          <p className="text-sm text-on-surface-variant mt-0.5">{description}</p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
