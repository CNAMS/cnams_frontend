'use client';

import React, { useEffect, useState, useCallback } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  Bluetooth,
  BluetoothConnected,
  BluetoothOff,
  Check,
  Lock,
  Radio,
  RefreshCw,
  Ruler,
  RotateCcw,
  Scale,
  Sparkles,
  Unlock,
  AlertCircle,
} from 'lucide-react';
import { mockRoster, type RosterChild } from '@/data/rosterData';
import type { GrowthClass } from '@/theme/classification';
import { useTheme } from '@/context/ThemeContext';
import { AppShell } from '@/components/nav/AppShell';
import { Card, SectionHeader } from '@/components/ui/Card';
import { ClassificationBadge } from '@/components/ui/ClassificationBadge';
import { Button, ButtonLink } from '@/components/ui/Button';
import { SampleDataChip } from '@/components/ui/Feedback';
import { cn } from '@/lib/cn';
import { useTranslations } from 'next-intl';
import { useBleDevice } from '@/lib/useBleDevice';
import type { DecodedBlePacket } from '@/lib/bleCodec';

/**
 * The capture flow: child → weight/length → MUAC + oedema → result.
 *
 * Supports automatic Web Bluetooth data streaming and stabilization locking
 * from the ESP32-S3 hardware scale (GATT service 4fafc201-1fb5-459e-8fcc-c5c9c331914b).
 */

type Step = 'child' | 'weight' | 'muac' | 'result';

const STEPS: Step[] = ['child', 'weight', 'muac', 'result'];

const STEP_LABEL: Record<Step, string> = {
  child: 'measureStep_child',
  weight: 'measureStep_weight',
  muac: 'measureStep_muac',
  result: 'measureStep_result',
};

function classify(oedema: boolean): GrowthClass {
  return oedema ? 'sam' : 'indeterminate';
}

