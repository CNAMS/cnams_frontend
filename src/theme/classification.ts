/**
 * The clinical classification palette — a direct port of `AppTheme.styleFor`
 * in the Flutter app (cnams_app/lib/shared/theme/app_theme.dart).
 *
 * These five colours are CLINICAL, NOT BRAND. They never change with the role
 * theme, they never change in dark mode, and they are never restyled for
 * aesthetic reasons. A red band means SAM on the phone, on the portal, and on
 * a photocopied parent card.
 *
 * The hard rule from the roadmap: colour is only ever half the signal. The
 * worker may have a colour-vision deficiency and the parent card may be
 * photocopied in greyscale, so every classification must render a colour, a
 * WORD and an ICON. `ClassificationStyle` bundles the three together for the
 * same reason the Dart class does — so a caller cannot take the colour and
 * quietly drop the icon.
 */

import type { TranslationKey } from '@/data/translations';

export const GROWTH_CLASSES = [
  'normal',
  'overweight',
  'mam',
  'sam',
  'indeterminate',
] as const;

export type GrowthClass = (typeof GROWTH_CLASSES)[number];

export type ClassificationStyle = {
  /** The band colour. Identical in light and dark mode — it is clinical. */
  color: string;
  /** Readable foreground on `color`, at AA or better. */
  onColor: string;
  /** A tinted container fill for low-emphasis surfaces. */
  container: string;
  /** Readable foreground on `container`. */
  onContainer: string;
  /** lucide-react icon name. Never render the colour without it. */
  icon: 'CheckCircle2' | 'Info' | 'AlertTriangle' | 'OctagonAlert' | 'HelpCircle';
  /** Translation key for the label word. Never render the colour without it. */
  labelKey: TranslationKey;
};

export const CLASSIFICATION_STYLES: Record<GrowthClass, ClassificationStyle> = {
  normal: {
    color: '#2E7D32', // green
    onColor: '#FFFFFF',
    container: '#E8F5E9',
    onContainer: '#14401A',
    icon: 'CheckCircle2',
    labelKey: 'classNormal',
  },
  overweight: {
    // Blue, deliberately off the malnutrition scale — overweight is a
    // different axis, not "worse than normal".
    color: '#1565C0',
    onColor: '#FFFFFF',
    container: '#E3F2FD',
    onContainer: '#0A2647',
    icon: 'Info',
    labelKey: 'classOverweight',
  },
  mam: {
    color: '#F9A825', // amber
    onColor: '#1A1A1A',
    container: '#FFF8E1',
    onContainer: '#4A3200',
    icon: 'AlertTriangle',
    labelKey: 'classMam',
  },
  sam: {
    color: '#C62828', // red
    onColor: '#FFFFFF',
    container: '#FFEBEE',
    onContainer: '#5A1212',
    icon: 'OctagonAlert',
    labelKey: 'classSam',
  },
  indeterminate: {
    // Grey — we are not guessing. An indeterminate result is a real, honest
    // outcome (the WHO tables ship empty and fail safe to this), not an error
    // state to be styled away.
    color: '#616161',
    onColor: '#FFFFFF',
    container: '#F5F5F5',
    onContainer: '#2B2B2B',
    icon: 'HelpCircle',
    labelKey: 'classIndeterminate',
  },
};

export function styleFor(growthClass: GrowthClass): ClassificationStyle {
  return CLASSIFICATION_STYLES[growthClass];
}

/**
 * The screening/referral surfaces speak in 'SAM'/'MAM' codes rather than the
 * full GrowthClass enum; map them onto the clinical palette so those tables
 * cannot drift into their own colours.
 */
export function styleForStatus(status: 'SAM' | 'MAM'): ClassificationStyle {
  return CLASSIFICATION_STYLES[status === 'SAM' ? 'sam' : 'mam'];
}
