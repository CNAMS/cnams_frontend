import React from 'react';
import { notFound } from 'next/navigation';
import { getCentreById, mockCentres } from '@/data/mockData';
import CentreDetail from './CentreDetail';

/**
 * Server shell for the centre drill-down.
 *
 * This exists so notFound() runs on the SERVER. Previously the whole route was
 * a client component, so an unknown id resolved after hydration: the user saw
 * the branded 404 but the response had already gone out as HTTP 200. Crawlers,
 * uptime checks and anything reading status codes were told a nonexistent
 * centre exists.
 *
 * The split is the standard fix — a server component resolves the record and
 * decides whether it exists, and a client child renders it with the hooks it
 * needs (translations, role theming). It also means the lookup no longer ships
 * to the browser.
 */

export function generateStaticParams() {
  return mockCentres.map((c) => ({ id: c.id }));
}

/**
 * Any id not returned by generateStaticParams is a real 404, decided by the
 * router before this component runs.
 *
 * This is load-bearing, not a micro-optimisation. With the default
 * (dynamicParams: true) Next renders an unknown id on demand, and the
 * notFound() below gets rendered and then CACHED as a 200 — verified against a
 * production server: `x-nextjs-cache: HIT`, `s-maxage=31536000`, status 200 for
 * /centres/does-not-exist. So the wrong status was not only served, it was
 * served from cache for a year.
 *
 * The centre list is a known finite set here because it is a static import.
 * When a real API replaces it this must flip back to true, and the notFound()
 * below becomes the mechanism again — it is kept for exactly that reason.
 */
export const dynamicParams = false;

export default function CentreDetailPage({ params }: { params: { id: string } }) {
  const centre = getCentreById(params.id);
  if (!centre) notFound();

  return <CentreDetail centre={centre} />;
}
