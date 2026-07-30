'use client';

import React from 'react';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import type { TranslationKey } from '@/data/translations';

/**
 * Trail from a role's home to the current sub-page.
 *
 * Sub-pages (/worker/children, /admin/analytics, /centres/[id]) gave no
 * indication of where they sat. The sidebar highlights the section but
 * disappears below lg, so on a phone a user landing on a sub-page by deep link
 * had no upward path at all except the browser's back button — which does not
 * exist as an affordance in an installed PWA.
 *
 * The last item is not a link and carries aria-current="page", per the WAI
 * breadcrumb pattern.
 */

export type Crumb = {
  labelKey: TranslationKey;
  href?: string;
};

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const { t } = useLanguage();
  if (items.length === 0) return null;

  return (
    <nav aria-label={t('breadcrumbLabel')} className="mb-4">
      <ol className="flex flex-wrap items-center gap-1 text-sm">
        {items.map((item, i) => {
          const last = i === items.length - 1;
          return (
            <li key={`${item.labelKey}-${i}`} className="flex items-center gap-1">
              {i > 0 && (
                <ChevronRight
                  size={14}
                  aria-hidden="true"
                  className="text-on-surface-variant/60 shrink-0"
                />
              )}
              {last || !item.href ? (
                <span
                  aria-current={last ? 'page' : undefined}
                  className="text-on-surface font-medium"
                >
                  {t(item.labelKey)}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-on-surface-variant hover:text-brand hover:underline"
                >
                  {t(item.labelKey)}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
