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
  // India Green — the field theme, echoing the green band of the tricolor.
  aww: {
    primary: '#138808',
    primaryDark: '#0E6B06',
    primaryContainer: '#D4EDCF',
    onPrimaryContainer: '#0A3A06',
    surface: '#FDFAF2',
    surfaceDark: '#121008',
  },
  // Deep Saffron — oversight of growth, warm and authoritative.
  supervisor: {
    primary: '#D4781A',
    primaryDark: '#B86510',
    primaryContainer: '#FFE8CC',
    onPrimaryContainer: '#3D2000',
    surface: '#FEFAF4',
    surfaceDark: '#141008',
  },
  // Ashoka Chakra Navy — reads as precise and trustworthy.
  doctor: {
    primary: '#1A3C8F',
    primaryDark: '#0F2B6E',
    primaryContainer: '#D8E2FD',
    onPrimaryContainer: '#0A1A3D',
    surface: '#F5F7FC',
    surfaceDark: '#0D1018',
  },
  // Warm Saffron — reassuring and approachable for a guardian.
  parent: {
    primary: '#E8831A',
    primaryDark: '#C06D0E',
    primaryContainer: '#FFE0B8',
    onPrimaryContainer: '#3D2200',
    surface: '#FEF8F0',
    surfaceDark: '#17120A',
  },
  // Deep Navy console — dense and data-first, deliberately a light theme.
  admin: {
    primary: '#2C3E6B',
    primaryDark: '#1E2D52',
    primaryContainer: '#DDE3F0',
    onPrimaryContainer: '#121B2E',
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