export default function MeasurePage() {
  const t = useTranslations();
  const { role, setRole } = useTheme();

  const [step, setStep] = useState<Step>('child');
  const [child, setChild] = useState<RosterChild | null>(null);
  const [weightKg, setWeightKg] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [muacMm, setMuacMm] = useState('');
  const [oedema, setOedema] = useState(false);
  const [autoFillEnabled, setAutoFillEnabled] = useState(true);

  useEffect(() => {
    if (role !== 'aww') setRole('aww');
  }, [role, setRole]);

  // Handle incoming live packet from the BLE scale
  const handleBlePacket = useCallback(
    (packet: DecodedBlePacket) => {
      if (!autoFillEnabled) return;

      if (packet.channel === 'weight' && packet.stable) {
        setWeightKg(packet.valueFormatted);
      } else if (packet.channel === 'length' && packet.stable) {
        setHeightCm(packet.valueFormatted);
      }
    },
    [autoFillEnabled]
  );

  const {
    isSupported: isBleSupported,
    connectionState: bleState,
    deviceName: bleDeviceName,
    errorMessage: bleError,
    weight: bleWeight,
    length: bleLength,
    isSimulated: bleIsSimulated,
    connect: connectBle,
    disconnect: disconnectBle,
    startSimulation: startBleSimulation,
    stopSimulation: stopBleSimulation,
  } = useBleDevice(handleBlePacket);

  // Only children with recorded consent may be measured.
  const eligible = mockRoster.filter((c) => c.centreId === 'c1' && c.consent === 'given');

  const stepIndex = STEPS.indexOf(step);
  const canAdvance =
    (step === 'child' && child !== null) ||
    (step === 'weight' && weightKg !== '' && heightCm !== '') ||
    step === 'muac';

  const reset = () => {
    setStep('child');
    setChild(null);
    setWeightKg('');
    setHeightCm('');
    setMuacMm('');
    setOedema(false);
  };

  return (
    <AppShell
      breadcrumbs={[{ labelKey: 'navHome', href: '/worker' }, { labelKey: 'navMeasure' }]}
      title={t('navMeasure')}
      subtitle={t('measureSubtitle')}
      actions={<SampleDataChip />}
    >
      <div className="max-w-2xl space-y-6">
        {/* ── Progress ──────────────────────────────────────────────────── */}
        <ol className="flex items-center gap-2" aria-label={t('measureProgress')}>
          {STEPS.map((s, i) => {
            const done = i < stepIndex;
            const current = i === stepIndex;
            return (
              <li key={s} className="flex-1 flex items-center gap-2">
                <div
                  aria-current={current ? 'step' : undefined}
                  className={cn(
                    'flex-1 h-1.5 rounded-full transition-colors duration-base ease-ankur',
                    done || current ? 'bg-brand' : 'bg-surface-variant',
                  )}
                />
              </li>
            );
          })}
        </ol>
        <p className="text-sm text-on-surface-variant -mt-4">
          {t('measureStep')} {stepIndex + 1}/{STEPS.length} · {t(STEP_LABEL[step])}
        </p>

        {/* ── Step: choose child ────────────────────────────────────────── */}
        {step === 'child' && (
          <section>
            <SectionHeader title={t('measurePickChild')} description={t('measurePickChildHint')} />
            <ul className="space-y-2">
              {eligible.map((c) => (
                <li key={c.id}>
                  <button
                    type="button"
                    onClick={() => setChild(c)}
                    aria-pressed={child?.id === c.id}
                    className={cn(
                      'w-full flex items-center justify-between gap-3 text-left',
                      'min-h-touch px-4 py-3 rounded-xl border-2 bg-surface-container',
                      'transition-colors duration-fast ease-ankur',
                      child?.id === c.id
                        ? 'border-brand bg-primary-container'
                        : 'border-outline-variant hover:bg-surface-variant',
                    )}
                  >
                    <span className="min-w-0">
                      <span className="font-semibold">{c.initials}</span>
                      <span className="ml-2 text-xs text-on-surface-variant">{c.icdsId}</span>
                      <span className="block text-sm text-on-surface-variant">
                        <span className="tabular-nums">{c.ageMonths}</span> {t('months')}
                      </span>
                    </span>
                    {child?.id === c.id && <Check size={18} className="text-brand shrink-0" aria-hidden="true" />}
                  </button>
                </li>
              ))}
            </ul>
          </section>
        )}

        {/* ── Step: weight & length ─────────────────────────────────────── */}
        {step === 'weight' && (
          <section className="space-y-4">
            <SectionHeader title={t('measureWeightLength')} />

            {/* ── Smart BLE Hardware Scale Card ─────────────────────────── */}
            <Card className="border-2 border-brand/20 bg-surface-container/60 shadow-sm space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-outline-variant pb-3">
                <div className="flex items-center gap-2.5">
                  <div
                    className={cn(
                      'w-9 h-9 rounded-lg flex items-center justify-center transition-colors',
                      bleState === 'connected'
                        ? 'bg-emerald-500/15 text-emerald-600 dark:text-emerald-400'
                        : bleState === 'scanning' || bleState === 'connecting'
                        ? 'bg-amber-500/15 text-amber-600 dark:text-amber-400 animate-pulse'
                        : 'bg-surface-variant text-on-surface-variant'
                    )}
                  >
                    {bleState === 'connected' ? (
                      <BluetoothConnected size={20} />
                    ) : bleState === 'scanning' || bleState === 'connecting' ? (
                      <Radio size={20} className="animate-spin" />
                    ) : (
                      <Bluetooth size={20} />
                    )}
                  </div>
                  <div>
                    <h3 className="font-semibold text-sm flex items-center gap-2">
                      <span>ESP32-S3 Wireless Scale</span>
                      {bleState === 'connected' && (
                        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-xs font-medium bg-emerald-100 dark:bg-emerald-950/60 text-emerald-800 dark:text-emerald-300">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                          {bleDeviceName || 'Connected'}
                        </span>
                      )}
                    </h3>
                    <p className="text-xs text-on-surface-variant">
                      {bleState === 'connected'
                        ? bleIsSimulated
                          ? 'Streaming simulated sensor data (GATT Demo)'
                          : 'Live streaming BLE GATT frames (11-byte CRC16)'
                        : bleState === 'connecting'
                        ? 'Connecting to hardware device...'
                        : bleState === 'scanning'
                        ? 'Scanning for CGMS Bluetooth devices...'
                        : 'Connect wireless scale for automated measurement lock-in'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  {bleState === 'connected' ? (
                    <Button
                      variant="ghost"
                      onClick={bleIsSimulated ? stopBleSimulation : disconnectBle}
                      className="text-xs h-8 px-2.5 text-error hover:bg-error-container"
                    >
                      <BluetoothOff size={14} className="mr-1" />
                      Disconnect
                    </Button>
                  ) : (
                    <div className="flex items-center gap-1.5">
                      {isBleSupported ? (
                        <Button
                          variant="primary"
                          onClick={connectBle}
                          disabled={bleState === 'connecting' || bleState === 'scanning'}
                          className="text-xs h-8 px-3"
                        >
                          <Bluetooth size={14} className="mr-1.5" />
                          Connect Scale
                        </Button>
                      ) : (
                        <Button
                          variant="secondary"
                          onClick={startBleSimulation}
                          className="text-xs h-8 px-3"
                        >
                          <Sparkles size={14} className="mr-1.5 text-brand" />
                          Simulate Scale
                        </Button>
                      )}

                      {/* Demo simulation mode toggle for testing */}
                      {isBleSupported && (
                        <Button
                          variant="ghost"
                          onClick={startBleSimulation}
                          title="Simulate hardware stream in browser"
                          className="text-xs h-8 px-2 text-on-surface-variant hover:text-brand"
                        >
                          <Sparkles size={14} className="mr-1" />
                          Demo Mode
                        </Button>
                      )}
                    </div>
                  )}
                </div>
              </div>

              {bleError && (
                <div className="flex items-center gap-2 p-2.5 rounded-lg bg-error-container text-on-error-container text-xs">
                  <AlertCircle size={15} className="shrink-0" />
                  <span>{bleError}</span>
                </div>
              )}

              {/* ── Live Streaming Gauges ──────────────────────────────── */}
              {bleState === 'connected' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
                  {/* Weight Stream Gauge */}
                  <div
                    className={cn(
                      'p-3.5 rounded-xl border-2 transition-all duration-base',
                      bleWeight?.stable
                        ? 'bg-emerald-500/10 border-emerald-500/40'
                        : 'bg-surface border-outline-variant'
                    )}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-on-surface-variant flex items-center gap-1.5">
                        <Scale size={14} />
                        Weight Stream
                      </span>
                      {bleWeight ? (
                        <span
                          className={cn(
                            'inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full',
                            bleWeight.stable
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                              : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                          )}
                        >
                          {bleWeight.stable ? (
                            <>
                              <Lock size={10} /> Locked
                            </>
                          ) : (
                            <>
                              <Unlock size={10} className="animate-pulse" /> Stabilizing...
                            </>
                          )}
                        </span>
                      ) : (
                        <span className="text-xs text-on-surface-variant">Waiting...</span>
                      )}
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold tabular-nums tracking-tight">
                        {bleWeight ? bleWeight.value : '—'}
                      </span>
                      <span className="text-sm font-medium text-on-surface-variant">kg</span>
                    </div>
                  </div>

                  {/* Length Stream Gauge */}
                  <div
                    className={cn(
                      'p-3.5 rounded-xl border-2 transition-all duration-base',
                      bleLength?.stable
                        ? 'bg-emerald-500/10 border-emerald-500/40'
                        : 'bg-surface border-outline-variant'
                    )}
                  >
                    <div className="flex items-center justify-between mb-1.5">
                      <span className="text-xs font-semibold text-on-surface-variant flex items-center gap-1.5">
                        <Ruler size={14} />
                        {child && child.ageMonths < 24 ? 'Length Stream' : 'Height Stream'}
                      </span>
                      {bleLength ? (
                        <span
                          className={cn(
                            'inline-flex items-center gap-1 text-[11px] font-semibold px-2 py-0.5 rounded-full',
                            bleLength.stable
                              ? 'bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300'
                              : 'bg-amber-100 dark:bg-amber-950 text-amber-800 dark:text-amber-300'
                          )}
                        >
                          {bleLength.stable ? (
                            <>
                              <Lock size={10} /> Locked
                            </>
                          ) : (
                            <>
                              <Unlock size={10} className="animate-pulse" /> Stabilizing...
                            </>
                          )}
                        </span>
                      ) : (
                        <span className="text-xs text-on-surface-variant">Waiting...</span>
                      )}
                    </div>
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold tabular-nums tracking-tight">
                        {bleLength ? bleLength.value : '—'}
                      </span>
                      <span className="text-sm font-medium text-on-surface-variant">cm</span>
                    </div>
                  </div>
                </div>
              )}
            </Card>

            {/* ── Form Inputs (Auto-Filled or Manual Entry) ──────────────── */}
            <Card className="space-y-4">
              <div className="flex items-center justify-between border-b border-outline-variant pb-2">
                <span className="text-xs font-semibold text-on-surface-variant uppercase tracking-wider">
                  Recorded Values
                </span>
                <label className="flex items-center gap-2 text-xs text-on-surface-variant cursor-pointer">
                  <input
                    type="checkbox"
                    checked={autoFillEnabled}
                    onChange={(e) => setAutoFillEnabled(e.target.checked)}
                    className="rounded accent-brand"
                  />
                  <span>Auto-fill on stable lock</span>
                </label>
              </div>

              <Field
                id="weight"
                label={t('measureWeight')}
                unit="kg"
                icon={Scale}
                value={weightKg}
                onChange={setWeightKg}
                hint={
                  bleWeight?.stable && weightKg === bleWeight.value
                    ? '✓ Locked automatically from Bluetooth scale'
                    : undefined
                }
              />

              <Field
                id="height"
                label={child && child.ageMonths < 24 ? t('measureLength') : t('measureHeight')}
                unit="cm"
                icon={Ruler}
                value={heightCm}
                onChange={setHeightCm}
                hint={
                  bleLength?.stable && heightCm === bleLength.value
                    ? '✓ Locked automatically from Bluetooth scale'
                    : child
                    ? child.ageMonths < 24
                      ? t('measureLengthHint')
                      : t('measureHeightHint')
                    : undefined
                }
              />
            </Card>
          </section>
        )}

        {/* ── Step: MUAC & oedema ───────────────────────────────────────── */}
        {step === 'muac' && (
          <section className="space-y-4">
            <SectionHeader title={t('measureMuacOedema')} />
            <Card className="space-y-4">
              <Field id="muac" label={t('muac')} unit="mm" icon={Ruler} value={muacMm} onChange={setMuacMm} />
              <label
                className={cn(
                  'flex items-start gap-3 min-h-touch p-3 rounded-xl border-2 cursor-pointer',
                  'transition-colors duration-fast ease-ankur',
                  oedema ? 'border-class-sam bg-sam-container' : 'border-outline-variant hover:bg-surface-variant',
                )}
              >
                <input
                  type="checkbox"
                  checked={oedema}
                  onChange={(e) => setOedema(e.target.checked)}
                  className="mt-1 w-5 h-5 accent-[var(--class-sam)]"
                />
                <span>
                  <span className="font-semibold block">{t('measureOedema')}</span>
                  <span className="text-sm text-on-surface-variant">{t('measureOedemaHint')}</span>
                </span>
              </label>
            </Card>
          </section>
        )}

        {/* ── Step: result ──────────────────────────────────────────────── */}
        {step === 'result' && child && (
          <section className="space-y-4">
            <Card elevation="raised" className="text-center space-y-4 py-8">
              <p className="text-sm text-on-surface-variant">
                {child.initials} · {child.icdsId}
              </p>
              <div className="flex justify-center">
                <ClassificationBadge growthClass={classify(oedema)} size="md" />
              </div>
              <p className="text-on-surface-variant max-w-md mx-auto leading-relaxed">
                {oedema ? t('resultOedemaSam') : t('resultIndeterminate')}
              </p>
            </Card>

            {/* Referral prompt */}
            {oedema && (
              <Card className="border-class-sam/40">
                <p className="font-medium text-class-sam">{t('resultReferralAdvice')}</p>
              </Card>
            )}

            <Card>
              <h3 className="font-semibold mb-3">{t('resultRecorded')}</h3>
              <dl className="grid grid-cols-2 gap-3 text-sm">
                <Reading label={t('measureWeight')} value={weightKg ? `${weightKg} kg` : '—'} />
                <Reading
                  label={child.ageMonths < 24 ? t('measureLength') : t('measureHeight')}
                  value={heightCm ? `${heightCm} cm` : '—'}
                />
                <Reading label={t('muac')} value={muacMm ? `${muacMm} mm` : '—'} />
                <Reading label={t('measureOedema')} value={oedema ? t('yes') : t('no')} />
              </dl>
            </Card>

            <div className="flex flex-wrap gap-3">
              <Button variant="primary" onClick={reset}>
                <RotateCcw size={16} aria-hidden="true" />
                {t('measureNextChild')}
              </Button>
              <ButtonLink href="/worker" variant="secondary">
                {t('backToHome')}
              </ButtonLink>
            </div>
          </section>
        )}

        {/* ── Navigation ────────────────────────────────────────────────── */}
        {step !== 'result' && (
          <div className="flex items-center justify-between gap-3 pt-2">
            <Button
              variant="ghost"
              onClick={() => setStep(STEPS[Math.max(stepIndex - 1, 0)])}
              disabled={stepIndex === 0}
            >
              <ArrowLeft size={16} aria-hidden="true" />
              {t('measureBack')}
            </Button>
            <Button
              variant="primary"
              onClick={() => setStep(STEPS[stepIndex + 1])}
              disabled={!canAdvance}
            >
              {t('measureNext')}
              <ArrowRight size={16} aria-hidden="true" />
            </Button>
          </div>
        )}
      </div>
    </AppShell>
  );
}

