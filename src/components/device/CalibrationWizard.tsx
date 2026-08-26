'use client';

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

export function CalibrationWizard({ ble }: CalibrationWizardProps) {
  const [activeTab, setActiveTab] = useState<'weight' | 'length'>('weight');

  // Weight Calibration state
  const [weightStep, setWeightStep] = useState<1 | 2 | 3>(1);
  const [refWeightKg, setRefWeightKg] = useState<string>('5.00');
  const [weightCalStatus, setWeightCalStatus] = useState<string | null>(null);

  // Length Calibration state
  const [lengthStep, setLengthStep] = useState<1 | 2 | 3>(1);
  const [refLengthCm, setRefLengthCm] = useState<string>('50.0');
  const [lengthCalStatus, setLengthCalStatus] = useState<string | null>(null);

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
      setWeightCalStatus(`Scale calibrated to ${kg.toFixed(2)} kg reference successfully!`);
      setWeightStep(3);
    } catch (err: unknown) {
      setWeightCalStatus(err instanceof Error ? err.message : 'Calibration failed');
    }
  };

  const handleRevertWeightCal = async () => {
    try {
      await setWeightCalibration(420.0);
      setWeightCalStatus('Weight calibration reverted to factory default (420.0).');
      setWeightStep(1);
    } catch (err: unknown) {
      setWeightCalStatus(err instanceof Error ? err.message : 'Failed to revert weight calibration');
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
      setLengthCalStatus(`Stadiometer calibrated to ${cm.toFixed(1)} cm reference successfully!`);
      setLengthStep(3);
    } catch (err: unknown) {
      setLengthCalStatus(err instanceof Error ? err.message : 'Calibration failed');
    }
  };

  const handleRevertLengthCal = async () => {
    try {
      await setLengthCalibration(0.5);
      setLengthCalStatus('Height calibration reverted to factory default (0.50).');
      setLengthStep(1);
    } catch (err: unknown) {
      setLengthCalStatus(err instanceof Error ? err.message : 'Failed to revert height calibration');
    }
  };

  return (
    <Card className="overflow-hidden border-border/80 shadow-md">
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
          Load Cell (Weight)
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
          Optical Encoder (Height)
        </button>
      </div>

      <div className="p-6">
        {!isConnected ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <AlertCircle className="h-10 w-10 text-amber-500/80" />
            <p className="mt-3 text-sm font-medium text-foreground">
              Please connect the ESP32 scale via Bluetooth above to perform sensor calibration.
            </p>
          </div>
        ) : activeTab === 'weight' ? (
          /* ── WEIGHT CALIBRATION WIZARD ── */
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border/60 bg-muted/20 p-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Live Sensor Reading
                </span>
                <div className="mt-1 text-3xl font-extrabold text-foreground">
                  {weight ? `${weight.value} kg` : '0.00 kg'}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={cn(
                    'inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium',
                    weight?.stable
                      ? 'bg-emerald-500/10 text-emerald-600 dark:text-emerald-400'
                      : 'bg-amber-500/10 text-amber-600 dark:text-amber-400'
                  )}
                >
                  <span className={cn('h-1.5 w-1.5 rounded-full', weight?.stable ? 'bg-emerald-500' : 'bg-amber-500 animate-pulse')} />
                  {weight?.stable ? 'Stable Lock' : 'Live Stream'}
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div
                className={cn(
                  'rounded-xl border p-4 transition-all',
                  weightStep === 1
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border/60 bg-card opacity-80'
                )}
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                  <span>Step 1</span>
                  {weightStep > 1 && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                </div>
                <h4 className="mt-1 font-semibold text-foreground">Zero / Tare Platform</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  Ensure the scale platform is empty and clear of objects.
                </p>
                {weightStep === 1 && (
                  <Button size="sm" onClick={handleWeightTare} className="mt-4 w-full">
                    <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                    Zero Scale
                  </Button>
                )}
              </div>

              <div
                className={cn(
                  'rounded-xl border p-4 transition-all',
                  weightStep === 2
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border/60 bg-card opacity-80'
                )}
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                  <span>Step 2</span>
                  {weightStep > 2 && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                </div>
                <h4 className="mt-1 font-semibold text-foreground">Place Calibration Mass</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  Place a certified test weight onto the scale.
                </p>
                {weightStep === 2 && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.01"
                        value={refWeightKg}
                        onChange={(e) => setRefWeightKg(e.target.value)}
                        className="w-full rounded-xl border-2 border-outline/40 bg-surface-variant px-3 py-2 text-sm font-semibold text-on-surface focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 shadow-inner"
                        placeholder="5.00"
                      />
                      <span className="text-xs font-bold text-on-surface-variant">kg</span>
                    </div>
                    <Button size="sm" onClick={handleApplyWeightCal} className="w-full bg-brand hover:bg-brand-dark text-on-primary shadow-sm">
                      <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                      Save Factor
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setWeightStep(1)} className="w-full text-xs text-muted-foreground hover:text-foreground">
                      ← Cancel & Back to Step 1
                    </Button>
                  </div>
                )}
              </div>

              <div
                className={cn(
                  'rounded-xl border p-4 transition-all',
                  weightStep === 3
                    ? 'border-emerald-500 bg-emerald-500/5 shadow-sm'
                    : 'border-border/60 bg-card opacity-80'
                )}
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600">
                  <span>Step 3</span>
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <h4 className="mt-1 font-semibold text-foreground">Verified & Locked</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  Calibration factor is saved permanently to ESP32 Flash memory.
                </p>
                {weightStep === 3 && (
                  <div className="mt-4 space-y-2">
                    <Button variant="secondary" size="sm" onClick={() => setWeightStep(1)} className="w-full">
                      Recalibrate Again
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleRevertWeightCal} className="w-full text-xs text-rose-600 hover:bg-rose-500/10">
                      <RotateCcw className="mr-1.5 h-3 w-3" />
                      Revert to Factory Default
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {weightCalStatus && (
              <div className="rounded-xl bg-emerald-500/10 p-3 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                {weightCalStatus}
              </div>
            )}
          </div>
        ) : (
          /* ── LENGTH CALIBRATION WIZARD ── */
          <div className="space-y-6">
            <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-border/60 bg-muted/20 p-4">
              <div>
                <span className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
                  Live Height Reading
                </span>
                <div className="mt-1 text-3xl font-extrabold text-foreground">
                  {length ? `${length.value} cm` : '0.0 cm'}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-500/10 px-2.5 py-1 text-xs font-medium text-emerald-600 dark:text-emerald-400">
                  <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Encoder Online
                </span>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
              <div
                className={cn(
                  'rounded-xl border p-4 transition-all',
                  lengthStep === 1
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border/60 bg-card opacity-80'
                )}
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                  <span>Step 1</span>
                  {lengthStep > 1 && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                </div>
                <h4 className="mt-1 font-semibold text-foreground">Zero Height Position</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  Push headpiece / tape all the way back to the 0 cm stop.
                </p>
                {lengthStep === 1 && (
                  <Button size="sm" onClick={handleLengthZero} className="mt-4 w-full">
                    <RotateCcw className="mr-1.5 h-3.5 w-3.5" />
                    Zero Position
                  </Button>
                )}
              </div>

              <div
                className={cn(
                  'rounded-xl border p-4 transition-all',
                  lengthStep === 2
                    ? 'border-primary bg-primary/5 shadow-sm'
                    : 'border-border/60 bg-card opacity-80'
                )}
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-primary">
                  <span>Step 2</span>
                  {lengthStep > 2 && <CheckCircle2 className="h-4 w-4 text-emerald-600" />}
                </div>
                <h4 className="mt-1 font-semibold text-foreground">Extend to Reference Bar</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  Extend headpiece to a known reference rod (e.g. 50.0 cm).
                </p>
                {lengthStep === 2 && (
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        step="0.1"
                        value={refLengthCm}
                        onChange={(e) => setRefLengthCm(e.target.value)}
                        className="w-full rounded-xl border-2 border-outline/40 bg-surface-variant px-3 py-2 text-sm font-semibold text-on-surface focus:border-brand focus:outline-none focus:ring-2 focus:ring-brand/20 shadow-inner"
                        placeholder="50.0"
                      />
                      <span className="text-xs font-bold text-on-surface-variant">cm</span>
                    </div>
                    <Button size="sm" onClick={handleApplyLengthCal} className="w-full bg-brand hover:bg-brand-dark text-on-primary shadow-sm">
                      <Sparkles className="mr-1.5 h-3.5 w-3.5" />
                      Save Factor
                    </Button>
                    <Button variant="ghost" size="sm" onClick={() => setLengthStep(1)} className="w-full text-xs text-muted-foreground hover:text-foreground">
                      ← Cancel & Back to Step 1
                    </Button>
                  </div>
                )}
              </div>

              <div
                className={cn(
                  'rounded-xl border p-4 transition-all',
                  lengthStep === 3
                    ? 'border-emerald-500 bg-emerald-500/5 shadow-sm'
                    : 'border-border/60 bg-card opacity-80'
                )}
              >
                <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-600">
                  <span>Step 3</span>
                  <ShieldCheck className="h-4 w-4" />
                </div>
                <h4 className="mt-1 font-semibold text-foreground">Verified & Locked</h4>
                <p className="mt-1 text-xs text-muted-foreground">
                  Calibration factor is saved permanently to ESP32 Flash memory.
                </p>
                {lengthStep === 3 && (
                  <div className="mt-4 space-y-2">
                    <Button variant="secondary" size="sm" onClick={() => setLengthStep(1)} className="w-full">
                      Recalibrate Again
                    </Button>
                    <Button variant="ghost" size="sm" onClick={handleRevertLengthCal} className="w-full text-xs text-rose-600 hover:bg-rose-500/10">
                      <RotateCcw className="mr-1.5 h-3 w-3" />
                      Revert to Factory Default
                    </Button>
                  </div>
                )}
              </div>
            </div>

            {lengthCalStatus && (
              <div className="rounded-xl bg-emerald-500/10 p-3 text-xs font-semibold text-emerald-700 dark:text-emerald-300">
                {lengthCalStatus}
              </div>
            )}
          </div>
        )}
      </div>
    </Card>
  );
}
