'use client';

import React, { useEffect, useRef, useState } from 'react';
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


/**
 * Bottom navigation for phones.
 *
 * §EX4 specifies an adaptive shell whose bottom-nav changes per role. The
 * drawer alone put every destination two taps away (open menu, then choose)
 * and required reaching the top-left corner one-handed; a bottom bar puts the
 * role's main destinations one thumb-tap away.
 *
 * Capped at four items — beyond that the labels stop being legible at phone
 * widths. Roles with more (admin has six) keep the rest in the drawer, which
 * is why the menu button stays.
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
        // Keeps the bar clear of the iOS home indicator.
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
  /** Page-level actions for the header, e.g. an export button. */
  actions?: React.ReactNode;
  /** Trail from the role's home to here. Omit on a role's own home page. */
  breadcrumbs?: Crumb[];
  children: React.ReactNode;
}) {
  const { t } = useLanguage();
  const { role } = useTheme();
  const pathname = usePathname();
  const [drawerOpen, setDrawerOpen] = useState(false);
  const drawerRef = useRef<HTMLDivElement>(null);

  const items = navFor(role);

  // Close the drawer on navigation; otherwise it stays open over the new page.
  useEffect(() => {
    setDrawerOpen(false);
  }, [pathname]);

  // The drawer is a modal dialog, so it owes the keyboard three things:
  // Escape to close, focus moved inside on open and restored on close, and a
  // focus trap so Tab cannot wander into the page behind it. Without the trap
  // a keyboard user tabs straight out of an open drawer into content they
  // cannot see, with no way to tell where they are.
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
    // Stop the page behind the overlay from scrolling under the drawer.
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
      opener?.focus();
    };
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
            className="sticky top-3 z-30 mx-3 sm:mx-5 mt-3"
          >
            <div className={cn(
              'bg-surface-container/85 backdrop-blur-xl',
              'border border-outline-variant rounded-full',
              'flex items-center gap-3 px-4 sm:px-5 py-2.5',
              'shadow-lg shadow-black/[0.06]',
            )}>
              <IconButton
                label={t('navMenu')}
                onClick={() => setDrawerOpen(true)}
                className="lg:hidden"
              >
                <Menu size={22} aria-hidden="true" />
              </IconButton>

              <SproutMark size={26} title="" className="lg:hidden" />

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

          {/* pb-24 on small screens clears the fixed bottom bar; without it
              the last card sits underneath it and cannot be reached. */}
          <main id="main" className="p-4 sm:p-6 pt-6 sm:pt-8 pb-24 lg:pb-6 max-w-6xl mx-auto">
            {breadcrumbs && breadcrumbs.length > 0 && <Breadcrumbs items={breadcrumbs} />}
            {children}
          </main>

          <BottomNav items={items} pathname={pathname} />
        </div>
      </div>
    </div>
  );
}