function Field({
  id,
  label,
  unit,
  icon: Icon,
  value,
  onChange,
  hint,
}: {
  id: string;
  label: string;
  unit: string;
  icon: React.ElementType;
  value: string;
  onChange: (v: string) => void;
  hint?: string;
}) {
  return (
    <div className="space-y-1.5">
      <label htmlFor={id} className="flex items-center gap-2 text-sm font-semibold">
        <Icon size={15} aria-hidden="true" />
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="number"
          inputMode="decimal"
          step="0.1"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className={cn(
            'w-full min-h-touch pl-4 pr-14 rounded-xl bg-surface tabular-nums',
            'border-2 border-outline focus:border-brand',
            'transition-colors duration-fast ease-ankur',
          )}
        />
        <span
          aria-hidden="true"
          className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-on-surface-variant"
        >
          {unit}
        </span>
      </div>
      {hint && (
        <p
          className={cn(
            'text-xs',
            hint.startsWith('✓')
              ? 'text-emerald-600 dark:text-emerald-400 font-medium'
              : 'text-on-surface-variant'
          )}
        >
          {hint}
        </p>
      )}
    </div>
  );
}

function Reading({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <dt className="text-xs text-on-surface-variant">{label}</dt>
      <dd className="font-semibold tabular-nums">{value}</dd>
    </div>
  );
}
