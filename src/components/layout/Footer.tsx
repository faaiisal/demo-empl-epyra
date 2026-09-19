'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
import { Link } from '@/i18n/navigation'
import { Button } from '@/components/ui/Button'

// TODO: verify contact details before launch
const PHONE_NUMBER = '+880-XXXXXXXXXX'
const WHATSAPP_NUMBER = '880XXXXXXXXXX'

export default function Footer() {
  const t = useTranslations('contact')
  const tFooter = useTranslations('footer')
  const [submitted, setSubmitted] = useState(false)

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    // TODO: wire up real form submission (Formspree, custom API, etc.)
    setSubmitted(true)
  }

  const year = new Date().getFullYear()

  return (
    <footer id="contact" className="bg-[var(--color-basalt)] text-white" role="contentinfo">
      {/* Contact form section */}
      <div className="border-b border-white/10 py-[var(--spacing-2xl)]">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Left — intro */}
            <div className="space-y-6">
              <p className="type-label-code text-[var(--color-terracotta)]">{t('eyebrow')}</p>
              <h2 className="type-headline-xl text-white">{t('heading')}</h2>

              <dl className="space-y-4 type-body-md text-white/65">
                <div>
                  <dt className="type-label-code text-[var(--color-slate)] mb-0.5">Address</dt>
                  <dd>{t('address')}</dd>
                </div>
                <div>
                  <dt className="type-label-code text-[var(--color-slate)] mb-0.5">Phone</dt>
                  <dd>
                    <a href={`tel:${PHONE_NUMBER}`} className="hover:text-white transition-colors">
                      {t('phone')}
                    </a>
                  </dd>
                </div>
                <div>
                  <dt className="type-label-code text-[var(--color-slate)] mb-0.5">Email</dt>
                  <dd>
                    <a href={`mailto:${t('email')}`} className="hover:text-white transition-colors">
                      {t('email')}
                    </a>
                  </dd>
                </div>
              </dl>

              {/* WhatsApp CTA */}
              <a
                href={`https://wa.me/${WHATSAPP_NUMBER}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 border border-white/20 hover:border-white/60 px-5 py-3 type-label-caps text-white/80 hover:text-white transition-colors"
                aria-label="Chat with EMPLD on WhatsApp"
              >
                <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347z"/>
                  <path d="M12 0C5.373 0 0 5.373 0 12c0 2.136.561 4.14 1.541 5.876L0 24l6.306-1.518A11.937 11.937 0 0012 24c6.627 0 12-5.373 12-12S18.627 0 12 0zm0 21.818a9.799 9.799 0 01-5.006-1.374l-.359-.214-3.737.979.996-3.642-.234-.374A9.77 9.77 0 012.182 12C2.182 6.572 6.572 2.182 12 2.182S21.818 6.572 21.818 12 17.428 21.818 12 21.818z"/>
                </svg>
                {t('whatsapp')}
              </a>
            </div>

            {/* Right — contact form */}
            <div>
              {submitted ? (
                <div className="border border-white/10 p-8 text-center space-y-3">
                  <p className="type-headline-md text-white">Thank you</p>
                  <p className="type-body-md text-white/65">We'll be in touch within one working day.</p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div>
                    <label htmlFor="contact-name" className="type-label-code text-[var(--color-slate)] block mb-1.5">
                      Name *
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      required
                      placeholder={t('namePlaceholder')}
                      className="w-full bg-white/5 border border-white/10 focus:border-white/40 text-white placeholder-white/30 type-body-md px-4 py-3 focus:outline-none transition-colors"
                    />
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="contact-phone" className="type-label-code text-[var(--color-slate)] block mb-1.5">
                        Phone
                      </label>
                      <input
                        id="contact-phone"
                        type="tel"
                        placeholder={t('phonePlaceholder')}
                        className="w-full bg-white/5 border border-white/10 focus:border-white/40 text-white placeholder-white/30 type-body-md px-4 py-3 focus:outline-none transition-colors"
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className="type-label-code text-[var(--color-slate)] block mb-1.5">
                        Email
                      </label>
                      <input
                        id="contact-email"
                        type="email"
                        placeholder={t('emailPlaceholder')}
                        className="w-full bg-white/5 border border-white/10 focus:border-white/40 text-white placeholder-white/30 type-body-md px-4 py-3 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-message" className="type-label-code text-[var(--color-slate)] block mb-1.5">
                      Message
                    </label>
                    <textarea
                      id="contact-message"
                      rows={4}
                      placeholder={t('messagePlaceholder')}
                      className="w-full bg-white/5 border border-white/10 focus:border-white/40 text-white placeholder-white/30 type-body-md px-4 py-3 focus:outline-none transition-colors resize-none"
                    />
                  </div>
                  <p className="type-body-sm text-white/40">{t('formDisclaimer')}</p>
                  <Button type="submit" variant="accent" size="lg" className="w-full justify-center">
                    {t('submit')}
                  </Button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Footer nav + legal */}
      <div className="py-12">
        <div className="section-container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-10">
            {/* Brand */}
            <div className="col-span-2 md:col-span-1 space-y-3">
              <p className="type-label-code text-white tracking-[0.25em]">EMPLD</p>
              <p className="type-body-sm text-white/40 leading-relaxed max-w-[200px]">
                {tFooter('tagline')}
              </p>
            </div>

            {/* Company */}
            <div className="space-y-3">
              <p className="type-label-code text-[var(--color-slate)]">{tFooter('company')}</p>
              <nav aria-label="Company links">
                <ul className="space-y-2">
                  {(['about', 'careers', 'press'] as const).map((k) => (
                    <li key={k}>
                      <Link href="/" className="type-body-sm text-white/50 hover:text-white transition-colors">
                        {tFooter(k)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Projects */}
            <div className="space-y-3">
              <p className="type-label-code text-[var(--color-slate)]">{tFooter('projects')}</p>
              <nav aria-label="Project links">
                <ul className="space-y-2">
                  {(['allProjects', 'gulshan', 'baridhara'] as const).map((k) => (
                    <li key={k}>
                      <a href="#projects" className="type-body-sm text-white/50 hover:text-white transition-colors">
                        {tFooter(k)}
                      </a>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>

            {/* Legal */}
            <div className="space-y-3">
              <p className="type-label-code text-[var(--color-slate)]">{tFooter('legal')}</p>
              <nav aria-label="Legal links">
                <ul className="space-y-2">
                  {(['privacy', 'terms'] as const).map((k) => (
                    <li key={k}>
                      <Link href="/" className="type-body-sm text-white/50 hover:text-white transition-colors">
                        {tFooter(k)}
                      </Link>
                    </li>
                  ))}
                </ul>
              </nav>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
            <p className="type-body-sm text-white/30">
              {tFooter('copyright', { year })}
            </p>
            <div className="flex flex-col gap-1">
              <p className="type-label-code text-[9px] text-white/20">{tFooter('rajukNote')}</p>
              <p className="type-label-code text-[9px] text-white/20">{tFooter('bnbc')}</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
