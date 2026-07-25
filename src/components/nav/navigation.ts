import {
  Activity,
  BarChart3,
  Baby,
  ClipboardList,
  Cog,
  Home,
  IdCard,
  LayoutDashboard,
  Ruler,
  Stethoscope,
  Users,
  Wrench,
  type LucideIcon,
} from 'lucide-react';
import type { AppRole } from '@/theme/roles';
import type { TranslationKey } from '@/data/translations';

/**
 * Role-driven navigation, from one table.
 *
 * ANKUR_EXPERIENCE_ROADMAP §EX4: "one app, five shapes" — the shell changes
 * per role, and navigation and guards are driven from a single source so a
 * route cannot appear for a role that may not reach it.
 *
 * `built: false` marks a destination the roadmap specifies but the portal has
 * not implemented yet. The shell renders those disabled with a "soon" hint
 * rather than hiding them, so the shape of each role's app is visible and a
 * click does not 404.
 */

export type NavItem = {
  href: string;
  /** Key into src/data/translations.ts. */
  labelKey: TranslationKey;
  icon: LucideIcon;
  built?: boolean;
};

export const ROLE_NAV: Record<AppRole, NavItem[]> = {
  // AWW: Home / Children / Measure / Settings
  aww: [
    { href: '/worker', labelKey: 'navHome', icon: Home, built: true },
    { href: '/worker/children', labelKey: 'navChildren', icon: Baby },
    { href: '/worker/measure', labelKey: 'navMeasure', icon: Ruler },
    { href: '/settings', labelKey: 'navSettings', icon: Cog },
  ],
  // Supervisor: Overview / Centres / Referrals / Diagnostics
  supervisor: [
    { href: '/supervisor', labelKey: 'navOverview', icon: LayoutDashboard, built: true },
    { href: '/centres', labelKey: 'navCentres', icon: Users, built: true },
    { href: '/referrals', labelKey: 'navReferrals', icon: ClipboardList, built: true },
    { href: '/data-quality', labelKey: 'navDiagnostics', icon: Wrench, built: true },
  ],
  // Doctor: Cases / Search / Settings
  doctor: [
    { href: '/doctor', labelKey: 'navCases', icon: Stethoscope, built: true },
    { href: '/settings', labelKey: 'navSettings', icon: Cog },
  ],
  // Parent: Child / Card
  parent: [
    { href: '/parent', labelKey: 'navMyChild', icon: Baby, built: true },
    { href: '/parent/card', labelKey: 'navGrowthCard', icon: IdCard },
  ],
  // Admin: Users / Centres / Analytics / Config
  admin: [
    { href: '/admin', labelKey: 'navUsers', icon: Users, built: true },
    { href: '/admin/analytics', labelKey: 'navAnalytics', icon: BarChart3 },
    { href: '/admin/app-health', labelKey: 'navAppHealth', icon: Activity },
    { href: '/admin/config', labelKey: 'navConfig', icon: Cog },
  ],
};

export function navFor(role: AppRole): NavItem[] {
  return ROLE_NAV[role] ?? ROLE_NAV.aww;
}

/** Translation key for a role's display name. */
export const ROLE_LABEL_KEY: Record<AppRole, TranslationKey> = {
  aww: 'roleAww',
  supervisor: 'roleSupervisor',
  doctor: 'roleDoctor',
  parent: 'roleParent',
  admin: 'roleAdmin',
};
