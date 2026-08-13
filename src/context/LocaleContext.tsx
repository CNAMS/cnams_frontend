'use client';

import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react';
import { NextIntlClientProvider } from 'next-intl';
import { defaultLocale, isLocale, type Locale } from '@/i18n/config';

const STORAGE_KEY = 'app-language';

type LocaleContextType = {
  locale: Locale;
  setLocale: (locale: Locale) => void;
};

const LocaleContext = createContext<LocaleContextType | undefined>(undefined);

/** Load messages for a given locale. */
async function loadMessages(locale: Locale) {
  const mod = await import(`../../messages/${locale}.json`);
  return mod.default as Record<string, string>;
}

/**
 * Manages the active locale and wraps children in NextIntlClientProvider.
 *
 * On mount, restores the persisted locale from localStorage.
 * On change, persists it and dynamically loads the new message bundle.
 *
 * IMPORTANT: locale and messages are always updated together so
 * NextIntlClientProvider never receives mismatched props.
 */
export function LocaleProvider({ children }: { children: ReactNode }) {
  const [state, setState] = useState<{
    locale: Locale;
    messages: Record<string, string> | null;
  }>({ locale: defaultLocale, messages: null });

  // On mount: load messages for the initial locale (or the saved one)
  useEffect(() => {
    const saved = (() => {
      try {
        const v = localStorage.getItem(STORAGE_KEY);
        return isLocale(v) ? v : null;
      } catch {
        return null;
      }
    })();

    const initial = saved ?? defaultLocale;

    loadMessages(initial).then((messages) => {
      setState({ locale: initial, messages });
    });
  }, []);

  // Keep <html lang> in sync
  useEffect(() => {
    document.documentElement.lang = state.locale;
  }, [state.locale]);

  const setLocale = useCallback((next: Locale) => {
    // Load messages first, then update both atomically
    loadMessages(next).then((messages) => {
      setState({ locale: next, messages });
      try {
        localStorage.setItem(STORAGE_KEY, next);
      } catch {
        // Non-fatal.
      }
    });
  }, []);

  // Show nothing until messages are loaded (prevents flash of translation keys)
  if (!state.messages) return null;

  return (
    <LocaleContext.Provider value={{ locale: state.locale, setLocale }}>
      <NextIntlClientProvider key={state.locale} locale={state.locale} messages={state.messages}>
        {children}
      </NextIntlClientProvider>
    </LocaleContext.Provider>
  );
}

export function useLocale() {
  const context = useContext(LocaleContext);
  if (context === undefined) {
    throw new Error('useLocale must be used within a LocaleProvider');
  }
  return context;
}
