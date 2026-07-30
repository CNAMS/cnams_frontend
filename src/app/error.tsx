'use client';

import React, { useEffect } from 'react';
import { RefreshCw, TriangleAlert } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { Button, ButtonLink } from '@/components/ui/Button';
import { SproutMark } from '@/components/brand/SproutMark';

/**
 * Route error boundary.
 *
 * Without this, an uncaught render error shows Next's default overlay in
 * development and a bare unstyled "Application error" page in production —
 * English-only, unbranded, and with no way forward except the back button.
 *
 * `reset()` re-renders the segment, which recovers from a transient failure
 * without a full page reload and without losing the user's language or theme.
 */
export default function RouteError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const { t } = useLanguage();

  useEffect(() => {
    // P6 instruments crash reporting; until that exists this is the only
    // record that something failed, so it is deliberately not silenced.
    console.error('Route error:', error);
  }, [error]);

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans flex items-center justify-center px-6">
      <div className="text-center max-w-md space-y-5">
        <SproutMark size={56} title="" className="mx-auto" />

        <div className="w-12 h-12 rounded-full bg-sam-container flex items-center justify-center mx-auto">
          <TriangleAlert size={22} className="text-class-sam" aria-hidden="true" />
        </div>

        <div className="space-y-2">
          <h1 className="text-2xl font-bold tracking-tight">{t('errorTitle')}</h1>
          <p className="text-on-surface-variant leading-relaxed">{t('errorBody')}</p>
        </div>

        {/* The digest is the only handle support has on a production error —
            the message itself is stripped from the client bundle. */}
        {error.digest && (
          <p className="text-xs text-on-surface-variant">
            {t('errorReference')}{' '}
            <code className="bg-surface-variant border border-outline-variant rounded px-1.5 py-0.5">
              {error.digest}
            </code>
          </p>
        )}

        <div className="flex flex-wrap gap-3 justify-center">
          <Button variant="primary" onClick={reset}>
            <RefreshCw size={16} aria-hidden="true" />
            {t('errorRetry')}
          </Button>
          <ButtonLink href="/" variant="secondary">
            {t('backToHome')}
          </ButtonLink>
        </div>
      </div>
    </div>
  );
}
