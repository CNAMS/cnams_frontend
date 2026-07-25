/**
 * Ankur's role palettes — a direct port of `_RolePalette` in the Flutter app
 * (cnams_app/lib/shared/theme/app_theme.dart).
 *
 * One brand, five tuned skins. A role theme changes the primary and the
 * surface temperature and *nothing else* — the logo, the type scale, the
 * spacing and the clinical classification colours are identical everywhere
 * (ANKUR_EXPERIENCE_ROADMAP §2.1).
 *
 * Keep this table in lockstep with app_theme.dart. If a colour changes there,
 * it changes here; the two products are one brand and a supervisor moving
 * between the phone and the portal should not notice a seam.
 */

export const APP_ROLES = ['aww', 'supervisor', 'doctor', 'parent', 'admin'] as const;

export type AppRole = (typeof APP_ROLES)[number];

export const DEFAULT_ROLE: AppRole = 'aww';

export type RolePalette = {
  /** Brand primary — buttons, links, active nav, focus rings. */
  primary: string;
  /** A darker primary for hover/pressed states. */
  primaryDark: string;
  /** Tinted container fill, the M3 "primary container" role. */
  primaryContainer: string;
  /** Readable foreground on `primaryContainer`. */
  onPrimaryContainer: string;
  /** Page background in light mode — the role's surface temperature. */
  surface: string;
  /** Page background in dark mode. */
  surfaceDark: string;
};

export const ROLE_PALETTES: Record<AppRole, RolePalette> = {
  // The original field theme: deep teal on warm sand. Used outdoors in bright
  // sun, so it stays the highest-contrast of the five. Do not "modernise" it.
  aww: {
    primary: '#00695C',
    primaryDark: '#004D40',
    primaryContainer: '#C8F5ED',
    onPrimaryContainer: '#00201C',
    surface: '#FBF8F1',
    surfaceDark: '#12100C',
  },
  // Sprout green — oversight of growth across centres.
  supervisor: {
    primary: '#2E7D32',
    primaryDark: '#1B5E20',
    primaryContainer: '#CDEFCB',
    onPrimaryContainer: '#0B2410',
    surface: '#F6F8F3',
    surfaceDark: '#101410',
  },
  // Clinical blue — reads as medical, calm and precise.
  doctor: {
    primary: '#1565C0',
    primaryDark: '#0D47A1',
    primaryContainer: '#D3E4FD',
    onPrimaryContainer: '#0A2647',
    surface: '#F5F8FC',
    surfaceDark: '#0D1218',
  },
  // Warm amber — reassuring and approachable for a guardian, not clinical.
  parent: {
    primary: '#E68A00',
    primaryDark: '#B36B00',
    primaryContainer: '#FFE3B8',
    onPrimaryContainer: '#3D2400',
    surface: '#FDF7EE',
    surfaceDark: '#17120A',
  },
  // A light "console" — slate/indigo on cool grey. Deliberately NOT dark:
  // the roadmap is explicit that the admin surface is dense and data-first
  // but still a light theme.
  admin: {
    primary: '#4B5570',
    primaryDark: '#343C54',
    primaryContainer: '#DDE2EC',
    onPrimaryContainer: '#161B26',
    surface: '#EEF1F5',
    surfaceDark: '#0F1116',
  },
};

export function isAppRole(value: unknown): value is AppRole {
  return typeof value === 'string' && (APP_ROLES as readonly string[]).includes(value);
}

export function paletteFor(role: AppRole): RolePalette {
  return ROLE_PALETTES[role] ?? ROLE_PALETTES[DEFAULT_ROLE];
}
