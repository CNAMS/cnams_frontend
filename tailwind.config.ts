import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Matches the body stack in globals.css — Devanagari first (Hindi is
        // the primary locale), Latin companion second.
        sans: [
          'var(--font-devanagari)',
          'var(--font-latin)',
          'system-ui',
          '-apple-system',
          'sans-serif',
        ],
      },
      colors: {
        surface:    '#F4FBF9',
        card:       '#FFFFFF',
        primary:    '#00695C',
        'primary-container': '#C8F5ED',
        'on-primary-container': '#003732',
        outline:    '#6F9490',
        'on-surface': '#1A1A1A',
        'on-surface-variant': '#3F5B58',
        brand: {
          DEFAULT: '#00695C',
          light:   '#C8F5ED',
          dark:    '#004D40',
        },
        class: {
          normal:        '#2E7D32',
          overweight:    '#1565C0',
          mam:           '#F9A825',
          sam:           '#C62828',
          indeterminate: '#616161',
        },
        'normal-container':       '#E8F5E9',
        'overweight-container':   '#E3F2FD',
        'mam-container':          '#FFF9C4',
        'sam-container':          '#FFEBEE',
        'indeterminate-container':'#F5F5F5',
      },
    },
  },
  plugins: [],
};
export default config;
