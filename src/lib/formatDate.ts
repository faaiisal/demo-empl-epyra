/**
 * Format an ISO date string to a locale-appropriate human date.
 * en: "1 September 2026"
 * bn: "১ সেপ্টেম্বর ২০২৬"
 */
export function formatDate(isoDate: string, locale: 'en' | 'bn'): string {
  const date = new Date(isoDate)
  return new Intl.DateTimeFormat(locale === 'bn' ? 'bn-BD' : 'en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).format(date)
}
