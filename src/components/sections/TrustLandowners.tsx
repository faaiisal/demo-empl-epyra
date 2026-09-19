'use client'

import { useTranslations, useLocale } from 'next-intl'
import { Button } from '@/components/ui/Button'
import { partners, testimonials } from '@/data/partners'

export default function TrustLandowners() {
  const t = useTranslations('trust')
  const locale = useLocale() as 'en' | 'bn'

  return (
    <section
      id="trust"
      aria-labelledby="trust-heading"
      className="bg-[var(--color-surface-low)] border-b border-[var(--color-hairline)] py-[var(--spacing-2xl)]"
    >
      <div className="section-container space-y-20">

        {/* ── Approvals & Partners ── */}
        <div>
          <p className="type-label-code text-[var(--color-slate)] mb-8">{t('eyebrow')}</p>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-px bg-[var(--color-hairline)] border border-[var(--color-hairline)]">
            {partners.map((partner) => (
              <div
                key={partner.id}
                className="bg-white hover:bg-[var(--color-basalt)] group transition-colors duration-250 p-6 flex flex-col gap-3"
              >
                {/* Acronym badge */}
                <span
                  className="inline-block type-label-code text-[var(--color-terracotta)] group-hover:text-[var(--color-terracotta)] border border-[var(--color-terracotta)]/30 group-hover:border-[var(--color-terracotta)]/50 px-2 py-0.5 self-start"
                  style={{ fontSize: '9px' }}
                >
                  {partner.acronym}
                </span>
                {/* Full name */}
                <p className="type-body-sm font-medium text-[var(--color-basalt)] group-hover:text-white leading-snug transition-colors duration-250">
                  {partner.name}
                </p>
                {/* Description */}
                <p className="type-label-code text-[var(--color-slate)] group-hover:text-white/50 transition-colors duration-250" style={{ fontSize: '9px' }}>
                  {partner.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* ── Testimonials ── */}
        <div>
          <h2 id="trust-heading" className="type-headline-xl text-[var(--color-basalt)] mb-10">
            {t('testimonialsHeading')}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {testimonials.map((item) => (
              <blockquote
                key={item.id}
                className="bg-[var(--color-basalt)] p-8 md:p-10 flex flex-col gap-6"
              >
                {/* Large quote mark */}
                <span
                  className="text-[var(--color-terracotta)] leading-none select-none"
                  style={{ fontSize: '4rem', fontFamily: 'Georgia, serif', lineHeight: 1 }}
                  aria-hidden="true"
                >
                  "
                </span>
                <p className="type-body-lg text-white/80 leading-relaxed -mt-4">
                  {item.quote[locale]}
                </p>
                <footer className="flex items-center gap-4 mt-auto pt-4 border-t border-white/10">
                  {/* Initials avatar */}
                  <div
                    className="w-10 h-10 rounded-full bg-[var(--color-terracotta)]/20 border border-[var(--color-terracotta)]/30 flex items-center justify-center shrink-0"
                    aria-hidden="true"
                  >
                    <span className="type-label-code text-[var(--color-terracotta)]" style={{ fontSize: '10px' }}>
                      {item.initials}
                    </span>
                  </div>
                  <div>
                    <p className="type-label-caps text-white">{item.author}</p>
                    <p className="type-body-sm text-white/45 mt-0.5">{item.role[locale]}</p>
                  </div>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>

        {/* ── Landowner CTA ── */}
        <div className="border border-[var(--color-hairline)] bg-[var(--color-basalt)] p-8 md:p-12">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
            <div className="space-y-3">
              <p className="type-label-code text-[var(--color-terracotta)]">{t('landownerEyebrow')}</p>
              <h3 className="type-headline-lg text-white">{t('landownerHeading')}</h3>
              <p className="type-body-md text-white/65 leading-relaxed">{t('landownerBody')}</p>
            </div>
            <div className="flex items-center md:justify-end">
              <Button as="a" href="#contact" variant="accent" size="lg">
                {t('landownerCta')}
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M2 10L10 2M10 2H4M10 2V8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </Button>
            </div>
          </div>
        </div>

      </div>
    </section>
  )
}
