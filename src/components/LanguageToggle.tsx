'use client';

import React from 'react';
import { useLanguage } from '@/context/LanguageContext';
import { Languages } from 'lucide-react';

export default function LanguageToggle() {
  const { language, setLanguage } = useLanguage();
  return (
    <button
      onClick={() => setLanguage(language === 'en' ? 'hi' : 'en')}
      className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border-2 border-white/40 bg-white/20 text-white hover:bg-white/30 transition-colors text-sm font-semibold focus:outline-none focus:ring-2 focus:ring-white/60"
    >
      <Languages size={16} />
      <span>{language === 'en' ? 'हिन्दी' : 'English'}</span>
    </button>
  );
}
