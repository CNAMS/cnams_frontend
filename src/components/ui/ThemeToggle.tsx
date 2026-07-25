'use client';

import React from 'react';
import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme, type ColorScheme } from '@/context/ThemeContext';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/cn';

/**
 * Light / dark / system, as a three-way segmented control rather than a
 * two-state switch.
 *
 * A plain toggle silently overrides the OS preference the first time it is
 * touched and gives no way back — 'system' has to be reachable, not just the
 * initial default.
 */

const OPTIONS: { value: ColorScheme; icon: typeof Sun; labelKey: string }[] = [
  { value: 'light', icon: Sun, labelKey: 'themeLight' },
  { value: 'dark', icon: Moon, labelKey: 'themeDark' },
  { value: 'system', icon: Monitor, labelKey: 'themeSystem' },
];

export function ThemeToggle({ className }: { className?: string }) {
  const { colorScheme, setColorScheme } = useTheme();
  const { t } = useLanguage();

  return (
    <div
      role="radiogroup"
      aria-label={t('toggleTheme')}
      className={cn(
        'inline-flex items-center gap-0.5 p-0.5 rounded-full',
        'bg-surface-variant border border-outline-variant',
        className,
      )}
    >
      {OPTIONS.map(({ value, icon: Icon, labelKey }) => {
        const active = colorScheme === value;
        return (
          <button
            key={value}
            type="button"
            role="radio"
            aria-checked={active}
            aria-label={t(labelKey)}
            title={t(labelKey)}
            onClick={() => setColorScheme(value)}
            className={cn(
              'flex items-center justify-center w-8 h-8 rounded-full',
              'transition-colors duration-fast ease-ankur',
              active
                ? 'bg-brand text-on-primary'
                : 'text-on-surface-variant hover:bg-surface-container',
            )}
          >
            <Icon size={15} aria-hidden="true" />
          </button>
        );
      })}
    </div>
  );
}
