import type { Config } from 'tailwindcss';

/**
 * Every colour here resolves to a CSS variable declared in src/app/globals.css.
 * Nothing is hardcoded twice. That indirection is what makes the role skins and
 * dark mode work at all: `bg-brand` is one class whose value changes when
 * <html data-role> or <html class="dark"> changes, with no variant explosion.
 */
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
          DEFAULT: 'var(--primary)',
          dark: 'var(--primary-dark)',
        },
        primary: 'var(--primary)',
        'on-primary': 'var(--on-primary)',
        'primary-container': 'var(--primary-container)',
        'on-primary-container': 'var(--on-primary-container)',

        // ── Surfaces ────────────────────────────────────────────────────────
        surface: {
          DEFAULT: 'var(--surface)',
          container: 'var(--surface-container)',
          variant: 'var(--surface-variant)',
        },
        // `card` kept as an alias so existing markup keeps working while the
        // pages migrate to surface-container.
        card: 'var(--surface-container)',

        // ── Outline ─────────────────────────────────────────────────────────
        // Previously one name with two conflicting values (#6F9490 in this
        // file, #B2CECA in globals.css). Now two names, one value each.
        outline: {
          DEFAULT: 'var(--outline)', // emphasis: inputs, selected state
          variant: 'var(--outline-variant)', // quiet: card edges, dividers
        },

        // ── Text ────────────────────────────────────────────────────────────
        'on-surface': 'var(--on-surface)',
        'on-surface-variant': 'var(--on-surface-variant)',
        faint: 'var(--text-faint)',
        raised: 'var(--surface-raised)',
        'line-strong': 'var(--line-strong)',
        warning: 'var(--warning)',

        // ── Clinical classification — never role-themed ─────────────────────
        class: {
          normal: 'var(--class-normal)',
          overweight: 'var(--class-overweight)',
          mam: 'var(--class-mam)',
          sam: 'var(--class-sam)',
          indeterminate: 'var(--class-indeterminate)',
        },
        'normal-container': 'var(--class-normal-container)',
        'on-normal-container': 'var(--class-normal-on-container)',
        'overweight-container': 'var(--class-overweight-container)',
        'on-overweight-container': 'var(--class-overweight-on-container)',
        'mam-container': 'var(--class-mam-container)',
        'on-mam-container': 'var(--class-mam-on-container)',
        'sam-container': 'var(--class-sam-container)',
        'on-sam-container': 'var(--class-sam-on-container)',
        'indeterminate-container': 'var(--class-indeterminate-container)',
        'on-indeterminate-container': 'var(--class-indeterminate-on-container)',
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
  plugins: [],
};

export default config;
