'use client';

import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/cn';
import type { Language } from '@/data/translations';

const LANGUAGES: Record<Language, string> = {
  hi: 'हिन्दी',
  en: 'English',
  mr: 'मराठी',
};

export default function LanguageToggle({ className }: { className?: string }) {
  const { language, setLanguage } = useLanguage();
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
          'flex items-center gap-1.5 px-3 h-9 rounded-full text-sm font-semibold',
          'bg-surface-variant border border-outline-variant text-on-surface',
          'hover:bg-surface-container transition-colors duration-fast ease-ankur',
          open && 'ring-2 ring-brand ring-offset-1 ring-offset-surface-container'
        )}
      >
        <span lang={language}>{LANGUAGES[language]}</span>
        <ChevronDown size={16} className={cn("transition-transform", open && "rotate-180")} />
      </button>

      {open && (
        <ul
          role="listbox"
          className={cn(
            'absolute right-0 top-[calc(100%+0.5rem)] min-w-[120px] z-50',
            'bg-surface-container-high/95 backdrop-blur-xl',
            'border border-outline-variant rounded-xl overflow-hidden',
            'shadow-xl shadow-black/[0.08]',
            'py-1 flex flex-col'
          )}
        >
          {(Object.entries(LANGUAGES) as [Language, string][]).map(([code, label]) => {
            const active = language === code;
            return (
              <li key={code} role="presentation">
                <button
                  type="button"
                  role="option"
                  aria-selected={active}
                  onClick={() => {
                    setLanguage(code);
                    setOpen(false);
                  }}
                  lang={code}
                  className={cn(
                    'w-full text-left px-4 py-2.5 text-sm font-medium',
                    'transition-colors duration-fast ease-ankur',
                    active
                      ? 'bg-primary-container text-on-primary-container'
                      : 'text-on-surface hover:bg-surface-variant'
                  )}
                >
                  {label}
                </button>
              </li>
            );
          })}
        </ul>
      )}
    </div>
  );
}
