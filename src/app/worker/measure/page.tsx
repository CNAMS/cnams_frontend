'use client';

import React, { useEffect, useState, useCallback } from 'react';
import dynamic from 'next/dynamic';
import {
  ArrowLeft,
  ArrowRight,
  Check,
  Ruler,
  RotateCcw,
  Scale,
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
import type { DecodedBlePacket } from '@/lib/bleCodec';

/**
 * BleScaleCard is loaded only on the client (ssr: false) so it never
 * runs on the server. This eliminates the React hydration mismatch
 * (NotFoundError: insertBefore) caused by navigator.bluetooth being
 * undefined on the server while the client changes connection state
 * during the first useEffect.
 */
const BleScaleCard = dynamic(
  () => import('@/components/ble/BleScaleCard').then((m) => m.BleScaleCard),
  {
    ssr: false,
    loading: () => (
      <div className="rounded-2xl border border-outline-variant bg-surface-container p-6 text-sm text-on-surface-variant animate-pulse">
        Loading Bluetooth scale...
      </div>
    ),
  }
);

/**
 * The capture flow: child → weight/length → MUAC + oedema → result.
 *
 * Receives live Bluetooth GATT notifications from the ESP32-S3 microcontroller
 * (Service: 4fafc201-1fb5-459e-8fcc-c5c9c331914b, Char: beb5483e-36e1-4688-b7f5-ea07361b26a8)
 * and automatically locks in weight and length when the ESP32 signals stability.
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

  // Direct lock handlers from ESP32-S3
  const handleWeightLock = useCallback(
    (val: string) => {
      if (autoFillEnabled) {
        setWeightKg(val);
      }
    },
    [autoFillEnabled]
  );

  const handleLengthLock = useCallback(
    (val: string) => {
      if (autoFillEnabled) {
        setHeightCm(val);
      }
    },
    [autoFillEnabled]
  );

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
            <SectionHeader title={t('measurePickChild')} />
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

            {/* ── BLE Scale Card (client-only, no SSR) ───────────────── */}
            <BleScaleCard
              ageMonths={child?.ageMonths}
              onWeightLock={handleWeightLock}
              onLengthLock={handleLengthLock}
            />

            {/* ── Form Inputs (Auto-Filled from ESP32 or Manual Entry) ───── */}
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
                hint={weightKg ? '✓ Locked in from scale' : undefined}
              />

              <Field
                id="height"
                label={child && child.ageMonths < 24 ? t('measureLength') : t('measureHeight')}
                unit="cm"
                icon={Ruler}
                value={heightCm}
                onChange={setHeightCm}
                hint={
                  heightCm
                    ? '✓ Locked in from scale'
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
