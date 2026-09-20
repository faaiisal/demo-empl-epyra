import { Newsreader, Plus_Jakarta_Sans, Space_Mono, Noto_Sans_Bengali } from 'next/font/google'
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

export default function RootLayout({ children }: { children: React.ReactNode }) {
  const fontVars = [
    newsreader.variable,
    plusJakartaSans.variable,
    spaceMono.variable,
    notoSansBengali.variable,
  ].join(' ')

  return (
    <html lang="en" className={fontVars} suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>{children}</body>
    </html>
  )
}
