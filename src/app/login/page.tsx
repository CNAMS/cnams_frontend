'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Baby, Cog, LayoutDashboard, Stethoscope, Users, type LucideIcon } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import type { AppRole } from '@/theme/roles';
import { ROLE_LABEL_KEY } from '@/components/nav/navigation';
import { AnkurWordmark } from '@/components/brand/SproutMark';
import { Button } from '@/components/ui/Button';
import { Card } from '@/components/ui/Card';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import { cn } from '@/lib/cn';

/**
 * Role-based sign-in.
 *
 * This is still a mock gate — EX2 defines the real identity layer (Google
 * OAuth, phone OTP, email OTP, plus the AWW's offline PIN) and the backend for
 * it does not exist yet. What this screen does do correctly now is cover all
 * five roles and apply the chosen role's theme, so picking "Supervisor" turns
 * the portal sprout green before the dashboard even loads.
 */

const ROLE_ICONS: Record<AppRole, LucideIcon> = {
  aww: Baby,
  supervisor: LayoutDashboard,
  doctor: Stethoscope,
  parent: Users,
  admin: Cog,
};

/** Where each role lands after signing in. */
const ROLE_HOME: Record<AppRole, string> = {
  aww: '/worker',
  supervisor: '/supervisor',
  doctor: '/doctor',
  parent: '/parent',
  admin: '/admin',
};

const SELECTABLE: AppRole[] = ['aww', 'supervisor', 'doctor', 'parent', 'admin'];

export default function LoginPage() {
  const { t } = useLanguage();
  const { role, setRole } = useTheme();
  const router = useRouter();
  const [pin, setPin] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();

    // Minimal validation. The old form accepted an empty PIN and navigated
    // anyway, which taught users the field was decorative.
    if (pin.trim().length < 4) {
      setError(t('pinTooShort'));
      return;
    }

    setError(null);
    setSubmitting(true);
    router.push(ROLE_HOME[role]);
  };

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans flex flex-col">
      {/* ── Floating pill header ────────────────────────────────────────── */}
      <header className="fixed top-4 left-1/2 -translate-x-1/2 z-40 w-[calc(100%-2rem)] max-w-5xl">
        <div className="bg-surface-container/85 backdrop-blur-xl border border-outline-variant rounded-full px-6 sm:px-8 py-3 flex items-center gap-4 sm:gap-6 shadow-lg shadow-black/[0.06]">
          <Link href="/" className="inline-flex min-w-0 shrink-0">
            <AnkurWordmark size={30} />
          </Link>
          <div className="flex-1" />
          <ThemeToggle className="hidden sm:inline-flex" />
          <LanguageToggle />
        </div>
      </header>

      <main className="flex-1 flex items-start justify-center px-4 pt-24 sm:pt-28 pb-10 sm:pb-16">
        <div className="w-full max-w-md space-y-6">
          <div className="text-center space-y-1">
            <h1 className="text-2xl font-bold tracking-tight">{t('signIn')}</h1>
            <p className="text-on-surface-variant">{t('selectRole')}</p>
          </div>

          {/* ── Role picker ───────────────────────────────────────────────
              A 5-way choice is a radiogroup, not a segmented pair. Selecting
              a role re-themes the whole page immediately, so the user sees
              the colour they are signing in to before they commit. */}
          <fieldset>
            <legend className="sr-only">{t('selectRole')}</legend>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
              {SELECTABLE.map((r) => {
                const Icon = ROLE_ICONS[r];
                const active = role === r;
                return (
                  <button
                    key={r}
                    type="button"
                    role="radio"
                    aria-checked={active}
                    onClick={() => setRole(r)}
                    className={cn(
                      'flex flex-col items-center justify-center gap-1.5 rounded-xl',
                      'min-h-touch px-2 py-3 text-sm font-medium border-2',
                      'transition-colors duration-fast ease-ankur',
                      active
                        ? 'border-brand bg-primary-container text-on-primary-container'
                        : 'border-outline-variant text-on-surface-variant hover:bg-surface-variant',
                    )}
                  >
                    <Icon size={20} aria-hidden="true" />
                    <span className="text-center leading-tight">{t(ROLE_LABEL_KEY[r])}</span>
                  </button>
                );
              })}
            </div>
          </fieldset>

          <Card elevation="raised" className="space-y-5">
            <form onSubmit={handleLogin} className="space-y-4" noValidate>
              <div className="space-y-1.5">
                <label className="block text-sm font-semibold" htmlFor="pin">
                  {t('pinLabel')}
                </label>
                <input
                  id="pin"
                  name="pin"
                  type="password"
                  inputMode="numeric"
                  autoComplete="current-password"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    if (error) setError(null);
                  }}
                  aria-invalid={error ? true : undefined}
                  aria-describedby={error ? 'pin-error' : undefined}
                  placeholder="••••••"
                  className={cn(
                    'w-full min-h-touch px-4 rounded-xl bg-surface',
                    'border-2 transition-colors duration-fast ease-ankur',
                    'placeholder:text-on-surface-variant/50',
                    error ? 'border-class-sam' : 'border-outline focus:border-brand',
                  )}
                />
                {error && (
                  // role="alert" so the message is announced when it appears,
                  // rather than only being visible.
                  <p id="pin-error" role="alert" className="text-sm font-medium text-class-sam">
                    {error}
                  </p>
                )}
              </div>

              <Button type="submit" variant="primary" size="lg" block disabled={submitting}>
                {submitting ? t('signingIn') : t('mockLoginButton')}
              </Button>
            </form>

            <p className="text-xs text-on-surface-variant text-center leading-relaxed">
              {t('mockAuthNotice')}
            </p>
          </Card>
        </div>
      </main>
    </div>
  );
}
