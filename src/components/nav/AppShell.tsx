'use client';

import React, { useEffect, useRef, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { LogOut, Menu, Settings, X } from 'lucide-react';
import { useTheme } from '@/context/ThemeContext';
import { navFor, ROLE_LABEL_KEY, type NavItem } from '@/components/nav/navigation';
import { Breadcrumbs, type Crumb } from '@/components/nav/Breadcrumbs';
import { SproutMark, AnkurWordmark } from '@/components/brand/SproutMark';
import { ThemeToggle } from '@/components/ui/ThemeToggle';
import LanguageToggle from '@/components/LanguageToggle';
import { IconButton } from '@/components/ui/Button';
import { PageHeader } from '@/components/ui/PageHeader';
import { cn } from '@/lib/cn';
import { useTranslations } from 'next-intl';

/**
 * The signed-in shell (docs/DESIGN.md §4).
 *
 * ≥1024px: a fixed 248px sidebar (brand, role, navigation, account) beside a
 * sticky 56px top bar and the content column. <1024px: the top bar gains a
 * menu button that opens the same navigation as a drawer, and the role-aware
 * bottom bar carries the primary destinations.
 *
 * Navigation comes from ROLE_NAV keyed on the active role (§EX4), so the shell
 * changes shape per role from one table rather than per-page conditionals.
 * Every page passes its title, description, actions and breadcrumbs here, and
 * the shell renders them as one consistent PageHeader.
 */

function isActive(pathname: string, href: string): boolean {
  if (href === '/') return pathname === '/';
  return pathname === href || pathname.startsWith(`${href}/`);
}

/** The deepest nav item that matches, so /worker does not light up on /worker/children. */
function activeHref(items: NavItem[], pathname: string): string | undefined {
  return items
    .filter((i) => isActive(pathname, i.href))
    .sort((a, b) => b.href.length - a.href.length)[0]?.href;
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
  const t = useTranslations();
  const Icon = item.icon;
  const label = t(item.labelKey);

  if (!item.built) {
    return (
      <span
        aria-disabled="true"
        className="flex items-center gap-3 px-2.5 h-9 rounded-control text-faint cursor-not-allowed select-none"
      >
        <Icon size={18} aria-hidden="true" className="shrink-0" />
        <span className="flex-1 truncate text-sm">{label}</span>
        <span className="text-[11px] rounded-md border border-outline-variant px-1.5 leading-5">
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
        'group relative flex items-center gap-3 px-2.5 h-9 pointer-coarse:h-11 rounded-control text-sm',
        'transition-colors duration-fast ease-ankur',
        active
          ? 'bg-primary-container text-on-primary-container font-medium'
          : 'text-on-surface-variant hover:bg-surface-variant hover:text-on-surface',
      )}
    >
      <Icon
        size={18}
        aria-hidden="true"
        className={cn('shrink-0', active ? 'text-brand' : 'text-faint group-hover:text-on-surface-variant')}
      />
      <span className="truncate">{label}</span>
    </Link>
  );
}

