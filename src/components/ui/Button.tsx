import React from 'react';
import Link from 'next/link';
import { cn } from '@/lib/cn';

/**
 * The one button in the system (docs/DESIGN.md §6).
 *
 * 32 / 40 / 48px on a mouse; any coarse pointer gets at least 44px whatever
 * the size, so a phone never gets a target too small to hit. Focus rings come
 * from the global :focus-visible rule rather than being restated per variant.
 */

type Variant = 'primary' | 'secondary' | 'ghost' | 'danger';
type Size = 'sm' | 'md' | 'lg';

const VARIANTS: Record<Variant, string> = {
  // Filled accent — one per screen. If two things are primary, neither is.
  primary: 'bg-brand text-on-primary shadow-xs hover:bg-brand-dark',
  // Quiet surface + line — the default for anything that is not the main action.
  secondary:
    'bg-surface-container text-on-surface border border-line-strong shadow-xs ' +
    'hover:bg-surface-variant hover:border-outline',
  // Text-only, for tertiary actions inside dense surfaces.
  ghost: 'text-on-surface-variant hover:bg-surface-variant hover:text-on-surface',
  // Destructive. Uses the clinical SAM red because that is the established
  // "stop" colour across both products; it is not a sixth brand colour.
  danger: 'bg-class-sam text-white shadow-xs hover:brightness-95',
};

const SIZES: Record<Size, string> = {
  // min-h, not h: Marathi and Gujarati labels run long and must wrap on a
  // narrow phone rather than overflow the button.
  sm: 'min-h-8 py-1.5 px-3 text-sm gap-1.5 pointer-coarse:min-h-11',
  md: 'min-h-10 py-2 px-4 text-sm gap-2 pointer-coarse:min-h-11',
  lg: 'min-h-12 py-2.5 px-5 text-base gap-2',
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
  'inline-flex items-center justify-center rounded-control font-medium text-center leading-tight ' +
  'select-none transition-[background-color,border-color,color,transform] duration-fast ease-ankur ' +
  'active:translate-y-px disabled:opacity-50 disabled:pointer-events-none';

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
        'h-9 w-9 p-0 pointer-coarse:h-11 pointer-coarse:w-11',
        className,
      )}
      {...rest}
    >
      {children}
    </button>
  );
}
