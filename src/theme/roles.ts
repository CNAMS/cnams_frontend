/**
 * Ankur's role palettes — a direct port of `RolePalette` in the Flutter app
 * (cnams_app/lib/shared/theme/role_palette.dart). Contrast checks and the
 * reasoning behind each hue are in docs/DESIGN.md §2.1.
 *
 * One brand, five tuned skins. A role theme changes the primary and the
 * surface temperature and *nothing else* — the logo, the type scale, the
 * spacing and the clinical classification colours are identical everywhere
 * (ANKUR_EXPERIENCE_ROADMAP §2.1).
 *
 * Keep this table in lockstep with role_palette.dart. If a colour changes there,
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
  // Teal on warm sand — the field theme and the brand anchor.
  aww: {
    primary: '#00695C',
    primaryDark: '#00584D',
    primaryContainer: '#E0EDEB',
    onPrimaryContainer: '#002F29',
    surface: '#FBF8F1',
    surfaceDark: '#0F1214',
  },
  // Indigo — oversight. Never the clinical "Normal" green.
  supervisor: {
    primary: '#3949AB',
    primaryDark: '#303D90',
    primaryContainer: '#E7E9F5',
    onPrimaryContainer: '#1A214D',
    surface: '#F5F6FB',
    surfaceDark: '#0F1214',
  },
  // Violet — calm and precise. Never the clinical "Overweight" blue.
  doctor: {
    primary: '#6A40B0',
    primaryDark: '#593694',
    primaryContainer: '#EDE8F6',
    onPrimaryContainer: '#301D4F',
    surface: '#F8F6FC',
    surfaceDark: '#0F1214',
  },
  // Rose — warm for families, and clear of the "MAM" amber.
  parent: {
    primary: '#A8396F',
    primaryDark: '#8D305D',
    primaryContainer: '#F5E7EE',
    onPrimaryContainer: '#4C1A32',
    surface: '#FCF6F8',
    surfaceDark: '#0F1214',
  },
  // Slate console — dense and data-first, deliberately a light theme.
  admin: {
    primary: '#4B5570',
    primaryDark: '#3F475E',
    primaryContainer: '#E9EBEE',
    onPrimaryContainer: '#222632',
    surface: '#EEF1F5',
    surfaceDark: '#0F1214',
  },
};

export function isAppRole(value: unknown): value is AppRole {
  return typeof value === 'string' && (APP_ROLES as readonly string[]).includes(value);
}

export function paletteFor(role: AppRole): RolePalette {
  return ROLE_PALETTES[role] ?? ROLE_PALETTES[DEFAULT_ROLE];
}
