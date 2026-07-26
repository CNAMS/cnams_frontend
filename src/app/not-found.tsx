'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { SproutMark } from '@/components/brand/SproutMark';
import { ButtonLink } from '@/components/ui/Button';

/**
 * The 404.
 *
 * Centre detail calls notFound() for an unknown id, which until now rendered
 * Next's built-in page: unstyled, unbranded and English-only, on a Hindi-first
 * product. A supervisor following a stale link landed somewhere that did not
 * look like Ankur and offered no way back.
 */
export default function NotFound() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans flex items-center justify-center px-6">
      <div className="text-center max-w-md space-y-5">
        <SproutMark size={64} title="" className="mx-auto" />
        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">{t('notFoundTitle')}</h1>
          <p className="text-on-surface-variant leading-relaxed">{t('notFoundBody')}</p>
        </div>
        <div className="flex flex-wrap gap-3 justify-center">
          <ButtonLink href="/" variant="primary">
            {t('backToHome')}
          </ButtonLink>
          <ButtonLink href="/supervisor" variant="secondary">
            {t('navOverview')}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
