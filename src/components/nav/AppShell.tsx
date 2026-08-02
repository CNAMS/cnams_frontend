'use client';

import React, { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, Menu, X } from 'lucide-react';
import { useLanguage } from '@/context/LanguageContext';
import { useTheme } from '@/context/ThemeContext';
import { navFor, ROLE_LABEL_KEY, type NavItem } from '@/components/nav/navigation';
import { Breadcrumbs, type Crumb } from '@/components/nav/Breadcrumbs';
import { SproutMark, AnkurWordmark } from '@/components/brand/SproutMark';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import { IconButton, ButtonLink } from '@/components/ui/Button';
import { cn } from '@/lib/cn';

/**
 * The signed-in shell: floating pill header, and a floating pill sidebar on desktop.
 *
 * Navigation comes from ROLE_NAV keyed on the active role (§EX4), so the shell
 * changes shape per role from one table rather than per-page conditionals.
 */

function isActive(pathname: string, href: string): boolean {
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


/**
 * Bottom navigation for phones.
 */
function BottomNav({
  items,
  pathname,
}: {
  items: NavItem[];
  pathname: string;
}) {
  const { t } = useLanguage();
  const shown = items.filter((i) => i.built).slice(0, 4);
  if (shown.length < 2) return null;

  return (
    <nav
      aria-label={t('navPrimary')}
      className={cn(
        'lg:hidden fixed bottom-0 inset-x-0 z-30',
        'bg-surface-container/95 backdrop-blur border-t border-outline-variant',
        'pb-[env(safe-area-inset-bottom)]',
      )}
    >
      <ul className="flex">
        {shown.map((item) => {
          const active = isActive(pathname, item.href);
          const Icon = item.icon;
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'flex flex-col items-center justify-center gap-0.5',
                  'min-h-touch py-2 px-1 text-[11px] font-medium',
                  'transition-colors duration-fast ease-ankur',
                  active ? 'text-brand' : 'text-on-surface-variant',
                )}
              >
                <Icon size={20} aria-hidden="true" />
                <span className="truncate max-w-full">{t(item.labelKey)}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}

export function AppShell({
  title,
  subtitle,
  actions,
  breadcrumbs,
  children,
}: {
  title: React.ReactNode;
  subtitle?: React.ReactNode;
  actions?: React.ReactNode;
  breadcrumbs?: Crumb[];
  children: React.ReactNode;
}) {
  const { t } = useLanguage();
  const { role } = useTheme();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const items = navFor(role);

  // Close the drawer on navigation
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Trap focus & escape for mobile drawer
  useEffect(() => {
    if (!drawerOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    const panel = drawerRef.current;
    const focusable = () => Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])') ?? []);
    focusable()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setDrawerOpen(false);
        return;
      }
      if (e.key !== 'Tab') return;
      const nodes = focusable();
      if (nodes.length === 0) return;
      const first = nodes[0];
      const last = nodes[nodes.length - 1];

      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };

    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
  }, [drawerOpen]);

  const sidebarLinks = (
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
    <div className="min-h-screen bg-surface text-on-surface font-sans flex">
      <a
        href="#main"
        className={cn(
          'sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50',
          'focus:bg-brand focus:text-on-primary focus:px-4 focus:py-2.5 focus:rounded-xl',
        )}
      >
        {t('skipToContent')}
      </a>

      {/* ── Desktop floating pill sidebar ─────────────────────────────────── */}
      <aside
        className={cn(
          'hidden lg:flex lg:flex-col lg:w-64 lg:shrink-0',
          'fixed left-4 top-4 bottom-4 z-40',
          'bg-surface-container/85 backdrop-blur-xl',
          'border border-outline-variant rounded-3xl',
          'shadow-lg shadow-black/[0.06]',
          'overflow-hidden'
        )}
      >
        <div className="p-5 border-b border-outline-variant/50">
          <Link href="/" className="inline-flex">
            <AnkurWordmark size={30} />
          </Link>
          <p className="mt-2 text-xs font-medium text-on-surface-variant">
            {t(ROLE_LABEL_KEY[role])}
          </p>
        </div>
        
        <div className="flex-1 overflow-y-auto">
          {sidebarLinks}
        </div>

        <div className="p-3 border-t border-outline-variant/50">
          <ButtonLink href="/login" variant="ghost" size="sm" block>
            <LogOut size={16} aria-hidden="true" />
            {t('logout')}
          </ButtonLink>
        </div>
      </aside>

      {/* ── Mobile drawer ────────────────────────────────────────────────── */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label={t('navMenu')}
            className="relative w-72 max-w-[85vw] bg-surface-container h-full flex flex-col shadow-xl"
          >
            <div className="flex items-center justify-between p-4 border-b border-outline-variant">
              <AnkurWordmark size={28} />
              <IconButton
                label={t('navCloseMenu')}
                onClick={() => setDrawerOpen(false)}
              >
                <X size={20} aria-hidden="true" />
              </IconButton>
            </div>
            <div className="flex-1 overflow-y-auto">
              {sidebarLinks}
            </div>
            <div className="p-3 border-t border-outline-variant">
              <ButtonLink href="/login" variant="ghost" size="sm" block>
                <LogOut size={16} aria-hidden="true" />
                {t('logout')}
              </ButtonLink>
            </div>
          </div>
        </div>
      )}

      {/* ── Content column ───────────────────────────────────────────────── */}
      <div className="flex-1 min-w-0 lg:pl-[17rem] flex flex-col items-center">
        {/* Floating pill header */}
        <div className="sticky top-3 z-30 mx-3 sm:mx-5 mt-3 w-[calc(100%-1.5rem)] max-w-5xl">
          <header>
            <div className={cn(
              'bg-surface-container/85 backdrop-blur-xl',
              'border border-outline-variant rounded-full',
              'flex items-center gap-4 sm:gap-6 px-5 sm:px-7 py-3',
              'shadow-lg shadow-black/[0.06]',
            )}>
              <IconButton
                label={t('navMenu')}
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden"
              >
                <Menu size={22} aria-hidden="true" />
              </IconButton>

              <SproutMark size={26} title="" className="lg:hidden shrink-0" />

              <div className="min-w-0 flex-1">
                <h1 className="text-base sm:text-lg font-semibold truncate">{title}</h1>
                {subtitle && (
                  <p className="text-xs sm:text-sm text-on-surface-variant truncate hidden sm:block">
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
        </div>

        {/* Main content */}
        <main id="main" className="p-6 sm:p-10 pt-10 sm:pt-14 pb-28 lg:pb-12 w-full max-w-5xl flex-1">
          {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
          {children}
        </main>

        <BottomNav items={items} pathname={pathname} />
      </div>
    </div>
  );
}
