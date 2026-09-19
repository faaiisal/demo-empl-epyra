'use client'

import { useState, useEffect } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { LanguageToggle } from '@/components/ui/LanguageToggle'
import { Button } from '@/components/ui/Button'
import { cn } from '@/lib/cn'

const NAV_KEYS = ['projects', 'landowners', 'engineering', 'progress', 'contact'] as const
type NavKey = typeof NAV_KEYS[number]

const NAV_HREFS: Record<NavKey, string> = {
  projects: '#projects',
  landowners: '#trust',
  engineering: '#engineered',
  progress: '#progress',
  contact: '#contact',
}

// Phone number — update before launch
const PHONE_NUMBER = '+880 1XXX-XXXXXX'
const WHATSAPP_NUMBER = '880XXXXXXXXXX'

export default function Header() {
  const t = useTranslations('nav')
  const tMobile = useTranslations('mobileBar')
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    function handleScroll() {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      {/* ── Desktop / tablet header ── */}
      <header
        className={cn(
          'sticky top-0 z-50 bg-[var(--color-basalt)] border-b border-white/10 transition-all duration-200',
          isScrolled && 'shadow-md',
        )}
        role="banner"
      >
        <div className="section-container flex items-center justify-between h-20">
          {/* Wordmark lockup */}
          <Link href="/" aria-label="EMPLD — go to homepage" className="flex items-center gap-2.5 group">
            {/* Terracotta accent bar */}
            <span
              className="w-0.5 h-6 bg-[var(--color-terracotta)] shrink-0"
              aria-hidden="true"
            />
            <div>
              <span
                className="block text-white tracking-[0.2em] font-sans font-bold"
                style={{ fontSize: '15px', letterSpacing: '0.22em' }}
              >
                EMPLD
              </span>
              <span className="hidden sm:block type-label-code text-white/35" style={{ fontSize: '8px', letterSpacing: '0.12em' }}>
                ESTATE MANAGEMENT PARTNERS
              </span>
            </div>
          </Link>

          {/* Desktop nav */}
          <nav aria-label="Primary navigation" className="hidden md:flex items-center gap-8">
            {NAV_KEYS.map((key) => (
              <a
                key={key}
                href={NAV_HREFS[key]}
                className="type-body-sm text-white/70 hover:text-white transition-colors duration-150 tracking-wide"
              >
                {t(key)}
              </a>
            ))}
          </nav>

          {/* Right controls */}
          <div className="flex items-center gap-4">
            <LanguageToggle />
            <Button
              as="a"
              href="#contact"
              variant="accent"
              size="sm"
              className="hidden sm:inline-flex"
            >
              {t('bookVisit')}
              <svg
                aria-hidden="true"
                width="12"
                height="12"
                viewBox="0 0 12 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M2 10L10 2M10 2H4M10 2V8"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </Button>

            {/* Mobile menu toggle */}
            <button
              className="md:hidden text-white/80 hover:text-white p-2"
              onClick={() => setIsMenuOpen((v) => !v)}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
              aria-label={isMenuOpen ? t('closeMenu') : t('openMenu')}
            >
              {isMenuOpen ? (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M4 4L16 16M16 4L4 16"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              ) : (
                <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
                  <path
                    d="M3 5h14M3 10h14M3 15h14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              )}
            </button>
          </div>
        </div>

        {/* Mobile drop-down menu */}
        <div
          id="mobile-menu"
          hidden={!isMenuOpen}
          className="md:hidden bg-[var(--color-basalt)] border-t border-white/10"
        >
          <nav aria-label="Mobile navigation" className="section-container py-4 flex flex-col gap-1">
            {NAV_KEYS.map((key) => (
              <a
                key={key}
                href={NAV_HREFS[key]}
                onClick={() => setIsMenuOpen(false)}
                className="type-body-md text-white/80 hover:text-white py-3 border-b border-white/5 transition-colors"
              >
                {t(key)}
              </a>
            ))}
            <Button
              as="a"
              href="#contact"
              variant="accent"
              size="md"
              className="mt-4 justify-center"
              onClick={() => setIsMenuOpen(false)}
            >
              {t('bookVisit')}
            </Button>
          </nav>
        </div>
      </header>

      {/* ── Mobile sticky bottom bar (Call + WhatsApp) ── */}
      {/* Only rendered on small screens — hidden on md+ */}
      <div
        className="fixed bottom-0 inset-x-0 z-50 md:hidden flex border-t border-[var(--color-hairline)] bg-[var(--color-basalt)]"
        aria-label="Quick contact options"
      >
        <a
          href={`tel:${PHONE_NUMBER}`}
          className="flex-1 flex items-center justify-center gap-2 py-4 text-white type-label-caps hover:bg-white/5 transition-colors"
          aria-label={`Call EMPLD: ${PHONE_NUMBER}`}
        >
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M6.62 10.79a15.05 15.05 0 006.59 6.59l2.2-2.2a1 1 0 011.01-.24 11.47 11.47 0 003.59.57 1 1 0 011 1V20a1 1 0 01-1 1A17 17 0 013 4a1 1 0 011-1h3.5a1 1 0 011 1c0 1.25.2 2.45.57 3.57a1 1 0 01-.25 1.03l-2.2 2.19z"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          {tMobile('call')}
        </a>
        <div className="w-px bg-white/10" aria-hidden="true" />
        <a
          href={`https://wa.me/${WHATSAPP_NUMBER}`}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-1 flex items-center justify-center gap-2 py-4 text-white type-label-caps hover:bg-white/5 transition-colors"
          aria-label="Chat with EMPLD on WhatsApp"
        >
          {/* WhatsApp icon */}
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
            <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.541 5.876L0 24l6.306-1.518A11.937 11.937 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.799 9.799 0 01-5.006-1.374l-.359-.214-3.737.979.996-3.642-.234-.374A9.77 9.77 0 012.182 12C2.182 6.572 6.572 2.182 12 2.182S21.818 6.572 21.818 12 17.428 21.818 12 21.818z"/>
          </svg>
          {tMobile('whatsapp')}
        </a>
      </div>
    </>
  )
}
