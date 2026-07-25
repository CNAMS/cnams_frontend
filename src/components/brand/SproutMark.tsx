import React from 'react';
import { cn } from '@/lib/cn';

/**
 * The Ankur sprout — ported from cnams_app/assets/branding/ankur_logo.svg.
 *
 * अंकुर means "sprout": a child, like a young plant, thrives with the right
 * care at the right time. Two leaves rising from a stem over the soil line.
 *
 * Inlined as a component rather than loaded as an <img> so it can inherit
 * currentColor for the monochrome variant (needed for print and for the
 * greyscale-photocopy case the roadmap keeps flagging), and so it costs no
 * extra network request.
 *
 * Path data is copied verbatim from the app's SVG. If the logo changes there,
 * re-copy it here rather than redrawing — the two products share one mark.
 */

export function SproutMark({
  size = 40,
  /** Drops the tile and gradients, drawing in currentColor. For print,
   *  greyscale, and placement on an already-branded surface. */
  monochrome = false,
  className,
  title = 'Ankur',
}: {
  size?: number;
  monochrome?: boolean;
  className?: string;
  /** Accessible name. Pass "" when the adjacent wordmark already names it. */
  title?: string;
}) {
  const decorative = title === '';

  if (monochrome) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 256 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={className}
        role={decorative ? undefined : 'img'}
        aria-hidden={decorative || undefined}
        aria-label={decorative ? undefined : title}
      >
        {!decorative && <title>{title}</title>}
        <path
          d="M78 182 Q128 168 178 182"
          stroke="currentColor"
          strokeWidth={9}
          strokeLinecap="round"
          opacity={0.5}
        />
        <path
          d="M128 182 C128 150 128 132 128 96"
          stroke="currentColor"
          strokeWidth={10}
          strokeLinecap="round"
        />
        <path
          d="M128 128 C104 132 82 118 74 92 C102 86 124 100 128 128 Z"
          fill="currentColor"
        />
        <path
          d="M128 116 C150 104 168 74 162 44 C132 52 118 82 128 116 Z"
          fill="currentColor"
        />
      </svg>
    );
  }

  // Gradient ids must be unique per instance or a second mark on the page
  // reuses the first one's defs and renders wrong.
  const uid = React.useId();
  const tileId = `ankur-tile-${uid}`;
  const leafId = `ankur-leaf-${uid}`;

  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 256 256"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={cn('shrink-0', className)}
      role={decorative ? undefined : 'img'}
      aria-hidden={decorative || undefined}
      aria-label={decorative ? undefined : title}
    >
      {!decorative && <title>{title}</title>}
      <defs>
        <linearGradient id={tileId} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0" stopColor="#00897B" />
          <stop offset="1" stopColor="#00695C" />
        </linearGradient>
        <linearGradient id={leafId} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#7CC67B" />
          <stop offset="1" stopColor="#2E7D32" />
        </linearGradient>
      </defs>

      {/* App tile */}
      <rect x="8" y="8" width="240" height="240" rx="54" fill={`url(#${tileId})`} />
      {/* Soil / growing ground */}
      <path
        d="M78 182 Q128 168 178 182"
        stroke="#F4EEE2"
        strokeWidth={9}
        strokeLinecap="round"
        opacity={0.85}
      />
      {/* Stem */}
      <path
        d="M128 182 C128 150 128 132 128 96"
        stroke="#F4EEE2"
        strokeWidth={10}
        strokeLinecap="round"
      />
      {/* Left leaf */}
      <path
        d="M128 128 C104 132 82 118 74 92 C102 86 124 100 128 128 Z"
        fill={`url(#${leafId})`}
      />
      {/* Right leaf, larger and reaching up */}
      <path
        d="M128 116 C150 104 168 74 162 44 C132 52 118 82 128 116 Z"
        fill={`url(#${leafId})`}
      />
      {/* Leaf veins */}
      <path
        d="M128 126 C112 122 98 112 86 98"
        stroke="#F4EEE2"
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.6}
      />
      <path
        d="M128 114 C138 98 146 76 150 56"
        stroke="#F4EEE2"
        strokeWidth={3}
        strokeLinecap="round"
        opacity={0.6}
      />
    </svg>
  );
}

/**
 * The lockup: mark plus wordmark. Hindi leads because Hindi is the primary
 * locale, and both scripts are always shown — the roadmap is explicit that the
 * two language names appear in their own script.
 */
export function AnkurWordmark({
  size = 32,
  className,
  showTagline = false,
}: {
  size?: number;
  className?: string;
  showTagline?: boolean;
}) {
  return (
    <span className={cn('inline-flex items-center gap-2.5', className)}>
      <SproutMark size={size} title="" />
      <span className="leading-tight">
        <span className="block font-bold text-on-surface tracking-tight">
          अंकुर <span className="font-semibold opacity-70">Ankur</span>
        </span>
        {showTagline && (
          <span className="block text-xs text-on-surface-variant">
            हर बच्चा, स्वस्थ विकास
          </span>
        )}
      </span>
    </span>
  );
}
