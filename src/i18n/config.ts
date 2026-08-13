export const locales = ['en', 'hi', 'mr', 'gu'] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = 'hi';

export function isLocale(value: unknown): value is Locale {
  return typeof value === 'string' && (locales as readonly string[]).includes(value);
}

/**
 * Dynamically import the message bundle for a locale.
 * Only the active locale is loaded, so the other three never ship to the client.
 */
export async function getMessages(locale: Locale) {
  return (await import(`../../messages/${locale}.json`)).default;
}
