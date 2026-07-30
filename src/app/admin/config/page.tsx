'use client';

import React, { useEffect } from 'react';
import { Lock, Pencil, ShieldAlert } from 'lucide-react';
import { mockConfig } from '@/data/rosterData';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { AppShell } from '@/components/nav/AppShell';
import { Card, SectionHeader } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { SampleDataChip } from '@/components/ui/Feedback';

/**
 * Configuration and reference data.
 *
 * The `locked` distinction is the point of this page. Clinical constants — the
 * WHO reference tables and the z-score engine version — are NOT preferences.
 * Every measurement row stores engine_version precisely so a historical
 * z-score can be reproduced; letting someone edit that from a settings screen
 * would silently invalidate the audit trail P0 froze the data model to protect.
 *
 * So they render locked, with the reason stated, rather than being hidden
 * (which would imply they do not exist) or editable (which would be wrong).
 */
export default function AdminConfigPage() {
  const { t } = useLanguage();
  const { role, setRole } = useTheme();

  useEffect(() => {
    if (role !== 'admin') setRole('admin');
  }, [role, setRole]);

  const locked = mockConfig.filter((c) => c.locked);
  const editable = mockConfig.filter((c) => !c.locked);

  return (
    <AppShell
      breadcrumbs={[{ labelKey: 'navConsole', href: '/admin' }, { labelKey: 'navConfig' }]} title={t('navConfig')} subtitle={t('configSubtitle')} actions={<SampleDataChip />}>
      <div className="max-w-3xl space-y-8">
        {/* ── Clinical constants ────────────────────────────────────────── */}
        <section>
          <SectionHeader title={t('configClinical')} description={t('configClinicalHint')} />
          <Card className="divide-y divide-outline-variant">
            {locked.map((item) => (
              <div key={item.id} className="flex flex-wrap items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="flex items-center gap-2 font-semibold">
                    <Lock size={14} className="text-on-surface-variant shrink-0" aria-hidden="true" />
                    {t(item.labelKey)}
                  </p>
                  <p className="text-sm text-on-surface-variant leading-relaxed mt-0.5">
                    {t(item.descriptionKey)}
                  </p>
                </div>
                <code className="text-sm bg-surface-variant border border-outline-variant rounded-lg px-2.5 py-1 shrink-0">
                  {item.value}
                </code>
              </div>
            ))}
          </Card>
        </section>

        {/* ── Operational settings ──────────────────────────────────────── */}
        <section>
          <SectionHeader title={t('configOperational')} description={t('configOperationalHint')} />
          <Card className="divide-y divide-outline-variant">
            {editable.map((item) => (
              <div key={item.id} className="flex flex-wrap items-start justify-between gap-4 py-4 first:pt-0 last:pb-0">
                <div className="min-w-0">
                  <p className="font-semibold">{t(item.labelKey)}</p>
                  <p className="text-sm text-on-surface-variant leading-relaxed mt-0.5">
                    {t(item.descriptionKey)}
                  </p>
                </div>
                <div className="flex items-center gap-2 shrink-0">
                  <code className="text-sm bg-surface-variant border border-outline-variant rounded-lg px-2.5 py-1">
                    {item.value}
                  </code>
                  <Button variant="ghost" size="sm" disabled>
                    <Pencil size={14} aria-hidden="true" />
                    {t('configEdit')}
                  </Button>
                </div>
              </div>
            ))}
          </Card>
        </section>

        {/* ── Gate G2 status ───────────────────────────────────────────────
            The single most important operational fact about this deployment,
            and it belongs on the config page where the tables are listed. */}
        <Card className="flex items-start gap-3 border-class-mam/40">
          <ShieldAlert size={20} className="text-class-mam shrink-0 mt-0.5" aria-hidden="true" />
          <div>
            <p className="font-semibold">{t('configGateTitle')}</p>
            <p className="text-sm text-on-surface-variant leading-relaxed mt-1">
              {t('configGateBody')}
            </p>
          </div>
        </Card>
      </div>
    </AppShell>
  );
}
