import type { Metadata } from 'next'
import { NextIntlClientProvider } from 'next-intl'
import { getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import '@/app/globals.css'

type Props = {
  children: React.ReactNode
  params: Promise<{ locale: string }>
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params
  const t = await getTranslations({ locale, namespace: 'meta' })
  return {
    title: t('title'),
    description: t('description'),
    metadataBase: new URL('https://empld.com'), // TODO: verify domain
    openGraph: {
      title: t('title'),
      description: t('description'),
      type: 'website',
      locale: locale === 'bn' ? 'bn_BD' : 'en_GB',
    },
  }
}

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }))
}

export default async function LocaleLayout({ children, params }: Props) {
  const { locale } = await params

  if (!routing.locales.includes(locale as 'en' | 'bn')) {
    notFound()
  }

  setRequestLocale(locale)
  const messages = (await import(`@/i18n/messages/${locale}.json`)).default

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      <div className={locale === 'bn' ? 'locale-bn' : 'locale-en'}>
          {/* Skip to main content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-terracotta focus:text-white focus:px-4 focus:py-2"
          >
            {locale === 'bn' ? 'মূল বিষয়বস্তুতে যান' : 'Skip to main content'}
          </a>
          {children}
      </div>
    </NextIntlClientProvider>
  )
}
