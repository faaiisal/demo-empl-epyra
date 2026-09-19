import type { Metadata } from 'next'
import { Newsreader, Plus_Jakarta_Sans, Space_Mono, Noto_Sans_Bengali } from 'next/font/google'
import { NextIntlClientProvider } from 'next-intl'
import { getMessages, getTranslations, setRequestLocale } from 'next-intl/server'
import { routing } from '@/i18n/routing'
import { notFound } from 'next/navigation'
import '@/app/globals.css'

const newsreader = Newsreader({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600'],
  style: ['normal', 'italic'],
  variable: '--loaded-font-serif',
  display: 'swap',
  preload: true,
})

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--loaded-font-sans',
  display: 'swap',
  preload: true,
})

const spaceMono = Space_Mono({
  subsets: ['latin'],
  weight: ['400', '700'],
  style: ['normal', 'italic'],
  variable: '--loaded-font-mono',
  display: 'swap',
})

const notoSansBengali = Noto_Sans_Bengali({
  subsets: ['bengali'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--loaded-font-bangla',
  display: 'swap',
})

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
  const messages = await getMessages()

  const fontVars = [
    newsreader.variable,
    plusJakartaSans.variable,
    spaceMono.variable,
    notoSansBengali.variable,
  ].join(' ')

  return (
    <html lang={locale} className={fontVars}>
      <head>
        {/* Preconnect for performance */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        <NextIntlClientProvider messages={messages}>
          {/* Skip to main content for accessibility */}
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[100] focus:bg-terracotta focus:text-white focus:px-4 focus:py-2"
          >
            {locale === 'bn' ? 'মূল বিষয়বস্তুতে যান' : 'Skip to main content'}
          </a>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  )
}
