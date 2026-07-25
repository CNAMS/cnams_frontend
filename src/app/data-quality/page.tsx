'use client';

import React, { useEffect } from 'react';
import { AlertCircle, CheckCircle2, Cpu, RefreshCw, WifiOff } from 'lucide-react';
import { mockCentres, mockDataQualityRecords, type CentreData } from '@/data/mockData';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { AppShell } from '@/components/nav/AppShell';
import { Card, CardHeader, SectionHeader } from '@/components/ui/Card';
import { StatTile } from '@/components/ui/StatTile';
import { DataTable, type Column } from '@/components/ui/DataTable';
import { EmptyState, SampleDataChip } from '@/components/ui/Feedback';
import { Button } from '@/components/ui/Button';

const STALE_DAYS = 7;

/**
 * Diagnostics: engine mismatches, implausible values and devices that have
 * stopped syncing.
 *
 * This surface was previously unreachable — nothing in the UI linked to it.
 * It is now the supervisor's fourth nav destination.
 */
export default function DataQualityPage() {
  const { t } = useLanguage();
  const { role, setRole } = useTheme();

  useEffect(() => {
    if (role !== 'supervisor') setRole('supervisor');
  }, [role, setRole]);

  const staleCutoff = Date.now() - STALE_DAYS * 24 * 60 * 60 * 1000;
  const staleDevices = mockCentres.filter(
    (c) => new Date(c.lastSync).getTime() < staleCutoff,
  );

  const mismatches = mockDataQualityRecords.filter((r) => r.type === 'engine_mismatch');
  const implausible = mockDataQualityRecords.filter((r) => r.type === 'implausible_value');

  const deviceColumns: Column<CentreData>[] = [
    { key: 'name', header: t('centre'), primary: true, cell: (d) => d.name },
    {
      key: 'serial',
      header: t('serialNo'),
      cell: (d) => (
        <code className="text-xs bg-surface-variant px-2 py-0.5 rounded border border-outline-variant">
          {d.serialNumber}
        </code>
      ),
    },
    {
      key: 'firmware',
      header: t('firmware'),
      cell: (d) => <span className="text-on-surface-variant">{d.firmwareVersion}</span>,
    },
    {
      key: 'battery',
      header: t('battery'),
      align: 'right',
      cell: (d) => (
        <span className="tabular-nums font-semibold">
          {d.batteryPercentage}%
          {d.batteryPercentage === 0 && (
            <span className="ml-1.5 text-xs font-medium text-class-sam">{t('batteryDead')}</span>
          )}
        </span>
      ),
    },
    {
      key: 'lastSync',
      header: t('lastSynced'),
      align: 'right',
      cell: (d) => {
        const days = Math.floor((Date.now() - new Date(d.lastSync).getTime()) / 86400000);
        return (
          <span className="tabular-nums">
            {days} {t('daysAgo')}
          </span>
        );
      },
    },
  ];

  return (
    <AppShell
      title={t('dataQualityTitle')}
      subtitle={t('dataQualitySubtitle')}
      actions={<SampleDataChip />}
    >
      <div className="space-y-8">
        <section>
          <div className="grid gap-3 grid-cols-1 sm:grid-cols-3">
            <StatTile
              icon={Cpu}
              tone="indeterminate"
              value={mismatches.length}
              label={t('engineMismatches')}
            />
            <StatTile
              icon={AlertCircle}
              tone="mam"
              value={implausible.length}
              label={t('implausibleValues')}
            />
            <StatTile
              icon={WifiOff}
              tone="sam"
              value={staleDevices.length}
              label={t('staleDevices7d')}
            />
          </div>
        </section>

        {/* ── Diagnostics log ───────────────────────────────────────────── */}
        <section>
          <SectionHeader title={t('diagnosticsLog')} description={t('diagnosticsLogHint')} />
          {mockDataQualityRecords.length === 0 ? (
            <Card>
              <EmptyState
                icon={CheckCircle2}
                title={t('noDataRecords')}
                description={t('noDataRecordsBody')}
              />
            </Card>
          ) : (
            <ul className="space-y-3">
              {mockDataQualityRecords.map((record) => (
                <Card as="li" key={record.id} className="space-y-3">
                  <div className="flex flex-wrap items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 rounded-full bg-surface-variant border border-outline-variant px-2.5 py-1 text-xs font-semibold">
                      {record.type === 'engine_mismatch' ? (
                        <Cpu size={13} aria-hidden="true" />
                      ) : (
                        <AlertCircle size={13} aria-hidden="true" />
                      )}
                      {record.type === 'engine_mismatch'
                        ? t('engineMismatches')
                        : t('implausibleValues')}
                    </span>
                    <time
                      dateTime={record.timestamp}
                      className="text-xs text-on-surface-variant"
                    >
                      {new Date(record.timestamp).toLocaleString()}
                    </time>
                  </div>

                  <p className="text-sm">
                    <span className="text-on-surface-variant">{t('centre')}: </span>
                    <span className="font-semibold">{record.centreName}</span>
                    <span className="text-on-surface-variant"> · {t('icdsId')}: </span>
                    <code className="text-xs bg-surface-variant px-1.5 py-0.5 rounded">
                      {record.childIcdsId}
                    </code>
                  </p>

                  <p className="text-sm text-on-surface-variant bg-surface-variant rounded-xl p-3 leading-relaxed">
                    {record.details}
                  </p>

                  <Button variant="secondary" size="sm">
                    <RefreshCw size={15} aria-hidden="true" />
                    {t('reevaluate')}
                  </Button>
                </Card>
              ))}
            </ul>
          )}
        </section>

        {/* ── Stale devices ─────────────────────────────────────────────── */}
        <section>
          <Card flush>
            <CardHeader title={t('staleDevicesTitle')} />
            <DataTable
              data={staleDevices}
              columns={deviceColumns}
              getRowKey={(d) => d.id}
              caption={t('staleDevicesTitle')}
              empty={
                <EmptyState
                  icon={CheckCircle2}
                  title={t('noStaleDetected')}
                  description={t('noStaleDetectedBody')}
                />
              }
            />
          </Card>
        </section>
      </div>
    </AppShell>
  );
}
