'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import LanguageToggle from '@/components/LanguageToggle';
import { useLanguage } from '@/context/LanguageContext';
import { Briefcase, Users } from 'lucide-react';

type Role = 'supervisor' | 'worker';

export default function LoginPage() {
  const { t } = useLanguage();
  const router = useRouter();
  const [role, setRole] = useState<Role>('supervisor');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    router.push(role === 'supervisor' ? '/supervisor' : '/worker');
  };

  return (
    <div className="min-h-screen bg-surface flex flex-col font-sans text-on-surface">

      {/* Teal top-strip header */}
      <header className="bg-brand px-6 py-4 flex justify-between items-center shadow-md">
        <h1 className="text-xl font-bold text-white tracking-tight">{t('appTitle')}</h1>
        <LanguageToggle />
      </header>

      {/* Tinted hero band */}
      <div className="bg-primary-container border-b border-brand/20 py-10 px-6 text-center">
        <div className="w-16 h-16 bg-brand rounded-full mx-auto mb-4 flex items-center justify-center shadow-md">
          <Briefcase size={28} className="text-white" />
        </div>
        <p className="text-on-surface-variant font-medium">
          {role === 'supervisor' ? t('loginSubtitle') : t('workerLoginSubtitle')}
        </p>
      </div>

      {/* Card */}
      <div className="flex-1 flex items-start justify-center px-4 py-10">
        <div className="bg-card border border-outline rounded-2xl shadow-sm max-w-sm w-full p-8 space-y-6">

          {/* Role toggle */}
          <div className="flex border-2 border-brand rounded-xl overflow-hidden">
            <button
              onClick={() => setRole('supervisor')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold transition-colors ${role === 'supervisor' ? 'bg-brand text-white' : 'bg-card text-on-surface-variant hover:bg-primary-container'}`}
            >
              <Briefcase size={16} />
              {t('supervisorRole')}
            </button>
            <button
              onClick={() => setRole('worker')}
              className={`flex-1 flex items-center justify-center gap-2 py-2.5 text-sm font-bold transition-colors ${role === 'worker' ? 'bg-brand text-white' : 'bg-card text-on-surface-variant hover:bg-primary-container'}`}
            >
              <Users size={16} />
              {t('workerRole')}
            </button>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="space-y-5">
            <div className="space-y-1">
              <label className="text-sm font-semibold text-on-surface" htmlFor="pin">
                {t('pinLabel')}
              </label>
              <input
                id="pin"
                type="password"
                placeholder="••••••••"
                className="w-full px-4 py-2.5 border-2 border-outline rounded-lg bg-surface focus:border-brand focus:outline-none transition-colors placeholder:text-outline"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-brand hover:bg-brand-dark text-white font-bold py-3 rounded-xl shadow-sm transition-colors"
            >
              {t('mockLoginButton')}
            </button>
          </form>

        </div>
      </div>
    </div>
  );
}
