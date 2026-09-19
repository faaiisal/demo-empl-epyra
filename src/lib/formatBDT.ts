/**
 * Format a BDT price in crore.
 * en: "৳18.5 Cr"
 * bn: "৳১৮.৫ কোটি"
 */
export function formatBDT(crore: number, locale: 'en' | 'bn'): string {
  if (locale === 'bn') {
    // Convert to Bangla numerals via Intl
    const formatted = new Intl.NumberFormat('bn-BD', {
      maximumFractionDigits: 1,
      minimumFractionDigits: 0,
    }).format(crore)
    return `৳${formatted} কোটি`
  }
  const formatted = new Intl.NumberFormat('en-IN', {
    maximumFractionDigits: 1,
    minimumFractionDigits: 0,
  }).format(crore)
  return `৳${formatted} Cr`
}