/** Bottom navigation for phones: the role's first four built destinations. */
function BottomNav({ items, current }: { items: NavItem[]; current?: string }) {
  const t = useTranslations();
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
          const active = item.href === current;
          const Icon = item.icon;
          return (
            <li key={item.href} className="flex-1">
              <Link
                href={item.href}
                aria-current={active ? 'page' : undefined}
                className={cn(
                  'relative flex flex-col items-center justify-center gap-1',
                  'min-h-touch py-2 px-1 text-[11px] font-medium',
                  'transition-colors duration-fast ease-ankur',
                  active ? 'text-brand' : 'text-on-surface-variant',
                )}
              >
                {active && (
                  <span
                    aria-hidden="true"
                    className="absolute top-0 left-1/2 -translate-x-1/2 h-0.5 w-8 rounded-full bg-brand"
                  />
                )}
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

/** Brand, role, navigation and account — shared by the sidebar and the drawer. */
function NavPanel({
  items,
  current,
  onNavigate,
  header,
}: {
  items: NavItem[];
  current?: string;
  onNavigate?: () => void;
  header: React.ReactNode;
}) {
  const t = useTranslations();
  const { role } = useTheme();
  const hasSettings = items.some((i) => i.href === '/settings');

  return (
    <>
      <div className="h-14 px-4 flex items-center justify-between gap-2 border-b border-outline-variant shrink-0">
        {header}
      </div>

      <div className="px-3 pt-4 pb-2">
        <span className="inline-flex items-center gap-1.5 rounded-md bg-primary-container text-on-primary-container px-2 h-6 text-xs font-medium">
          <span aria-hidden="true" className="w-1.5 h-1.5 rounded-full bg-brand" />
          {t(ROLE_LABEL_KEY[role])}
        </span>
      </div>

      <nav aria-label={t('navMenu')} className="flex-1 overflow-y-auto px-3 pb-3">
        <ul className="flex flex-col gap-0.5">
          {items.map((item) => (
            <li key={item.href}>
              <NavLink item={item} active={item.href === current} onNavigate={onNavigate} />
            </li>
          ))}
        </ul>
      </nav>

      <div className="p-3 border-t border-outline-variant flex flex-col gap-0.5 shrink-0">
        {!hasSettings && (
          <Link
            href="/settings"
            onClick={onNavigate}
            className="flex items-center gap-3 px-2.5 h-9 pointer-coarse:h-11 rounded-control text-sm text-on-surface-variant hover:bg-surface-variant hover:text-on-surface transition-colors duration-fast"
          >
            <Settings size={18} aria-hidden="true" className="text-faint" />
            {t('navSettings')}
          </Link>
        )}
        <Link
          href="/login"
          onClick={onNavigate}
          className="flex items-center gap-3 px-2.5 h-9 pointer-coarse:h-11 rounded-control text-sm text-on-surface-variant hover:bg-surface-variant hover:text-on-surface transition-colors duration-fast"
        >
          <LogOut size={18} aria-hidden="true" className="text-faint" />
          {t('logout')}
        </Link>
      </div>
    </>
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
  const t = useTranslations();
  const { role } = useTheme();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const items = navFor(role);
  const current = activeHref(items, pathname);

  // Close the drawer on navigation.
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // Trap focus and handle Escape while the mobile drawer is open.
  useEffect(() => {
    if (!drawerOpen) return;
    const opener = document.activeElement as HTMLElement | null;
    const panel = drawerRef.current;
    const focusable = () =>
      Array.from(
        panel?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ) ?? [],
      );
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

  const crumbs = breadcrumbs ?? [];

  return (
    <div className="min-h-screen bg-surface text-on-surface font-sans">
      <a
        href="#main"
        className={cn(
          'sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50',
          'focus:bg-brand focus:text-on-primary focus:px-4 focus:py-2.5 focus:rounded-control',
        )}
      >
        {t('skipToContent')}
      </a>

      {/* ── Desktop sidebar ─────────────────────────────────────────────── */}
      <aside className="hidden lg:flex flex-col fixed inset-y-0 left-0 z-40 w-sidebar bg-surface-container border-r border-outline-variant">
        <NavPanel
          items={items}
          current={current}
          header={
            <Link href="/" className="inline-flex rounded-control" aria-label="Ankur">
              <AnkurWordmark size={26} />
            </Link>
          }
        />
      </aside>

      {/* ── Mobile drawer ───────────────────────────────────────────────── */}
      {drawerOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div
            className="absolute inset-0 bg-black/40 page-enter"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />
          <div
            ref={drawerRef}
            role="dialog"
            aria-modal="true"
            aria-label={t('navMenu')}
            className="relative w-sidebar max-w-[85vw] h-full flex flex-col bg-surface-container border-r border-outline-variant shadow-lg page-enter"
          >
            <NavPanel
              items={items}
              current={current}
              onNavigate={() => setDrawerOpen(false)}
              header={
                <>
                  <AnkurWordmark size={24} />
                  <IconButton label={t('navCloseMenu')} onClick={() => setDrawerOpen(false)}>
                    <X size={18} aria-hidden="true" />
                  </IconButton>
                </>
              }
            />
          </div>
        </div>
      )}

      {/* ── Content column ──────────────────────────────────────────────── */}
      <div className="lg:pl-sidebar flex flex-col min-h-screen">
        <header className="sticky top-0 z-30 h-14 border-b border-outline-variant bg-surface/85 backdrop-blur supports-[backdrop-filter]:bg-surface/75">
          <div className="h-full max-w-content mx-auto px-4 sm:px-8 flex items-center gap-3">
            <IconButton
              label={t('navMenu')}
              onClick={() => setDrawerOpen(true)}
              className="lg:hidden -ml-2"
            >
              <Menu size={20} aria-hidden="true" />
            </IconButton>
            <Link href="/" className="lg:hidden inline-flex items-center gap-2 min-w-0" aria-label="Ankur">
              <SproutMark size={24} title="" className="shrink-0" />
            </Link>

            <Breadcrumbs items={crumbs} className="hidden lg:block min-w-0" />

            <div className="ml-auto flex items-center gap-2 shrink-0">
              <LanguageToggle />
              <ThemeToggle className="hidden sm:inline-flex" />
            </div>
          </div>
        </header>

        <main
          id="main"
          className="flex-1 w-full max-w-content mx-auto px-4 sm:px-8 pt-6 sm:pt-8 pb-28 lg:pb-12 page-enter"
        >
          <PageHeader
            title={title}
            description={subtitle}
            actions={actions}
            breadcrumbs={
              crumbs.length > 0 ? <Breadcrumbs items={crumbs} className="lg:hidden" /> : null
            }
          />
          {children}
        </main>

        <BottomNav items={items} current={current} />
      </div>
    </div>
  );
}
