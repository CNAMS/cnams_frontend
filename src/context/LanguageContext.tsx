'use client';

import React, { createContext, useContext, useState, useEffect, useCallback, ReactNode } from 'react';
import { translations, type Language, type TranslationKey } from '@/data/translations';

/**
 * Hindi is the primary locale and English the fallback — not the other way
 * round. This mirrors the Flutter app, where hi.arb is the default locale and
 * en.arb the fallback (PRODUCTION_ROADMAP, "Localisation & Accessibility").
 */
export const DEFAULT_LANGUAGE: Language = 'hi';

const STORAGE_KEY = 'app-language';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: TranslationKey) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

function isLanguage(value: unknown): value is Language {
  return value === 'hi' || value === 'en';
}

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>(DEFAULT_LANGUAGE);

  // Restore the persisted choice. This runs after mount rather than during
  // render because localStorage does not exist on the server, so the first
  // paint is always DEFAULT_LANGUAGE and a returning English user briefly sees
  // Hindi. That is the correct trade for a Hindi-first product: the majority
  // case is never wrong, and the minority case self-corrects in one frame.
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (isLanguage(saved)) setLanguage(saved);
    } catch {
      // Private browsing or a blocked storage partition — fall back to Hindi.
    }
  }, []);

  // Keep <html lang> honest. Screen readers pick a voice and pronunciation
  // rules from this attribute, so a hardcoded lang="en" makes Devanagari get
  // read out by an English synthesiser. layout.tsx renders lang="hi" and this
  // corrects it whenever the user switches.
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  const changeLanguage = useCallback((lang: Language) => {
    setLanguage(lang);
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
      // Non-fatal: the switch still applies for this session.
    }
  }, []);

  const t = useCallback(
    (key: TranslationKey): string => {
      const entry = translations[key];
      if (!entry) {
        // Unreachable via the type system now, but kept for strings that
        // arrive from data rather than source.
        console.warn(`Translation key not found: ${String(key)}`);
        return String(key);
      }
      // Fall back to English when a Hindi string has not landed yet.
      return entry[language] || entry.en;
    },
    [language],
  );

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}
