'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Baby, Cog, LayoutDashboard, Stethoscope, Users, type LucideIcon } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import type { AppRole } from '@/theme/roles';
import { ROLE_LABEL_KEY } from '@/components/nav/navigation';
import { AnkurWordmark, SproutMark } from '@/components/brand/SproutMark';
import { Button } from '@/components/ui/Button';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import { cn } from '@/lib/cn';
import { useTranslations } from 'next-intl';

/**
 * Role-based sign-in.
 *
 * This is still a mock gate — EX2 defines the real identity layer (Google
 * OAuth, phone OTP, email OTP, plus the AWW's offline PIN) and the backend for
 * it does not exist yet. What this screen does do correctly now is cover all
 * five roles and apply the chosen role's theme, so picking "Supervisor" turns
 * the portal indigo before the dashboard even loads.
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
  const t = useTranslations();
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
    <div className="min-h-screen bg-surface text-on-surface font-sans lg:grid lg:grid-cols-[minmax(0,5fr)_minmax(0,6fr)]">
      {/* ── Brand panel (desktop) ───────────────────────────────────────────
          Filled with the selected role's accent, so the user sees the theme
          they are signing in to change as they pick. */}
      <aside className="hidden lg:flex flex-col justify-between bg-brand text-on-primary p-10 xl:p-14 transition-colors duration-base ease-ankur">
        <Link href="/" className="inline-flex items-center gap-3 rounded-control" aria-label="Ankur">
          <span className="grid place-items-center w-11 h-11 rounded-card bg-white/95">
            <SproutMark size={30} title="" />
          </span>
          <span className="text-xl font-semibold">अंकुर Ankur</span>
        </Link>
        <div className="max-w-md space-y-4">
          <p className="font-serif text-[2.25rem] leading-tight font-semibold text-balance">
            {t('ankurTagline')}
          </p>
          <p className="text-base opacity-85 text-pretty">{t('publicWebsiteSubtitle')}</p>
        </div>
        <p className="text-sm opacity-75">{t('footerLine')}</p>
      </aside>

      <div className="flex flex-col min-h-screen">
        <header className="h-16 px-4 sm:px-8 flex items-center gap-3 border-b border-outline-variant lg:border-b-0">
          <Link href="/" className="inline-flex lg:hidden rounded-control" aria-label="Ankur">
            <AnkurWordmark size={26} />
          </Link>
          <div className="ml-auto flex items-center gap-2">
            <ThemeToggle className="hidden sm:inline-flex" />
            <LanguageToggle />
          </div>
        </header>

        <main className="flex-1 flex items-start lg:items-center justify-center px-4 sm:px-8 py-10 sm:py-14">
          <div className="w-full max-w-[26rem] page-enter">
            <h1 className="font-serif text-title font-semibold">{t('signIn')}</h1>
            <p className="mt-1.5 text-on-surface-variant">{t('selectRole')}</p>

            <form onSubmit={handleLogin} className="mt-8 space-y-6" noValidate>
              {/* ── Role picker ─────────────────────────────────────────────
                  A 5-way choice is a radiogroup. Selecting a role re-themes
                  the page immediately. */}
              <div role="radiogroup" aria-label={t('selectRole')} className="grid grid-cols-2 gap-2">
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
                        'flex items-center gap-2.5 rounded-control border px-3 min-h-11 text-sm text-left',
                        'transition-colors duration-fast ease-ankur',
                        r === 'admin' && 'col-span-2',
                        active
                          ? 'border-brand bg-primary-container text-on-primary-container font-medium ring-1 ring-brand'
                          : 'border-line-strong bg-surface-container text-on-surface hover:bg-surface-variant',
                      )}
                    >
                      <Icon
                        size={18}
                        aria-hidden="true"
                        className={cn('shrink-0', active ? 'text-brand' : 'text-faint')}
                      />
                      <span className="leading-tight">{t(ROLE_LABEL_KEY[r])}</span>
                    </button>
                  );
                })}
              </div>

              <div className="space-y-1.5">
                <label className="block text-sm font-medium" htmlFor="pin">
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
                    'w-full h-11 px-3.5 rounded-control bg-surface-container text-base tracking-widest',
                    'border shadow-xs transition-[border-color,box-shadow] duration-fast ease-ankur',
                    'placeholder:text-faint placeholder:tracking-normal',
                    'focus:outline-none focus:ring-2 focus:ring-brand/30',
                    error ? 'border-class-sam' : 'border-outline focus:border-brand',
                  )}
                />
                {error && (
                  // role="alert" so the message is announced when it appears.
                  <p id="pin-error" role="alert" className="text-sm font-medium text-class-sam">
                    {error}
                  </p>
                )}
              </div>

              <Button type="submit" variant="primary" size="lg" block disabled={submitting}>
                {submitting ? t('signingIn') : t('mockLoginButton')}
              </Button>
            </form>

            <p className="mt-6 rounded-control border border-outline-variant bg-surface-variant px-3.5 py-3 text-xs text-on-surface-variant leading-relaxed">
              {t('mockAuthNotice')}
            </p>
          </div>
        </main>
      </div>
    </div>
  );
}
