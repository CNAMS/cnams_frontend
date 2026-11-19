# Ankur Portal — Design System

The visual contract the portal is held to. Any colour, size or duration in
`src/` should be traceable to a line in this file. If a page needs something
this file does not define, add it here first.

The portal is the web half of one product. The Flutter field app
([`cnams_app`](https://github.com/CNAMS/cnams_app), `lib/shared/theme/app_theme.dart`)
is the authority for brand and role colour; this file adapts it to a desk-sized
screen and records every place the web has to deviate, with the reason.

---

## 1. Principles

1. **The data is the product.** A supervisor opens the portal to find the five
   children who need a referral. Chrome recedes; numbers, names and status do
   not. Every panel is designed to take attention away from itself.
2. **Colour is never the only channel.** Classification is always colour +
   word + icon. Supervisors print these pages on a black-and-white office
   printer, and some of them have colour-vision deficiency.
3. **Quiet by default, loud only for risk.** Neutral surfaces and one brand
   accent per role. Red, amber and the SAM/MAM palette are reserved for
   children who need attention, so they still mean something when they appear.
4. **Borders before shadows.** Elevation is a 1px line. Shadows are kept for
   things that genuinely float: menus, dialogs, toasts.
5. **Hindi first, at desk density.** Devanagari needs ~15% more line height
   than Latin and has no capitals, so hierarchy comes from size and weight,
   never from uppercase. Labels are written to survive translation to Marathi
   and Gujarati, which run longer.
6. **It must work on a 1366×768 district-office laptop and a ₹8,000 phone.**
   That is the real hardware.

---

## 2. Colour

Defined once as CSS custom properties in `src/app/globals.css`, redefined for
`.dark`, and consumed through `tailwind.config.ts`. Components never hard-code
a hex.

### 2.1 Role accent — one brand, five skins

Shared with the app: `cnams_app/lib/shared/theme/role_palette.dart` holds the
same table. Only the accent and the page tint change between roles; layout,
type and every neutral are shared.

| Role | Accent (light) | Accent (dark) | Page tint | White on accent |
|---|---|---|---|---|
| AWW | `#00695C` teal | `#4DB6AC` | `#FBF8F1` warm sand | 6.6:1 |
| Supervisor | `#3949AB` indigo | `#9FA8DA` | `#F5F6FB` | 7.7:1 |
| Doctor | `#6A40B0` violet | `#B9A2E0` | `#F8F6FC` | 7.1:1 |
| Parent | `#A8396F` rose | `#EDA1C2` | `#FCF6F8` | 6.0:1 |
| Admin | `#4B5570` slate | `#A9B4CC` | `#EEF1F5` | 7.4:1 |

**Why these hues.** A role colour must never be mistaken for a result. The
earlier palette used the exact "Normal" green for supervisors, the exact
"Overweight" blue for doctors, and an amber for parents that sat beside "MAM"
and gave white text 2.6:1. Every accent above is clear of §2.3.

Each accent has derived tokens, all checked:

| Token | Use | Contrast |
|---|---|---|
| `--accent` | Primary buttons, links, active nav, focus ring | ≥ 5.6:1 on the page tint |
| `--accent-hover` | Hover/pressed state | darker than `--accent` |
| `--accent-subtle` | Selected rows, active nav fill, info callouts | — |
| `--on-accent-subtle` | Text on `--accent-subtle` | ≥ 8.7:1 |

### 2.2 Neutrals

Warm "stone" neutrals: they sit naturally on the sand and amber tints and stay
neutral on the cooler doctor and admin tints.

| Token | Light | Dark | Contrast on card |
|---|---|---|---|
| `--bg` | role tint | `#0F1214` | — |
| `--surface` (cards, tables) | `#FFFFFF` | `#171B1E` | — |
| `--surface-sunken` (table head, wells) | `#F6F5F3` | `#13171A` | — |
| `--surface-raised` (menus, dialogs) | `#FFFFFF` | `#1E2327` | — |
| `--line` (card edges, dividers) | `#E7E5E2` | `#2A3035` | — |
| `--line-strong` (inputs, emphasis) | `#D3D0CB` | `#3A4147` | — |
| `--text` | `#1C1B19` | `#ECEEF0` | 17.2:1 / 14.9:1 |
| `--text-muted` | `#57534E` | `#A3AAB1` | 7.6:1 / 7.4:1 |
| `--text-faint` | `#6F6A64` | `#80878F` | 5.4:1 / 4.8:1 |

`--text-faint` is the floor. Nothing in the UI is lighter than 4.5:1.

### 2.3 Clinical classification — never re-themed

Not by role, not by dark mode, not for aesthetics. Identical to
`AppTheme.styleFor`, each with a fixed icon and word.

| Class | Colour | Icon | Word (hi / en) |
|---|---|---|---|
| Normal | `#2E7D32` | ✓ check | सामान्य / Normal |
| Overweight | `#1565C0` | ⓘ info | अधिक वज़न / Overweight |
| MAM | `#F9A825` | ⚠ warning | मध्यम कुपोषण / MAM |
| SAM | `#C62828` | ⛔ octagon | गंभीर कुपोषण / SAM |
| Indeterminate | `#616161` | ? help | अनिश्चित / Indeterminate |

MAM amber is below 3:1 on white. It is therefore used only as a fill or a
4px rule beside text that carries the meaning; MAM *text* uses the
`on-container` token (`#4A3200`, 11.9:1).

### 2.4 Feedback

Feedback re-uses the clinical hues so the portal has one red, one amber and
one green, not two of each: success `--class-normal`, warning `#B45309`,
danger `--class-sam`.

---

## 3. Typography

| Role | Family | Size / line / weight |
|---|---|---|
| Display (landing hero) | Source Serif 4 · Noto Serif Devanagari | `clamp(2.25rem, 1.6rem + 2.6vw, 3.5rem)` / 1.1 / 600 |
| Page title (H1) | Source Serif 4 · Noto Serif Devanagari | `clamp(1.5rem, 1.3rem + 0.8vw, 1.875rem)` / 1.25 / 600 |
| Section title (H2) | Inter · Noto Sans Devanagari | 1.0625rem / 1.4 / 600 |
| Body | Inter · Noto Sans Devanagari | 0.9375rem / 1.6 / 400 |
| Small / table | Inter · Noto Sans Devanagari | 0.875rem / 1.5 / 400 |
| Label / eyebrow | Inter · Noto Sans Devanagari | 0.75rem / 1.4 / 600, `0.04em` tracking |
| Figures | Inter, `tabular-nums` | as context |

- The serif appears only in page titles and the landing hero. It gives the
  portal the weight of an institution's document; the UI itself stays sans.
- Latin face first, then Devanagari: each script falls through to the face
  that covers it, so numerals and IDs stay in Inter in Hindi mode.
- Eyebrows are *not* uppercased: it does nothing for Devanagari and makes
  English shout. Tracking and weight carry the label instead.
- Every number that is compared down a column is `tabular-nums`.

All faces are self-hosted by `next/font` — no request to Google at runtime.

---

## 4. Layout

**Spacing scale:** 4 · 8 · 12 · 16 · 20 · 24 · 32 · 48 · 64. Nothing else.

**Radii:** 8px controls · 12px cards and panels · 16px dialogs · full for pills
and avatars.

**Elevation:** three shadows, all tinted with the text colour, not black:

| Token | Use |
|---|---|
| `--shadow-xs` | Resting buttons and inputs (barely there) |
| `--shadow-md` | Popovers, dropdowns, the floating mobile nav |
| `--shadow-lg` | Dialogs, the command palette |

Cards do not have a shadow. They have `--line`.

**App shell (≥1024px):** 248px sidebar (brand, role switch, grouped nav,
account) + a 56px top bar (breadcrumbs, search, language, theme) + content at
`max-width: 1200px`, 32px gutters.
**App shell (<1024px):** top bar with menu button, content at 16px gutters,
and the role-aware bottom bar for the 3–5 primary destinations.

**Page anatomy:** every page opens with a `PageHeader` — breadcrumbs, serif
title, one-line description, and at most two actions on the right. Then a row
of stat tiles if the page has numbers, then the primary table or list.

**Tables:** 44px rows, 12px horizontal padding, sticky header on
`--surface-sunken`, numbers right-aligned, the status column always uses
`ClassificationBadge`. On narrow screens tables become stacked cards rather
than scrolling sideways.

---

## 5. Motion

| Interaction | Duration | Easing |
|---|---|---|
| Hover, focus, press | 120ms | `ease-out` |
| Menus, popovers, the sidebar drawer | 180ms | `cubic-bezier(.2,.8,.2,1)` |
| Page content entering | 200ms | `cubic-bezier(.2,.8,.2,1)` |
| Splash sprout (the one signature) | 900ms | `cubic-bezier(.2,0,0,1)` |

Only `opacity` and `transform` are animated. Colour changes on hover are the
one exception and are scoped to the element being hovered — never a global
`transition` on every coloured element, which makes theme switches crawl.

`prefers-reduced-motion` turns every transition into an instant cut. It never
hides information: a toast still appears, it just doesn't slide.

---

## 6. Components

The primitives live in `src/components/ui/`. Pages compose them and add no
colour of their own.

| Component | Notes |
|---|---|
| `Button` / `ButtonLink` | `primary` (accent fill), `secondary` (surface + line), `ghost`, `danger`. Sizes `sm` 32px, `md` 40px, `lg` 48px. Touch targets stay ≥44px on coarse pointers. |
| `Card` | `--surface` + `--line`, 12px radius, optional header with title and action. |
| `PageHeader` | Breadcrumbs, serif H1, description, actions. |
| `StatTile` | Label, tabular figure, optional delta and sparkline; sample-data chip when mocked. |
| `DataTable` | See §4. Stacks to cards below 640px. |
| `ClassificationBadge` | §2.3 — colour + icon + word, never colour alone. |
| `Badge` | Neutral and accent status pills for non-clinical state. |
| `EmptyState` / `ErrorState` | Icon, one sentence, one action. Never a blank panel. |
| `SampleDataChip` | Marks illustrative figures (Ankur rule: mock data is never passed off as real). |

---

## 7. Deviations from the app

| Web | App | Why |
|---|---|---|
| Serif page titles | Sans throughout | A desk document benefits from a display face; a phone in the sun does not. |
| 40px default control height | 48px | Pointer precision on a desktop; coarse pointers still get 44px. |
