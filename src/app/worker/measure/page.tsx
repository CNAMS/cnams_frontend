'use client';

import React, { useEffect, useState } from 'react';
import {
  ArrowLeft,
  ArrowRight,
  BluetoothOff,
  Check,
  Ruler,
  RotateCcw,
  Scale,
} from 'lucide-react';
import { mockRoster, type RosterChild } from '@/data/rosterData';
import type { GrowthClass } from '@/theme/classification';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import type { TranslationKey } from '@/data/translations';
import { AppShell } from '@/components/nav/AppShell';
import { Card, SectionHeader } from '@/components/ui/Card';
import { ClassificationBadge } from '@/components/ui/ClassificationBadge';
import { Button, ButtonLink } from '@/components/ui/Button';
import { SampleDataChip } from '@/components/ui/Feedback';
import { cn } from '@/lib/cn';

/**
 * The capture flow: child → weight/length → MUAC + oedema → result.
 *
 * IMPORTANT — this does NOT compute z-scores.
 *
 * The engine lives on the device in pure Dart, and Gate G2 is still open: the
 * official WHO tables ship empty in assets/who_reference/tables.json, so the
 * engine currently reports `indeterminate` for everything, with the single
 * exception that oedema forces SAM under the WHO rule. This screen reproduces
 * exactly that documented behaviour rather than inventing a classification in
 * the browser.
 *
 * Guessing a z-score here would be actively dangerous: a worker could act on a
 * number the clinical reviewer has never signed off. Indeterminate is an
 * honest, meaningful result — it is why the palette has a grey band at all.
 */

type Step = 'child' | 'weight' | 'muac' | 'result';

const STEPS: Step[] = ['child', 'weight', 'muac', 'result'];

/**
 * Explicit map rather than a `measureStep_${step}` template key. A template
 * literal defeats the TranslationKey union — the whole point of which is that
 * a missing string fails the build rather than rendering the key name.
 */
const STEP_LABEL: Record<Step, TranslationKey> = {
  child: 'measureStep_child',
  weight: 'measureStep_weight',
  muac: 'measureStep_muac',
  result: 'measureStep_result',
};

/**
 * Mirrors the device engine's fail-safe path while the reference tables are
 * empty. Oedema forces SAM; everything else is indeterminate.
 */
function classify(oedema: boolean): GrowthClass {
  return oedema ? 'sam' : 'indeterminate';
}

export default function MeasurePage() {
  const { t } = useLanguage();
  const { role, setRole } = useTheme();

  const [step, setStep] = useState<Step>('child');
  const [child, setChild] = useState<RosterChild | null>(null);
  const [weightKg, setWeightKg] = useState('');
  const [heightCm, setHeightCm] = useState('');
  const [muacMm, setMuacMm] = useState('');
  const [oedema, setOedema] = useState(false);

  useEffect(() => {
    if (role !== 'aww') setRole('aww');
  }, [role, setRole]);

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
      breadcrumbs={[{ labelKey: 'navHome', href: '/worker' }, { labelKey: 'navMeasure' }]} title={t('navMeasure')} subtitle={t('measureSubtitle')} actions={<SampleDataChip />}>
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
            <Card className="flex items-start gap-3 border-outline">
              <BluetoothOff size={18} className="shrink-0 mt-0.5 text-on-surface-variant" aria-hidden="true" />
              <p className="text-sm text-on-surface-variant leading-relaxed">
                {t('measureManualFallback')}
              </p>
            </Card>
            <Card className="space-y-4">
              <Field
                id="weight"
                label={t('measureWeight')}
                unit="kg"
                icon={Scale}
                value={weightKg}
                onChange={setWeightKg}
              />
              <Field
                id="height"
                label={child && child.ageMonths < 24 ? t('measureLength') : t('measureHeight')}
                unit="cm"
                icon={Ruler}
                value={heightCm}
                onChange={setHeightCm}
                // The 24-month boundary switches recumbent length to standing
                // height with a position correction — the worker must know
                // which one they are being asked for.
                hint={
                  child
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

            {/* CON-5: the referral prompt is advice the worker acts on, never
                an instruction the app issues. */}
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
      {hint && <p className="text-xs text-on-surface-variant">{hint}</p>}
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
