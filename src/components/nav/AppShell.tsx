'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, Menu, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { navFor, ROLE_LABEL_KEY, type NavItem } from '@/components/nav/navigation';
import { SproutMark, AnkurWordmark } from '@/components/brand/SproutMark';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import { IconButton, ButtonLink } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

/**
 * The signed-in shell: persistent navigation, a header, and the page body.
 *
 * The portal previously had no navigation of any kind. Each page hand-built
 * its own <header> — five near-identical copies — and the only way between
 * pages was a back arrow or a single "view all" link. /data-quality was not
 * linked from anywhere at all and could only be reached by typing the URL.
 *
 * Navigation comes from ROLE_NAV keyed on the active role (§EX4), so the shell
 * changes shape per role from one table rather than per-page conditionals.
 */

function isActive(pathname: string, href: string): boolean {
  // Exact match for the role root, prefix match for its sub-pages, so
  // /centres/c1 lights up "Centres" without /supervisor matching everything.
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

function NavLink({
  item,
  active,
  onNavigate,
}: {
  item: NavItem;
  active: boolean;
  onNavigate?: () => void;
}) {
  const { t } = useLanguage();
  const Icon = item.icon;
  const label = t(item.labelKey);

  // Destinations the roadmap defines but the portal has not built yet render
  // as disabled rather than vanishing, so each role's shape stays visible and
  // a click cannot 404.
  if (!item.built) {
    return (
      <span
        aria-disabled="true"
        className={cn(
          'flex items-center gap-3 px-3 min-h-touch rounded-xl',
          'text-on-surface-variant/50 cursor-not-allowed select-none',
        )}
      >
        <Icon size={19} aria-hidden="true" className="shrink-0" />
        <span className="flex-1 truncate">{label}</span>
        <span className="text-[10px] uppercase tracking-wide rounded-full bg-surface-variant px-1.5 py-0.5">
          {t('navComingSoon')}
        </span>
      </span>
    );
  }

  return (
    <Link
      href={item.href}
      onClick={onNavigate}
      aria-current={active ? 'page' : undefined}
      className={cn(
        'flex items-center gap-3 px-3 min-h-touch rounded-xl font-medium',
        'transition-colors duration-fast ease-ankur',
        active
          ? 'bg-primary-container text-on-primary-container'
          : 'text-on-surface-variant hover:bg-surface-variant hover:text-on-surface',
      )}
    >
      <Icon size={19} aria-hidden="true" className="shrink-0" />
      <span className="truncate">{label}</span>
    </Link>
  );
}

export function AppShell({
  title,
  subtitle,
  actions,
  children,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  /** Page-level actions for the header, e.g. an export button. */
  actions?: React.ReactNode;
  children: React.ReactNode;
}) {
  const { t } = useLanguage();
  const { role } = useTheme();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);

  const items = navFor(role);

  // Close the drawer on navigation; otherwise it stays open over the new page.
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Escape closes the drawer — expected of anything modal.
  useEffect(() => {
    if (!drawerOpen) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setDrawerOpen(false);
    };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [drawerOpen]);

  const sidebar = (
    <nav aria-label={t('navMenu')} className="flex flex-col gap-1 p-3">
      {items.map((item) => (
        <NavLink
          key={item.href}
          item={item}
          active={isActive(pathname, item.href)}
          onNavigate={() => setDrawerOpen(false)}
        />
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans">
      {/* A keyboard user should not have to tab through the whole nav on every
          page to reach the content. Visible only when focused. */}
      <a
        href="#main"
        className={cn(
          'sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50',
          'focus:bg-brand focus:text-on-primary focus:px-4 focus:py-2.5 focus:rounded-xl',
        )}
      >
        {t('skipToContent')}
      </a>

      <div className="flex">
        {/* ── Desktop sidebar ──────────────────────────────────────────────── */}
        <aside
          className={cn(
            'hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0',
            'h-screen sticky top-0 border-r border-outline-variant bg-surface-container',
          )}
        >
          <div className="p-4 border-b border-outline-variant">
            <Link href="/" className="inline-flex">
              <AnkurWordmark size={30} />
            </Link>
            <p className="mt-2 text-xs font-medium text-on-surface-variant">
              {t(ROLE_LABEL_KEY[role])}
            </p>
          </div>
          {sidebar}
          <div className="mt-auto p-3 border-t border-outline-variant">
            <ButtonLink href="/login" variant="ghost" size="sm" block>
              <LogOut size={16} aria-hidden="true" />
              {t('logout')}
            </ButtonLink>
          </div>
        </aside>

        {/* ── Mobile drawer ────────────────────────────────────────────────── */}
        {drawerOpen && (
          <div className="lg:hidden fixed inset-0 z-40 flex">
            <div
              className="absolute inset-0 bg-black/40"
              onClick={() => setDrawerOpen(false)}
              aria-hidden="true"
            />
            <div className="relative w-72 max-w-[85vw] bg-surface-container h-full flex flex-col shadow-xl">
              <div className="flex items-center justify-between p-4 border-b border-outline-variant">
                <AnkurWordmark size={28} />
                <IconButton
                  label={t('navCloseMenu')}
                  onClick={() => setDrawerOpen(false)}
                >
                  <X size={20} aria-hidden="true" />
                </IconButton>
              </div>
              {sidebar}
              <div className="mt-auto p-3 border-t border-outline-variant">
                <ButtonLink href="/login" variant="ghost" size="sm" block>
                  <LogOut size={16} aria-hidden="true" />
                  {t('logout')}
                </ButtonLink>
              </div>
            </div>
          </div>
        )}

        {/* ── Content column ───────────────────────────────────────────────── */}
        <div className="flex-1 min-w-0">
          <header
            className={cn(
              'sticky top-0 z-30 bg-surface-container/95 backdrop-blur',
              'border-b border-outline-variant',
            )}
          >
            <div className="flex items-center gap-3 px-4 sm:px-6 py-3">
              <IconButton
                label={t('navMenu')}
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden"
              >
                <Menu size={22} aria-hidden="true" />
              </IconButton>

              <SproutMark size={28} title="" className="lg:hidden" />

              <div className="min-w-0 flex-1">
                <h1 className="text-base sm:text-lg font-semibold truncate">{title}</h1>
                {subtitle && (
                  <p className="text-xs sm:text-sm text-on-surface-variant truncate">
                    {subtitle}
                  </p>
                )}
              </div>

              <div className="flex items-center gap-2 shrink-0">
                {actions}
                <ThemeToggle className="hidden sm:inline-flex" />
                <LanguageToggle />
              </div>
            </div>
          </header>

          <main id="main" className="p-4 sm:p-6 max-w-6xl mx-auto">
            {children}
          </main>
        </div>
      </div>
    </div>
  );
}
