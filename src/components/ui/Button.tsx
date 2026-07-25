import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';

/**
 * The one button in the system.
 *
 * Every interactive control clears the 48px minimum touch target
 * (AppTheme.minTouchTarget) — including the icon-only variant, which is the
 * one most often built too small. Focus rings come from the global
 * :focus-visible rule rather than being restated per variant.
 */

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const VARIANTS: Record<Variant, string> = {
  // Filled brand — one per screen. If two things are primary, neither is.
  primary: 'bg-brand text-on-primary hover:bg-brand-dark shadow-sm',
  // Outlined — the default for anything that is not the single main action.
  secondary:
    'bg-surface-container text-brand border-2 border-outline hover:bg-primary-container',
  // Text-only, for tertiary actions inside dense surfaces.
  ghost: 'text-brand hover:bg-primary-container',
  // Destructive. Uses the clinical SAM red because that is the established
  // "stop" colour across both products; it is not a sixth brand colour.
  danger: 'bg-class-sam text-white hover:brightness-110 shadow-sm',
};

const SIZES: Record<Size, string> = {
  sm: 'min-h-touch px-3 py-2 text-sm gap-1.5',
  md: 'min-h-touch px-4 py-2.5 text-base gap-2',
  lg: 'min-h-touch px-6 py-3.5 text-lg gap-2.5',
};

type BaseProps = {
  variant?: Variant;
  size?: Size;
  /** Stretch to the container. Used for the primary action on narrow screens. */
  block?: boolean;
  children?: React.ReactNode;
  className?: string;
};

type ButtonProps = BaseProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof BaseProps>;

type LinkButtonProps = BaseProps &
  Omit<React.ComponentProps<typeof Link>, keyof BaseProps>;

const base =
  'inline-flex items-center justify-center rounded-xl font-semibold ' +
  'transition-colors duration-fast ease-ankur ' +
  'disabled:opacity-50 disabled:pointer-events-none';

function classes(
  { variant = 'secondary', size = 'md', block, className }: BaseProps,
): string {
  return cn(base, VARIANTS[variant], SIZES[size], block && 'w-full', className);
}

export function Button({
  variant,
  size,
  block,
  className,
  type = 'button',
  ...rest
}: ButtonProps) {
  // Default to type="button". An unspecified <button> inside a <form> is a
  // submit button, which is how "Cancel" ends up submitting the form.
  return <button type={type} className={classes({ variant, size, block, className })} {...rest} />;
}

/** Same skin, rendered as a link. Navigation must stay an <a> for the browser. */
export function ButtonLink({
  variant,
  size,
  block,
  className,
  ...rest
}: LinkButtonProps) {
  return <Link className={classes({ variant, size, block, className })} {...rest} />;
}

/**
 * Icon-only button. `label` is required, not optional — an unlabelled icon
 * button is announced as "button" and nothing else, which is how the back
 * arrows on these pages currently read to a screen reader.
 */
export function IconButton({
  label,
  children,
  variant = 'ghost',
  className,
  type = 'button',
  ...rest
}: { label: string } & ButtonProps) {
  return (
    <button
      type={type}
      aria-label={label}
      title={label}
      className={cn(
        base,
        VARIANTS[variant],
        'min-h-touch min-w-touch p-2',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
