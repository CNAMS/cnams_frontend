'use client';

import React, { useEffect } from 'react';
import { AlertTriangle, Info, ScrollText } from 'lucide-react';
import { mockAuditLog, type AuditEntry } from '@/data/rosterData';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { AppShell } from '@/components/nav/AppShell';
import { Card, CardHeader } from '@/components/ui/Card';
import { EmptyState, SampleDataChip } from '@/components/ui/Feedback';
import { cn } from '@/lib/cn';

/**
 * The audit trail — who changed what, and when.
 *
 * Actions are stored as translation keys rather than English sentences, so the
 * audit view localises like the rest of the product. A log that is only
 * readable in English is not an audit trail for a Hindi-first team.
 */
export default function AdminAuditPage() {
  const { t } = useLanguage();
  const { role, setRole } = useTheme();

  useEffect(() => {
    if (role !== 'admin') setRole('admin');
  }, [role, setRole]);

  // Newest first — an audit log is read from the top.
  const entries = [...mockAuditLog].sort(
    (a, b) => new Date(b.timestampIso).getTime() - new Date(a.timestampIso).getTime(),
  );

  return (
    <AppShell
      breadcrumbs={[{ labelKey: 'navConsole', href: '/admin' }, { labelKey: 'adminAudit' }]} title={t('adminAudit')} subtitle={t('auditSubtitle')} actions={<SampleDataChip />}>
      <div className="max-w-3xl">
        <Card flush>
          <CardHeader title={t('auditRecent')} />
          {entries.length === 0 ? (
            <EmptyState icon={ScrollText} title={t('auditEmpty')} description={t('auditEmptyBody')} />
          ) : (
            <ol className="divide-y divide-outline-variant">
              {entries.map((entry) => (
                <AuditRow key={entry.id} entry={entry} />
              ))}
            </ol>
          )}
        </Card>
        <p className="mt-4 text-sm text-on-surface-variant leading-relaxed">
          {t('auditRetentionNote')}
        </p>
      </div>
    </AppShell>
  );
}

function AuditRow({ entry }: { entry: AuditEntry }) {
  const { t } = useLanguage();
  const warning = entry.severity === 'warning';
  const Icon = warning ? AlertTriangle : Info;

  return (
    <li className="px-5 py-4 flex items-start gap-3">
      <Icon
        size={17}
        aria-hidden="true"
        className={cn('shrink-0 mt-0.5', warning ? 'text-class-mam' : 'text-on-surface-variant')}
      />
      <div className="min-w-0 flex-1">
        <p className="text-sm">
          <span className="font-semibold">{entry.actor}</span>{' '}
          <span className="text-on-surface-variant">{t(entry.action)}</span>{' '}
          <span className="font-medium">{entry.target}</span>
        </p>
        <time
          dateTime={entry.timestampIso}
          className="block text-xs text-on-surface-variant mt-0.5 tabular-nums"
        >
          {new Date(entry.timestampIso).toLocaleString()}
        </time>
      </div>
    </li>
  );
}
