import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

/**
 * Every colour here resolves to a CSS variable declared in src/app/globals.css.
 * Nothing is hardcoded twice. That indirection is what makes the role skins and
 * dark mode work at all: `bg-brand` is one class whose value changes when
 * <html data-role> or <html class="dark"> changes, with no variant explosion.
 */

/**
 * A token colour that also supports Tailwind's opacity modifier.
 *
 * Plain `'var(--x)'` values cannot take `/NN` in Tailwind v3 — `bg-surface/85`
 * or `ring-brand/25` silently generated no CSS at all. Returning a function
 * lets Tailwind ask for an opacity, which `color-mix()` applies to the
 * variable at runtime, so role skins and dark mode still flow through.
 */
type ColorFn = (opts: { opacityValue?: string }) => string;
function token(name: string): string {
  const fn: ColorFn = ({ opacityValue }) =>
    opacityValue === undefined || opacityValue === '1'
      ? `var(${name})`
      : `color-mix(in srgb, var(${name}) calc(${opacityValue} * 100%), transparent)`;
  // Tailwind accepts colour functions at runtime, but its Config type only
  // describes strings.
  return fn as unknown as string;
}

const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      // docs/DESIGN.md §3. Latin face first: Inter has no Devanagari, so
      // Hindi falls through to Noto while numerals and IDs stay in Inter.
      fontFamily: {
        sans: [
          'var(--font-latin)',
          'var(--font-devanagari)',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
        // Page titles and the landing hero only.
        serif: [
          'var(--font-serif)',
          'var(--font-serif-devanagari)',
          'Georgia',
          'serif',
        ],
      },
      fontSize: {
        display: ['clamp(2.25rem, 1.6rem + 2.6vw, 3.5rem)', { lineHeight: '1.1', letterSpacing: '-0.02em' }],
        title: ['clamp(1.5rem, 1.3rem + 0.8vw, 1.875rem)', { lineHeight: '1.25', letterSpacing: '-0.01em' }],
        section: ['1.0625rem', { lineHeight: '1.4' }],
        body: ['0.9375rem', { lineHeight: '1.6' }],
        eyebrow: ['0.75rem', { lineHeight: '1.4', letterSpacing: '0.04em' }],
      },
      borderRadius: {
        control: '8px',
        card: '12px',
        dialog: '16px',
      },
      boxShadow: {
        xs: 'var(--shadow-xs)',
        md: 'var(--shadow-md)',
        lg: 'var(--shadow-lg)',
      },
      colors: {
        // ── Brand (role-dependent) ──────────────────────────────────────────
        brand: {
          DEFAULT: token('--primary'),
          dark: token('--primary-dark'),
        },
        primary: token('--primary'),
        'on-primary': token('--on-primary'),
        'primary-container': token('--primary-container'),
        'on-primary-container': token('--on-primary-container'),

        // ── Surfaces ────────────────────────────────────────────────────────
        surface: {
          DEFAULT: token('--surface'),
          container: token('--surface-container'),
          variant: token('--surface-variant'),
        },

        // ── Outline ─────────────────────────────────────────────────────────
        // Previously one name with two conflicting values (#6F9490 in this
        // file, #B2CECA in globals.css). Now two names, one value each.
        outline: {
          DEFAULT: token('--outline'), // emphasis: inputs, selected state
          variant: token('--outline-variant'), // quiet: card edges, dividers
        },

        // ── Text ────────────────────────────────────────────────────────────
        'on-surface': token('--on-surface'),
        'on-surface-variant': token('--on-surface-variant'),
        faint: token('--text-faint'),
        raised: token('--surface-raised'),
        'line-strong': token('--line-strong'),
        warning: token('--warning'),
        success: token('--success'),
        danger: token('--danger'),

        // ── shadcn-style aliases ──────────────────────────────────────────
        // The device pages were written against shadcn names that never
        // existed here, so text-muted-foreground, bg-card, border-border …
        // generated no CSS. Mapping them onto the tokens makes them render,
        // follow the role skin and switch with dark mode.
        foreground: token('--on-surface'),
        'muted-foreground': token('--on-surface-variant'),
        background: token('--surface'),
        card: token('--surface-container'),
        muted: token('--surface-variant'),
        border: token('--outline-variant'),
        destructive: token('--danger'),
        'primary-foreground': token('--on-primary'),

        // ── Clinical classification — never role-themed ─────────────────────
        class: {
          normal: token('--class-normal'),
          overweight: token('--class-overweight'),
          mam: token('--class-mam'),
          sam: token('--class-sam'),
          indeterminate: token('--class-indeterminate'),
        },
        'normal-container': token('--class-normal-container'),
        'on-normal-container': token('--class-normal-on-container'),
        'overweight-container': token('--class-overweight-container'),
        'on-overweight-container': token('--class-overweight-on-container'),
        'mam-container': token('--class-mam-container'),
        'on-mam-container': token('--class-mam-on-container'),
        'sam-container': token('--class-sam-container'),
        'on-sam-container': token('--class-sam-on-container'),
        'indeterminate-container': token('--class-indeterminate-container'),
        'on-indeterminate-container': token('--class-indeterminate-on-container'),
      },
      // Minimum interactive size. AppTheme.minTouchTarget is 48 in the Flutter
      // app and the accessibility rule is the same on the web.
      spacing: {
        touch: '48px',
        sidebar: '248px',
      },
      minWidth: { touch: '48px' },
      minHeight: { touch: '48px' },
      maxWidth: { content: '1200px' },
      transitionDuration: {
        fast: '120ms',
        base: '180ms',
      },
      transitionTimingFunction: {
        ankur: 'cubic-bezier(0.2, 0.8, 0.2, 1)',
      },
    },
  },
  plugins: [
    // Touch screens keep 44px targets while desktop controls can be 40px
    // (docs/DESIGN.md §6). Usage: `pointer-coarse:min-h-11`.
    plugin(({ addVariant }) => {
      addVariant('pointer-coarse', '@media (pointer: coarse)');
    }),
  ],
};

export default config;
