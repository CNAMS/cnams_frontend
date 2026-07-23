'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { mockFlaggedChildren } from '@/data/mockData';
import { ArrowLeft, SortAsc, SortDesc, Filter, CheckCircle2, XCircle, AlertTriangle } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import LanguageToggle from '@/components/LanguageToggle';

type SortOrder = 'asc' | 'desc';

export default function ReferralsPage() {
  const { t } = useLanguage();
  const [sortOrder, setSortOrder] = useState<SortOrder>('desc');
  const [filterStatus, setFilterStatus] = useState<'ALL' | 'SAM' | 'MAM'>('ALL');

  const filteredAndSorted = mockFlaggedChildren
    .filter(c => filterStatus === 'ALL' || c.status === filterStatus)
    .sort((a, b) => sortOrder === 'asc' ? a.daysElapsed - b.daysElapsed : b.daysElapsed - a.daysElapsed);

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans">

      {/* ── Header ───────────────────────────────────────────────── */}
      <header className="bg-brand px-6 py-4 flex items-center justify-between shadow-md sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <Link href="/supervisor" className="p-2 bg-white/10 hover:bg-white/20 rounded-lg transition-colors text-white">
            <ArrowLeft size={20} />
          </Link>
          <div>
            <h1 className="text-xl font-bold text-white tracking-tight">{t('referralsListTitle')}</h1>
            <p className="text-white/70 text-sm">{t('referralsListSubtitle')}</p>
          </div>
        </div>
        <LanguageToggle />
      </header>

      <main className="max-w-6xl mx-auto p-6 space-y-5">

        {/* ── Toolbar ──────────────────────────────────────────────── */}
        <div className="bg-card border border-outline rounded-2xl p-4 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shadow-sm">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold uppercase tracking-widest text-on-surface-variant flex items-center gap-1"><Filter size={14}/>{t('filter')}</span>
            {(['ALL','SAM','MAM'] as const).map(f => (
              <button key={f} onClick={() => setFilterStatus(f)}
                className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider border-2 transition-colors
                  ${filterStatus === f
                    ? f==='SAM' ? 'bg-class-sam text-white border-class-sam'
                    : f==='MAM' ? 'bg-class-mam text-on-surface border-class-mam'
                    : 'bg-brand text-white border-brand'
                  : 'bg-card text-on-surface-variant border-outline hover:bg-primary-container/40'}`}
              >
                {f === 'ALL' ? t('all') : t(f === 'SAM' ? 'sam' : 'mam')}
              </button>
            ))}
          </div>
          <button onClick={() => setSortOrder(s => s==='asc'?'desc':'asc')}
            className="flex items-center gap-2 px-4 py-2 bg-primary-container text-on-primary-container border-2 border-brand rounded-xl text-sm font-bold transition-colors hover:bg-brand hover:text-white"
          >
            {t('daysPending')} {sortOrder==='asc' ? <SortAsc size={16}/> : <SortDesc size={16}/>}
          </button>
        </div>

        {/* ── Table ────────────────────────────────────────────────── */}
        <div className="bg-card border border-outline rounded-2xl shadow-sm overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-primary-container border-b border-brand/20 text-xs font-bold uppercase tracking-wider text-on-primary-container">
                  <th className="px-6 py-4 text-left">{t('childInitials')}</th>
                  <th className="px-6 py-4 text-left">{t('icdsId')}</th>
                  <th className="px-6 py-4 text-left">{t('centre')}</th>
                  <th className="px-6 py-4 text-left">{t('status')}</th>
                  <th className="px-6 py-4 text-left">{t('daysPending')}</th>
                  <th className="px-6 py-4 text-center">{t('referralState')}</th>
                  <th className="px-6 py-4 text-center">{t('outcomeRecorded')}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-outline/40">
                {filteredAndSorted.map(child => (
                  <tr key={child.id} className="hover:bg-primary-container/20 transition-colors">
                    <td className="px-6 py-4 font-bold">{child.initials}</td>
                    <td className="px-6 py-4 font-mono text-xs font-bold text-on-surface-variant">{child.icdsId}</td>
                    <td className="px-6 py-4 font-medium text-on-surface-variant">{child.centreName}</td>
                    <td className="px-6 py-4">
                      <span className={`inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold ${child.status === 'SAM' ? 'bg-class-sam text-white' : 'bg-class-mam text-on-surface'}`}>
                        <AlertTriangle size={12}/>{child.status}
                      </span>
                    </td>
                    <td className="px-6 py-4 font-bold text-on-surface-variant">{child.daysElapsed}d</td>
                    <td className="px-6 py-4 text-center">
                      {child.referred
                        ? <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-class-normal text-white"><CheckCircle2 size={12}/>{t('referred')}</span>
                        : <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-class-sam text-white"><XCircle size={12}/>{t('notReferred')}</span>}
                    </td>
                    <td className="px-6 py-4 text-center">
                      {child.outcomeRecorded
                        ? <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-class-normal text-white"><CheckCircle2 size={12}/>{t('resolved')}</span>
                        : <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-bold bg-class-mam text-on-surface"><AlertTriangle size={12}/>{t('pendingOutcome')}</span>}
                    </td>
                  </tr>
                ))}
                {filteredAndSorted.length === 0 && (
                  <tr><td colSpan={7} className="px-6 py-12 text-center text-on-surface-variant font-bold">{t('noFlaggedFound')}</td></tr>
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
}
