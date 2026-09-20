'use client'

import { useLocale, useTranslations } from 'next-intl'

export function LanguageToggle() {
  const locale = useLocale()
  const t = useTranslations('nav')

  function toggleLocale() {
    const nextLocale = locale === 'en' ? 'bn' : 'en'
    const pathname = window.location.pathname.replace(/^\/(?:en|bn)(?=\/|$)/, '') || '/'
    const search = window.location.search
    const hash = window.location.hash
    window.location.assign(`/${nextLocale}${pathname === '/' ? '' : pathname}${search}${hash}`)
  }

  return (
    <button
      onClick={toggleLocale}
      aria-label={`Switch to ${locale === 'en' ? 'Bangla' : 'English'}`}
      className="flex items-center gap-1.5 border border-white/20 px-3 py-1 type-label-code text-white/80 hover:border-white/60 hover:text-white transition-colors duration-150 disabled:opacity-50"
    >
      <span className={locale === 'en' ? 'text-white font-bold' : 'text-white/50'}>EN</span>
      <span className="text-white/30">|</span>
      <span className={locale === 'bn' ? 'text-white font-bold' : 'text-white/50'}>বাং</span>
    </button>
  )
}
