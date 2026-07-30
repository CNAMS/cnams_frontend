'use client';

import React, { useEffect, useMemo, useState } from 'react';
import { Check, Mail, Phone, ShieldCheck, UserPlus, Users, X } from 'lucide-react';
import { mockUsers, type AppUser, type UserStatus } from '@/data/rosterData';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import type { TranslationKey } from '@/data/translations';
import { ROLE_LABEL_KEY } from '@/components/nav/navigation';
import { AppShell } from '@/components/nav/AppShell';
import { Card, CardHeader, SectionHeader } from '@/components/ui/Card';
import { StatTile } from '@/components/ui/StatTile';
import { DataTable, type Column } from '@/components/ui/DataTable';
import { EmptyState, SampleDataChip } from '@/components/ui/Feedback';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

/**
 * User & role administration (§EX2).
 *
 * Role assignment is an explicit Admin action — a user requests a role on
 * sign-up and an admin approves and binds them to a centre, sector or child.
 * Nobody self-grants, least of all Admin. The pending queue is therefore the
 * primary surface here, not an afterthought below the table.
 */

const STATUS_STYLE: Record<UserStatus, { tone: string; labelKey: TranslationKey }> = {
  active: { tone: 'text-class-normal', labelKey: 'userActive' },
  pending: { tone: 'text-class-mam', labelKey: 'userPending' },
  suspended: { tone: 'text-class-indeterminate', labelKey: 'userSuspended' },
};

const METHOD_LABEL: Record<AppUser['signInMethod'], TranslationKey> = {
  google: 'authGoogle',
  phone_otp: 'authPhoneOtp',
  email_otp: 'authEmailOtp',
  pin: 'authPin',
};

export default function AdminUsersPage() {
  const { t } = useLanguage();
  const { role, setRole } = useTheme();
  const [decided, setDecided] = useState<Record<string, 'approved' | 'rejected'>>({});

  useEffect(() => {
    if (role !== 'admin') setRole('admin');
  }, [role, setRole]);

  const pending = useMemo(
    () => mockUsers.filter((u) => u.status === 'pending' && !decided[u.id]),
    [decided],
  );
  const active = mockUsers.filter((u) => u.status === 'active');
  const suspended = mockUsers.filter((u) => u.status === 'suspended');

  const columns: Column<AppUser>[] = [
    {
      key: 'name',
      header: t('userName'),
      primary: true,
      cell: (u) => <span className="font-medium">{u.name}</span>,
    },
    { key: 'role', header: t('settingsRole'), cell: (u) => t(ROLE_LABEL_KEY[u.role]) },
    {
      key: 'scope',
      header: t('userScope'),
      cell: (u) => <span className="text-on-surface-variant">{u.scope}</span>,
    },
    {
      key: 'method',
      header: t('userSignInMethod'),
      cell: (u) => <span className="text-on-surface-variant">{t(METHOD_LABEL[u.signInMethod])}</span>,
    },
    {
      key: 'status',
      header: t('status'),
      align: 'right',
      cell: (u) => {
        const s = STATUS_STYLE[u.status];
        return <span className={cn('text-sm font-medium', s.tone)}>{t(s.labelKey)}</span>;
      },
    },
  ];

  return (
    <AppShell
      breadcrumbs={[{ labelKey: 'navConsole', href: '/admin' }, { labelKey: 'navUsers' }]} title={t('navUsers')} subtitle={t('adminUsersSubtitle')} actions={<SampleDataChip />}>
      <div className="space-y-8">
        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          <StatTile icon={Users} value={mockUsers.length} label={t('userAccounts')} />
          <StatTile icon={ShieldCheck} tone="normal" value={active.length} label={t('userActive')} />
          <StatTile icon={UserPlus} tone="mam" value={pending.length} label={t('userPendingApproval')} />
          <StatTile tone="indeterminate" value={suspended.length} label={t('userSuspended')} />
        </div>

        {/* ── Approval queue ────────────────────────────────────────────────
            Above the directory: an account waiting on approval is a person
            who cannot do their job today. The full list is reference; this is
            the work. */}
        <section>
          <SectionHeader title={t('userApprovalQueue')} description={t('userApprovalHint')} />
          {pending.length === 0 ? (
            <Card>
              <EmptyState
                icon={Check}
                title={t('userNoPending')}
                description={t('userNoPendingBody')}
              />
            </Card>
          ) : (
            <ul className="space-y-3">
              {pending.map((u) => (
                <Card as="li" key={u.id} className="flex flex-wrap items-center justify-between gap-4">
                  <div className="min-w-0">
                    <p className="font-semibold">{u.name}</p>
                    <p className="text-sm text-on-surface-variant">
                      {t('userRequesting')} <span className="font-medium">{t(ROLE_LABEL_KEY[u.role])}</span>
                      {' · '}
                      {u.scope}
                    </p>
                    <p className="mt-1 inline-flex items-center gap-1.5 text-xs text-on-surface-variant">
                      {u.signInMethod === 'email_otp' ? (
                        <Mail size={12} aria-hidden="true" />
                      ) : (
                        <Phone size={12} aria-hidden="true" />
                      )}
                      {t(METHOD_LABEL[u.signInMethod])}
                    </p>
                  </div>
                  <div className="flex gap-2">
                    <Button
                      variant="primary"
                      size="sm"
                      onClick={() => setDecided((d) => ({ ...d, [u.id]: 'approved' }))}
                    >
                      <Check size={15} aria-hidden="true" />
                      {t('userApprove')}
                    </Button>
                    <Button
                      variant="secondary"
                      size="sm"
                      onClick={() => setDecided((d) => ({ ...d, [u.id]: 'rejected' }))}
                    >
                      <X size={15} aria-hidden="true" />
                      {t('userReject')}
                    </Button>
                  </div>
                </Card>
              ))}
            </ul>
          )}
        </section>

        {/* ── Directory ─────────────────────────────────────────────────── */}
        <section>
          <Card flush>
            <CardHeader title={t('userDirectory')} />
            <DataTable
              data={mockUsers}
              columns={columns}
              getRowKey={(u) => u.id}
              caption={t('userDirectory')}
              empty={<EmptyState icon={Users} title={t('userNoAccounts')} />}
            />
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
