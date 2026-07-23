'use client';

import Link from 'next/link';
import LanguageToggle from '@/components/LanguageToggle';
import { useLanguage } from '@/context/LanguageContext';

export default function WorkerDashboard() {
  const { t } = useLanguage();

  return (
    <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-teal-50 via-white to-emerald-50 text-slate-800 font-sans selection:bg-teal-200">
      {/* Header */}
      <header className="bg-white/50 backdrop-blur-xl border-b border-white/50 px-6 py-5 flex justify-between items-center shadow-sm">
        <div>
          <h1 className="text-2xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-teal-600 to-emerald-600">Worker Dashboard</h1>
          <p className="text-sm text-slate-500 font-medium mt-1">Placeholder for worker interface</p>
        </div>
        <div className="flex items-center space-x-6">
          <LanguageToggle />
          <Link href="/login" className="text-sm font-bold text-teal-600 hover:text-emerald-600 transition-colors">
            {t('logout')}
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto p-6 flex items-center justify-center h-[70vh]">
        <div className="text-center space-y-4">
          <h2 className="text-3xl font-black text-slate-800">Coming Soon</h2>
          <p className="text-slate-500 max-w-md mx-auto">The worker interface for updating centre records and tracking daily screenings is currently under development.</p>
        </div>
      </main>
    </div>
  );
}
