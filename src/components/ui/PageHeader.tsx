import React from 'react';
import { cn } from '@/lib/cn';

/**
 * The top of every page (docs/DESIGN.md §4 "Page anatomy"): breadcrumbs, a
 * serif title, one line of description, and at most two actions.
 *
 * The serif is reserved for page titles and the landing hero; it gives the
 * page the weight of an institution's document while the UI stays sans.
 */
export function PageHeader({
  title,
  description,
  actions,
  breadcrumbs,
  className,
}: {
  title: React.ReactNode;
  description?: React.ReactNode;
  actions?: React.ReactNode;
  breadcrumbs?: React.ReactNode;
  className?: string;
}) {
  return (
    <div className={cn('mb-6 sm:mb-8', className)}>
      {breadcrumbs && <div className="mb-3">{breadcrumbs}</div>}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div className="min-w-0">
          <h1 className="font-serif text-title font-semibold text-on-surface text-balance">
            {title}
          </h1>
          {description && (
            <p className="mt-1.5 text-body text-on-surface-variant max-w-2xl text-pretty">
              {description}
            </p>
          )}
        </div>
        {actions && <div className="flex flex-wrap items-center gap-2 shrink-0">{actions}</div>}
      </div>
    </div>
  );
}
