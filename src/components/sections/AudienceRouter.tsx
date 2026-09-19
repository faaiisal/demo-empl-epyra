'use client'

import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/Button'
import React from 'react'

const CARDS = [
  {
    num: '01',
    titleKey: 'card1Title' as const,
    bodyKey: 'card1Body' as const,
    ctaKey: 'card1Cta' as const,
    href: '#projects',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" strokeWidth="1.5" stroke="currentColor">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    dark: false,
  },
  {
    num: '02',
    titleKey: 'card2Title' as const,
    bodyKey: 'card2Body' as const,
    ctaKey: 'card2Cta' as const,
    href: '#contact',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" strokeWidth="1.5" stroke="currentColor">
        <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    dark: false,
  },
  {
    num: '03',
    titleKey: 'card3Title' as const,
    bodyKey: 'card3Body' as const,
    ctaKey: 'card3Cta' as const,
    href: '#trust',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" strokeWidth="1.5" stroke="currentColor">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2M9 11a4 4 0 100-8 4 4 0 000 8zM23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    dark: true, // terracotta highlight
  },
  {
    num: '04',
    titleKey: 'card4Title' as const,
    bodyKey: 'card4Body' as const,
    ctaKey: 'card4Cta' as const,
    href: '#contact',
    icon: (
      <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true" strokeWidth="1.5" stroke="currentColor">
        <rect x="2" y="7" width="20" height="14" rx="0" strokeLinejoin="round"/>
        <path d="M16 7V5a2 2 0 00-2-2h-4a2 2 0 00-2 2v2M12 12v4M10 14h4" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
    dark: false,
  },
] as const

export default function AudienceRouter() {
  const t = useTranslations('audience')

  return (
    <section
      id="audience"
      aria-labelledby="audience-heading"
      className="bg-white border-b border-[var(--color-hairline)] py-[var(--spacing-2xl)]"
    >
      <div className="section-container">
        {/* Header */}
        <header className="mb-14">
          <p className="type-label-code text-[var(--color-terracotta)] mb-2">{t('eyebrow')}</p>
          <h2 id="audience-heading" className="type-headline-xl text-[var(--color-basalt)]">
            {t('heading')}
          </h2>
        </header>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {CARDS.map((card) => (
            <article
              key={card.num}
              className={`group flex flex-col gap-5 p-7 border transition-all duration-200 ${
                card.dark
                  ? 'bg-[var(--color-basalt)] border-[var(--color-basalt)] text-white'
                  : 'bg-[var(--color-surface-low)] border-[var(--color-hairline)] hover:border-[var(--color-basalt)]/30 hover:shadow-md'
              }`}
            >
              {/* Number */}
              <span
                className={`type-label-code ${card.dark ? 'text-[var(--color-terracotta)]' : 'text-[var(--color-slate)]'}`}
                style={{ fontSize: '11px' }}
              >
                {card.num}
              </span>

              {/* Icon */}
              <div className={card.dark ? 'text-[var(--color-terracotta)]' : 'text-[var(--color-slate)]'}>
                {card.icon}
              </div>

              {/* Content */}
              <div className="flex flex-col gap-2 flex-1">
                <h3 className={`type-headline-md ${card.dark ? 'text-white' : 'text-[var(--color-basalt)]'}`}>
                  {t(card.titleKey)}
                </h3>
                <p className={`type-body-sm leading-relaxed ${card.dark ? 'text-white/65' : 'text-[var(--color-slate)]'}`}>
                  {t(card.bodyKey)}
                </p>
              </div>

              {/* CTA */}
              <a
                href={card.href}
                className={`inline-flex items-center gap-2 type-label-caps mt-auto transition-colors ${
                  card.dark
                    ? 'text-[var(--color-terracotta)] hover:text-white'
                    : 'text-[var(--color-basalt)] hover:text-[var(--color-terracotta)]'
                }`}
              >
                {t(card.ctaKey)}
                <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden="true">
                  <path d="M1 9L9 1M9 1H3M9 1V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </a>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
