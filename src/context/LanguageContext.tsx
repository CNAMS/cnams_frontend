'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { translations, Language } from '@/data/translations';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof typeof translations) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguage] = useState<Language>('en');

  // Load language preference from local storage if available
  useEffect(() => {
    const saved = localStorage.getItem('app-language');
    if (saved === 'hi' || saved === 'en') {
      setLanguage(saved);
    }
  }, []);

  const changeLanguage = (lang: Language) => {
    setLanguage(lang);
    localStorage.setItem('app-language', lang);
  };

  const t = (key: keyof typeof translations): string => {
    if (!translations[key]) {
      console.warn(`Translation key not found: ${String(key)}`);
      return String(key);
    }
    return translations[key][language];
  };

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
