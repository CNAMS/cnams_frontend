'use client';

import React, { useEffect, useState } from 'react';

/**
 * The Ankur splash — the sprout grows, then the page arrives.
 *
 * ANKUR_EXPERIENCE_ROADMAP §EX1 opens the app with this, and §2 defines it as
 * the product's ONE signature animation: stem then leaves, ~900ms, eased.
 * Everywhere else motion is quiet 150–200ms fades. Keeping it to a single
 * signature is what stops the portal feeling like a demo reel.
 *
 * Timing is owned by CSS (see globals.css), not by a JS timer, so the fade-out
 * cannot drift out of sync with the grow. The component only removes the
 * element from the DOM once the animation has finished.
 *
 * Reduced motion: the global prefers-reduced-motion rule collapses every
 * duration, so the sprout appears finished rather than growing, and the splash
 * clears immediately. The mark is never withheld — only the movement is.
 */

/**
 * Whether the splash has already played for this loaded document.
 *
 * Deliberately a module-scoped variable rather than sessionStorage, because
 * the two answer different questions:
 *
 *   sessionStorage  — "has it played in this TAB?"      survives a refresh
 *   module variable — "has it played in this DOCUMENT?" resets on a refresh
 *
 * The second is what we actually want. A refresh is a fresh page load and
 * should replay the splash — suppressing it there just looks broken. But a
 * client-side navigation back to "/" (from /login, say) does not reload the
 * document, so the module state survives and the splash correctly stays away.
 *
 * Next being a SPA is what makes this distinction free: no storage, no
 * pre-paint script, no cleanup.
 */
let playedThisDocument = false;

export function SproutSplash() {
  // Read during the first render rather than in an effect, so a client-side
  // navigation renders null immediately instead of flashing the overlay for
  // one frame before an effect can remove it.
  const [present, setPresent] = useState(!playedThisDocument);

  useEffect(() => {
    if (playedThisDocument) return;
    playedThisDocument = true;

    // Slightly longer than the CSS animation so removal never clips the fade.
    const timer = window.setTimeout(() => setPresent(false), 1800);
    return () => window.clearTimeout(timer);
  }, []);

  if (!present) return null;

  return (
    <div
      className="ankur-splash fixed inset-0 z-[100] flex flex-col items-center justify-center gap-6 bg-surface"
      // Decorative: the landing page behind it carries the real content and
      // heading, so this should not be announced or focusable.
      aria-hidden="true"
    >
      <svg
        width="132"
        height="132"
        viewBox="0 0 256 256"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <linearGradient id="splash-leaf" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#7CC67B" />
            <stop offset="1" stopColor="#2E7D32" />
          </linearGradient>
        </defs>

        {/* Soil settles first */}
        <path
          className="ankur-soil"
          pathLength={1}
          d="M78 182 Q128 168 178 182"
          stroke="var(--primary)"
          strokeWidth={9}
          strokeLinecap="round"
          opacity={0.35}
        />
        {/* Then the stem rises */}
        <path
          className="ankur-stem"
          pathLength={1}
          d="M128 182 C128 150 128 132 128 96"
          stroke="var(--primary)"
          strokeWidth={10}
          strokeLinecap="round"
        />
        {/* Then the leaves unfold, left before right */}
        <path
          className="ankur-leaf ankur-leaf-left"
          d="M128 128 C104 132 82 118 74 92 C102 86 124 100 128 128 Z"
          fill="url(#splash-leaf)"
        />
        <path
          className="ankur-leaf ankur-leaf-right"
          d="M128 116 C150 104 168 74 162 44 C132 52 118 82 128 116 Z"
          fill="url(#splash-leaf)"
        />
        {/* Veins last, as a settling detail */}
        <path
          className="ankur-vein"
          d="M128 126 C112 122 98 112 86 98"
          stroke="var(--surface)"
          strokeWidth={3}
          strokeLinecap="round"
          opacity={0.55}
        />
        <path
          className="ankur-vein"
          d="M128 114 C138 98 146 76 150 56"
          stroke="var(--surface)"
          strokeWidth={3}
          strokeLinecap="round"
          opacity={0.55}
        />
      </svg>

      <div className="ankur-splash-word text-center">
        <p className="text-2xl font-bold tracking-tight text-on-surface">
          अंकुर <span className="font-semibold opacity-70">Ankur</span>
        </p>
        <p className="mt-1 text-sm text-on-surface-variant">हर बच्चा, स्वस्थ विकास</p>
      </div>
    </div>
  );
}
