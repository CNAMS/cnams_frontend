'use client';

import React from 'react';
import {
  AlertTriangle,
  CheckCircle2,
  HelpCircle,
  Info,
  OctagonAlert,
  type LucideIcon,
} from 'lucide-react';
import { styleFor, styleForStatus, type GrowthClass } from '@/theme/classification';
import { useLanguage } from '@/context/LanguageContext';
import { cn } from '@/lib/cn';

/**
 * A growth classification, rendered as colour + WORD + ICON.
 *
 * This component exists to make the roadmap's hardest rule structural rather
 * than advisory: "every colour-coded status also carries text or an icon"
 * (PRODUCTION_ROADMAP, Localisation & Accessibility; ANKUR_EXPERIENCE_ROADMAP
 * §2). The worker may have a colour-vision deficiency, and the parent growth
 * card gets photocopied in greyscale — a bare red pill conveys nothing in
 * either case.
 *
 * There is no prop to hide the icon or the label. Rendering a classification
 * as colour alone is not a supported configuration.
 */

const ICONS: Record<string, LucideIcon> = {
  CheckCircle2,
  Info,
  AlertTriangle,
  OctagonAlert,
  HelpCircle,
};

type Props = {
  /** Low-emphasis tinted fill, for dense tables. Solid fill is the default. */
  subtle?: boolean;
  size?: 'sm' | 'md';
  className?: string;
};

function Badge({
  color,
  onColor,
  container,
  onContainer,
  iconName,
  label,
  subtle,
  size = 'sm',
  className,
}: {
  color: string;
  onColor: string;
  container: string;
  onContainer: string;
  iconName: string;
  label: string;
  } & Props) {
  const Icon = ICONS[iconName] ?? HelpCircle;
  const iconSize = size === 'sm' ? 13 : 16;

  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 rounded-full font-bold whitespace-nowrap',
        size === 'sm' ? 'px-2.5 py-1 text-xs' : 'px-3 py-1.5 text-sm',
        className,
      )}
      // Inline styles, not Tailwind classes: these are clinical values that
      // must not be re-themed by role or by dark mode, so they deliberately
      // bypass the token cascade.
      style={
        subtle
          ? { backgroundColor: container, color: onContainer }
          : { backgroundColor: color, color: onColor }
      }
    >
      <Icon size={iconSize} aria-hidden="true" className="shrink-0" />
      {label}
    </span>
  );
}

/** Full five-value growth classification. */
export function ClassificationBadge({
  growthClass,
  ...props
}: { growthClass: GrowthClass } & Props) {
  const { t } = useLanguage();
  const style = styleFor(growthClass);
  return (
    <Badge
      color={style.color}
      onColor={style.onColor}
      container={style.container}
      onContainer={style.onContainer}
      iconName={style.icon}
      label={t(style.labelKey)}
      {...props}
    />
  );
}

/**
 * The SAM/MAM shorthand used by the referral and centre surfaces. Routes
 * through the same clinical palette so those tables cannot drift into
 * inventing their own reds and ambers.
 */
export function StatusBadge({
  status,
  ...props
}: { status: 'SAM' | 'MAM' } & Props) {
  const style = styleForStatus(status);
  return (
    <Badge
      color={style.color}
      onColor={style.onColor}
      container={style.container}
      onContainer={style.onContainer}
      iconName={style.icon}
      // SAM and MAM are clinical codes, identical in both locales — the app's
      // hi.arb keeps them Latin too. Not passed through t() on purpose.
      label={status}
      {...props}
    />
  );
}
