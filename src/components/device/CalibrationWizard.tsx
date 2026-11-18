'use client';

import { useTranslations } from 'next-intl';
import React, { useState } from 'react';
import {
  Scale,
  Ruler,
  CheckCircle2,
  AlertCircle,
  RotateCcw,
  Sparkles,
  ShieldCheck,
} from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/cn';
import { useBleDevice } from '@/lib/useBleDevice';

interface CalibrationWizardProps {
  ble: ReturnType<typeof useBleDevice>;
}

type Status = { text: string; ok: boolean } | null;

export function CalibrationWizard({ ble }: CalibrationWizardProps) {
  const t = useTranslations();
  const [activeTab, setActiveTab] = useState<'weight' | 'length'>('weight');

  // Weight Calibration state
  const [weightStep, setWeightStep] = useState<1 | 2 | 3>(1);
  const [refWeightKg, setRefWeightKg] = useState<string>('5.00');
  const [weightCalStatus, setWeightCalStatus] = useState<Status>(null);

  // Length Calibration state
  const [lengthStep, setLengthStep] = useState<1 | 2 | 3>(1);
  const [refLengthCm, setRefLengthCm] = useState<string>('50.0');
  const [lengthCalStatus, setLengthCalStatus] = useState<Status>(null);

  const {
    connectionState,
    weight,
    length,
    tareScale,
    setWeightCalibration,
    setLengthCalibration,
  } = ble;

  const isConnected = connectionState === 'connected';

  // ── Weight Calibration Handlers ──────────────────────────────────────────
  const handleWeightTare = async () => {
    await tareScale();
    setWeightStep(2);
  };

  const handleApplyWeightCal = async () => {
    const kg = parseFloat(refWeightKg);
    if (isNaN(kg) || kg <= 0) return;

    try {
      const refGrams = kg * 1000;
      const currentRaw = weight?.raw || refGrams;
      const factor = currentRaw > 0 ? (currentRaw / refGrams) * 420.0 : 420.0;

      await setWeightCalibration(factor);
      setWeightCalStatus({ text: t('calWeightDone', { kg: kg.toFixed(2) }), ok: true });
      setWeightStep(3);
    } catch (err: unknown) {
      setWeightCalStatus({ text: err instanceof Error ? err.message : t('calFailed'), ok: false });
    }
  };

  const handleRevertWeightCal = async () => {
    try {
      await setWeightCalibration(420.0);
      setWeightCalStatus({ text: t('calWeightReverted'), ok: true });
      setWeightStep(1);
    } catch (err: unknown) {
      setWeightCalStatus({ text: err instanceof Error ? err.message : t('calRevertFailed'), ok: false });
    }
  };

  // ── Length Calibration Handlers ──────────────────────────────────────────
  const handleLengthZero = async () => {
    await tareScale();
    setLengthStep(2);
  };

  const handleApplyLengthCal = async () => {
    const cm = parseFloat(refLengthCm);
    if (isNaN(cm) || cm <= 0) return;

    try {
      const refMm = cm * 10;
      const currentRaw = length?.raw || refMm;
      const factor = currentRaw > 0 ? (refMm / currentRaw) * 0.5 : 0.5;

      await setLengthCalibration(factor);
      setLengthCalStatus({ text: t('calLengthDone', { cm: cm.toFixed(1) }), ok: true });
      setLengthStep(3);
    } catch (err: unknown) {
      setLengthCalStatus({ text: err instanceof Error ? err.message : t('calFailed'), ok: false });
    }
  };

  const handleRevertLengthCal = async () => {
    try {
      await setLengthCalibration(0.5);
      setLengthCalStatus({ text: t('calLengthReverted'), ok: true });
      setLengthStep(1);
    } catch (err: unknown) {
      setLengthCalStatus({ text: err instanceof Error ? err.message : t('calRevertFailed'), ok: false });
    }
  };

  return (
    <Card flush>
      {/* Tab Switcher */}
      <div className="flex border-b border-border/60 bg-muted/30">
        <button
          onClick={() => setActiveTab('weight')}
          className={cn(
            'flex flex-1 items-center justify-center gap-2 border-b-2 py-3.5 text-sm font-semibold transition-colors',
            activeTab === 'weight'
              ? 'border-primary bg-background text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          )}
        >
          <Scale className="h-4 w-4" />
          {t('calTabWeight')}
        </button>
        <button
          onClick={() => setActiveTab('length')}
          className={cn(
            'flex flex-1 items-center justify-center gap-2 border-b-2 py-3.5 text-sm font-semibold transition-colors',
            activeTab === 'length'
              ? 'border-primary bg-background text-primary'
              : 'border-transparent text-muted-foreground hover:text-foreground'
          )}
        >
          <Ruler className="h-4 w-4" />
          {t('calTabLength')}
        </button>
      </div>

      <div className="p-6">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="h-10 w-10 text-warning/80" />
            <p className="mt-3 text-sm font-medium text-foreground">
              {t('calConnectFirst')}
            </p>
          </div>
        ) : activeTab === 'weight' ? (
          /* ── WEIGHT CALIBRATION WIZARD ── */
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-control border border-border/60 bg-muted/20 p-4">
              <div>
                <span className="text-xs font-semibold text-muted-foreground">
                  {t('calLiveReading')}
                </span>
                <div className="mt-1 text-3xl font-semibold text-foreground">
                  {weight ? `${weight.value} kg` : '0.00 kg'}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
                    weight?.stable
                      ? 'bg-success/10 text-success'
                      : 'bg-warning/10 text-warning'
                  )}
                >
                  <span className={cn('h-1.5 w-1.5 rounded-full', weight?.stable ? 'bg-success' : 'bg-warning animate-pulse')} />
                  {weight?.stable ? t('calStable') : t('calLive')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div
                className={cn(
                  'rounded-control border p-4 transition-all',
                  weightStep === 1
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border/60 bg-card opacity-80'
                )}
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <span>{t('calStep', { n: 1 })}</span>
                  {weightStep > 1 && <CheckCircle2 className="h-4 w-4 text-success" />}
                </div>
                <h4 className="mt-1 font-semibold text-foreground">{t('calWeightZeroTitle')}</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t('calWeightZeroHint')}
                </p>
                {weightStep === 1 && (
                  <Button size="sm" onClick={handleWeightTare} className="mt-4 w-full">
                    <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                    {t('calWeightZeroBtn')}
                  </Button>
                )}
              </div>

              <div
                className={cn(
                  'rounded-control border p-4 transition-all',
                  weightStep === 2
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border/60 bg-card opacity-80'
                )}
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <span>{t('calStep', { n: 2 })}</span>
                  {weightStep > 2 && <CheckCircle2 className="h-4 w-4 text-success" />}
                </div>
                <h4 className="mt-1 font-semibold text-foreground">{t('calWeightRefTitle')}</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t('calWeightRefHint')}
                </p>
                {weightStep === 2 && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.01"
                        value={refWeightKg}
                        onChange={(e) => setRefWeightKg(e.target.value)}
                        className="w-full rounded-control border border-outline/40 bg-surface-variant px-3 py-2 text-sm font-semibold text-on-surface focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 shadow-inner"
                        placeholder="5.00"
                      />
                      <span className="text-xs font-semibold text-on-surface-variant">kg</span>
                    </div>
                    <Button size="sm" onClick={handleApplyWeightCal} className="w-full bg-brand hover:bg-brand-dark text-on-primary shadow-sm">
                      <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                      {t('calSaveFactor')}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setWeightStep(1)} className="w-full text-xs text-muted-foreground hover:text-foreground">
                      ← {t('calBackToStep1')}
                    </Button>
                  </div>
                )}
              </div>

              <div
                className={cn(
                  'rounded-control border p-4 transition-all',
                  weightStep === 3
                    ? 'border-success bg-success/5 shadow-sm'
                    : 'border-border/60 bg-card opacity-80'
                )}
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-success">
                  <span>{t('calStep', { n: 3 })}</span>
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <h4 className="mt-1 font-semibold text-foreground">{t('calLockedTitle')}</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t('calLockedHint')}
                </p>
                {weightStep === 3 && (
                  <div className="mt-4 space-y-2">
                    <Button variant="secondary" size="sm" onClick={() => setWeightStep(1)} className="w-full">
                      {t('calRecalibrate')}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleRevertWeightCal} className="w-full text-xs text-danger hover:bg-danger/10">
                      <RotateCcw className="mr-1.5 h-3 w-3" />
                      {t('calRevert')}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {weightCalStatus && (
              // Failures used to show in the same green as successes.
              <div
                role={weightCalStatus.ok ? 'status' : 'alert'}
                className={cn(
                  'rounded-control p-3 text-xs font-semibold',
                  weightCalStatus.ok ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger',
                )}
              >
                {weightCalStatus.text}
              </div>
            )}
          </div>
        ) : (
          /* ── LENGTH CALIBRATION WIZARD ── */
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-control border border-border/60 bg-muted/20 p-4">
              <div>
                <span className="text-xs font-semibold text-muted-foreground">
                  {t('calLiveLength')}
                </span>
                <div className="mt-1 text-3xl font-semibold text-foreground">
                  {length ? `${length.value} cm` : '0.0 cm'}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-success/10 px-2.5 py-1 text-xs font-medium text-success">
                  <span className="h-1.5 w-1.5 rounded-full bg-success animate-pulse" />
                  {t('calEncoderOnline')}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div
                className={cn(
                  'rounded-control border p-4 transition-all',
                  lengthStep === 1
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border/60 bg-card opacity-80'
                )}
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <span>{t('calStep', { n: 1 })}</span>
                  {lengthStep > 1 && <CheckCircle2 className="h-4 w-4 text-success" />}
                </div>
                <h4 className="mt-1 font-semibold text-foreground">{t('calLengthZeroTitle')}</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t('calLengthZeroHint')}
                </p>
                {lengthStep === 1 && (
                  <Button size="sm" onClick={handleLengthZero} className="mt-4 w-full">
                    <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                    {t('calLengthZeroBtn')}
                  </Button>
                )}
              </div>

              <div
                className={cn(
                  'rounded-control border p-4 transition-all',
                  lengthStep === 2
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border/60 bg-card opacity-80'
                )}
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-primary">
                  <span>{t('calStep', { n: 2 })}</span>
                  {lengthStep > 2 && <CheckCircle2 className="h-4 w-4 text-success" />}
                </div>
                <h4 className="mt-1 font-semibold text-foreground">{t('calLengthRefTitle')}</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t('calLengthRefHint')}
                </p>
                {lengthStep === 2 && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.1"
                        value={refLengthCm}
                        onChange={(e) => setRefLengthCm(e.target.value)}
                        className="w-full rounded-control border border-outline/40 bg-surface-variant px-3 py-2 text-sm font-semibold text-on-surface focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 shadow-inner"
                        placeholder="50.0"
                      />
                      <span className="text-xs font-semibold text-on-surface-variant">cm</span>
                    </div>
                    <Button size="sm" onClick={handleApplyLengthCal} className="w-full bg-brand hover:bg-brand-dark text-on-primary shadow-sm">
                      <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                      {t('calSaveFactor')}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setLengthStep(1)} className="w-full text-xs text-muted-foreground hover:text-foreground">
                      ← {t('calBackToStep1')}
                    </Button>
                  </div>
                )}
              </div>

              <div
                className={cn(
                  'rounded-control border p-4 transition-all',
                  lengthStep === 3
                    ? 'border-success bg-success/5 shadow-sm'
                    : 'border-border/60 bg-card opacity-80'
                )}
              >
                <div className="flex items-center gap-2 text-xs font-semibold text-success">
                  <span>{t('calStep', { n: 3 })}</span>
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <h4 className="mt-1 font-semibold text-foreground">{t('calLockedTitle')}</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  {t('calLockedHint')}
                </p>
                {lengthStep === 3 && (
                  <div className="mt-4 space-y-2">
                    <Button variant="secondary" size="sm" onClick={() => setLengthStep(1)} className="w-full">
                      {t('calRecalibrate')}
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleRevertLengthCal} className="w-full text-xs text-danger hover:bg-danger/10">
                      <RotateCcw className="mr-1.5 h-3 w-3" />
                      {t('calRevert')}
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {lengthCalStatus && (
              // Failures used to show in the same green as successes.
              <div
                role={lengthCalStatus.ok ? 'status' : 'alert'}
                className={cn(
                  'rounded-control p-3 text-xs font-semibold',
                  lengthCalStatus.ok ? 'bg-success/10 text-success' : 'bg-danger/10 text-danger',
                )}
              >
                {lengthCalStatus.text}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
