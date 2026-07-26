# अंकुर Ankur — Supervisory Portal

> **Ankur** (अंकुर, "sprout") — *हर बच्चा, स्वस्थ विकास* · "Every child, growing well."

The web portal for the **Child Growth Management System (CGMS)** — the Track D
supervisory surface alongside [`cnams_app`](https://github.com/CNAMS/cnams_app),
the Flutter field application used by Anganwadi Workers.

The phone app captures; this portal oversees. Both are one product and share one
design system, so a supervisor moving between them should not feel they changed
vendors.

## What this portal does

- Sector rollup across centres: children screened, SAM/MAM counts, non-reporting centres.
- Per-centre drill-down: device health, screening trend, flagged children.
- Referral action list — every flagged child tracked from referral through to a recorded outcome.
- Diagnostics: z-score engine mismatches, implausible measurements, devices that have stopped syncing.
- Role-specific dashboards for all five roles.

## Stack

Next.js 14 (App Router) · React 18 · TypeScript · Tailwind CSS · Recharts · lucide-react

## Getting started

```bash
npm install
npm run dev     # http://localhost:3000
npm run build   # production build — run this before pushing, see below
npm run lint
```

> `next dev` does **not** run ESLint. Rules like `no-unused-vars` are errors
> under `next build` and will fail a deployment that `npm run dev` reported as
> healthy. Run `npm run build` before pushing.

## Architecture

```
src/
├── app/            routes (App Router)
├── components/
│   ├── brand/      sprout mark, wordmark, splash
│   ├── nav/        AppShell + role-driven navigation table
│   └── ui/         the design system primitives
├── context/        LanguageContext (i18n) · ThemeContext (role skin + dark mode)
├── data/           mock data + translations
├── theme/          role palettes · clinical classification palette
└── lib/
```

## The design system

### Colour is defined once

Every colour is a CSS custom property in `src/app/globals.css`. `tailwind.config.ts`
maps utilities onto `var()`. **Nothing is defined in both places** — that
indirection is what makes role skins and dark mode work without a variant
explosion.

### Role themes — one brand, five skins

Ported from `AppTheme.forRole` in the app. `<html data-role="…">` re-points the
primary and surface; every `bg-brand` follows.

| Role | Primary | Light surface |
|---|---|---|
| AWW (field worker) | `#00695C` deep teal | `#FBF8F1` warm sand |
| Supervisor | `#2E7D32` sprout green | `#F6F8F3` |
| Doctor | `#1565C0` clinical blue | `#F5F8FC` |
| Parent | `#E68A00` warm amber | `#FDF7EE` |
| Admin | `#4B5570` slate/indigo | `#EEF1F5` light console |

A role theme changes **only** the primary and the surface temperature. Admin is a
*light* console, deliberately not a dark theme.

### The clinical palette is not brand

| Class | Colour | Icon |
|---|---|---|
| Normal | `#2E7D32` | ✓ |
| Overweight | `#1565C0` | ⓘ |
| MAM | `#F9A825` | ⚠ |
| SAM | `#C62828` | ⛔ |
| Indeterminate | `#616161` | ? |

These **never** re-theme — not per role, not in dark mode, not for aesthetics.
Red is SAM on the phone, on the portal, and on a greyscale photocopy of a parent
card.

## Rules that are enforced, not just documented

These come from `ANKUR_EXPERIENCE_ROADMAP.md` and `PRODUCTION_ROADMAP.md`. Where
possible they are enforced by the type system rather than by review:

| Rule | How it's enforced |
|---|---|
| Colour is never the only signal | `ClassificationBadge` bundles colour + word + icon with no prop to suppress any of the three |
| Icon-only buttons need a name | `IconButton`'s `label` prop is **required** — an unnamed one fails the typecheck |
| Tables need an accessible name | `DataTable`'s `caption` prop is **required** |
| No missing translations | `t()` takes `TranslationKey`, a literal union — a typo is a compile error |
| 48px touch targets | Every `Button` size clears `min-h-touch` |
| Motion is optional | `prefers-reduced-motion` collapses every duration globally |

### Hindi is primary

`hi` is the default locale and English is the fallback — not the other way round.
`<html lang>` tracks the active language so screen readers pick the right voice.
Both language names always appear in their own script (हिन्दी / English).

### Mock data is labelled as mock

Every surface rendering `src/data/mockData.ts` carries a `SampleDataChip`,
mirroring `SampleChip` in the app. This matters most on the public landing page,
where an unqualified "42 children monitored" would assert a programme statistic
that is not true.

## Known limitations

- **All data is mocked.** `src/data/mockData.ts` is a static import; there is no API layer yet.
- **Authentication is a demonstration.** The role picker sets a theme and routes; it does not authenticate. Real identity (Google OAuth, phone OTP, email OTP, AWW offline PIN) arrives with the identity service — see §EX2.
- **`/centres/[id]` returns HTTP 200 for an unknown id.** It is a client component, so `notFound()` resolves after hydration: users see the branded 404, crawlers see the wrong status. Fixing it means splitting the route into a server component that resolves the centre and a client child that renders it — worth doing when the data layer stops being a static import.
- **Routes marked "Soon"** in the navigation are specified in the roadmap but not built.

## Related

- [`cnams_app`](https://github.com/CNAMS/cnams_app) — the Flutter field application
  - `docs/ANKUR_EXPERIENCE_ROADMAP.md` — brand, per-role themes, dashboards (EX0–EX5)
  - `docs/PRODUCTION_ROADMAP.md` — the functional roadmap (P0–P6)
  - `lib/shared/theme/app_theme.dart` — **the authority for any colour in this repo**

If a colour changes in `app_theme.dart`, change it here. The two products share
one brand.
