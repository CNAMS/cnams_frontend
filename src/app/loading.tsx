import React from 'react';
import { Skeleton } from '@/components/ui/Feedback';

/**
 * Route-level loading state.
 *
 * Next renders this while a route segment resolves. Without it a navigation on
 * a slow connection shows the previous page frozen with no indication that
 * anything is happening — which on a field connection is the difference
 * between "loading" and "broken", and gets the link tapped again.
 *
 * Deliberately a neutral skeleton rather than a spinner: it reserves roughly
 * the shape every dashboard arrives in (header, tile row, table), so the
 * layout does not jump when the real content lands.
 */
export default function Loading() {
  return (
    <div className="min-h-screen bg-surface p-4 sm:p-6" aria-busy="true">
      {/* Screen readers get a word; the skeletons themselves are decorative. */}
      <span className="sr-only" role="status">
        लोड हो रहा है… Loading…
      </span>

      <div className="max-w-6xl mx-auto space-y-8">
        <div className="space-y-2">
          <Skeleton className="h-7 w-56" />
          <Skeleton className="h-4 w-40" />
        </div>

        <div className="grid gap-3 grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} className="h-28 rounded-2xl" />
          ))}
        </div>

        <Skeleton className="h-64 rounded-2xl" />
      </div>
    </div>
  );
}
