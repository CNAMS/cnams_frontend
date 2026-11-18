'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLocale } from '@/context/LocaleContext';
import { locales, type Locale } from '@/i18n/config';
import { cn } from '@/lib/cn';

const LANGUAGE_LABELS: Record<Locale, string> = {
  hi: 'हिन्दी',
  en: 'English',
  mr: 'मराठी',
  gu: 'ગુજરાતી',
};

export default function LanguageToggle({ className }: { className?: string }) {
  const { locale, setLocale } = useLocale();
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    if (!open) return;
    const handleClick = (e: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, [open]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    document.addEventListener('keydown', handleKey);
    return () => document.removeEventListener('keydown', handleKey);
  }, [open]);

  return (
    <div ref={dropdownRef} className={cn('relative', className)}>
      <button
        type="button"
        aria-haspopup="listbox"
        aria-expanded={open}
        onClick={() => setOpen((prev) => !prev)}
        className={cn(
          'flex items-center gap-1.5 pl-3 pr-2 h-9 pointer-coarse:h-11 rounded-control text-sm font-medium',
          'bg-surface-container border border-line-strong text-on-surface shadow-xs',
          'hover:bg-surface-variant transition-colors duration-fast ease-ankur',
          open && 'border-outline'
        )}
      >
        <span lang={locale}>{LANGUAGE_LABELS[locale]}</span>
        <ChevronDown
          size={15}
          aria-hidden="true"
          className={cn('text-faint transition-transform duration-fast', open && 'rotate-180')}
        />
      </button>

      {open && (
        <ul
          role="listbox"
          className={cn(
            'absolute right-0 top-[calc(100%+0.375rem)] min-w-[140px] z-50',
            'bg-raised border border-outline-variant rounded-card overflow-hidden shadow-md',
            'p-1 flex flex-col page-enter'
          )}
        >
          {locales.map((code) => {
            const active = locale === code;
            return (
              <li key={code} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    setLocale(code);
                    setOpen(false);
                  }}
                  lang={code}
                  className={cn(
                    'w-full text-left px-3 h-9 pointer-coarse:h-11 rounded-control text-sm',
                    'transition-colors duration-fast ease-ankur',
                    active
                      ? 'bg-primary-container text-on-primary-container'
                      : 'text-on-surface hover:bg-surface-variant'
                  )}
                >
                  {LANGUAGE_LABELS[code]}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
