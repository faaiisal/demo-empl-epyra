'use client'

import { usePathname, useRouter } from '@/i18n/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { useTransition } from 'react'

export function LanguageToggle() {
  const locale = useLocale()
  const router = useRouter()
  const pathname = usePathname()
  const t = useTranslations('nav')
  const [isPending, startTransition] = useTransition()

  function toggleLocale() {
    const nextLocale = locale === 'en' ? 'bn' : 'en'
    startTransition(() => {
      router.replace(pathname, { locale: nextLocale })
    })
  }

  return (
    <button
      onClick={toggleLocale}
      disabled={isPending}
      aria-label={`Switch to ${locale === 'en' ? 'Bangla' : 'English'}`}
      className="flex items-center gap-1.5 border border-white/20 px-3 py-1 type-label-code text-white/80 hover:border-white/60 hover:text-white transition-colors duration-150 disabled:opacity-50"
    >
      <span className={locale === 'en' ? 'text-white font-bold' : 'text-white/50'}>EN</span>
      <span className="text-white/30">|</span>
      <span className={locale === 'bn' ? 'text-white font-bold' : 'text-white/50'}>বাং</span>
    </button>
  )
}
