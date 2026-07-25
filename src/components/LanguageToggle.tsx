'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/cn';

/**
 * Hindi ⇄ English switch.
 *
 * Both names are always rendered in their own script (हिन्दी / English) — the
 * roadmap is explicit about this, and it is the only presentation that works
 * for a user who cannot read the other one.
 *
 * Restyled onto surface tokens: it previously hardcoded white/40 borders on
 * the assumption it always sat on a solid brand-coloured bar, which left it
 * invisible anywhere else.
 */
export default function LanguageToggle({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();

  return (
    <div
      role="radiogroup"
      aria-label="भाषा / Language"
      className={cn(
        'inline-flex items-center gap-0.5 p-0.5 rounded-full',
        'bg-surface-variant border border-outline-variant',
        className,
      )}
    >
      {(['hi', 'en'] as const).map((lang) => {
        const active = language === lang;
        return (
          <button
            key={lang}
            type="button"
            role="radio"
            aria-checked={active}
            onClick={() => setLanguage(lang)}
            // lang on the button itself so a screen reader pronounces each
            // label with the right voice.
            lang={lang}
            className={cn(
              'px-3 h-8 rounded-full text-sm font-semibold',
              'transition-colors duration-fast ease-ankur',
              active
                ? 'bg-brand text-on-primary'
                : 'text-on-surface-variant hover:bg-surface-container',
            )}
          >
            {lang === 'hi' ? 'हिन्दी' : 'English'}
          </button>
        );
      })}
    </div>
  );
}
