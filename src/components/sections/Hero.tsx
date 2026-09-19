'use client'

import { useState } from 'react'
import { useTranslations, useLocale } from 'next-intl'

type SearchFilters = {
  location: string
  type: string
  status: string
}

export default function Hero() {
  const t = useTranslations('hero')
  const locale = useLocale()
  const [filters, setFilters] = useState<SearchFilters>({
    location: '',
    type: '',
    status: '',
  })

  function handleSearch(e: React.FormEvent) {
    e.preventDefault()
    window.dispatchEvent(new CustomEvent('hero-search', { detail: filters }))
    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section
      id="hero"
      aria-label="Hero — EMPLD Residence"
      className="relative flex flex-col bg-[var(--color-basalt)] overflow-hidden"
      style={{ height: 'clamp(540px, 75vh, 820px)' }}
    >
      {/* ── Full-bleed autoplay looping video ── */}
      <div className="absolute inset-0 z-0">
        <video
          src="/videos/EMPL_Autorun.mp4"
          autoPlay
          loop
          muted
          playsInline
          preload="auto"
          aria-hidden="true"
          className="w-full h-full object-cover object-center"
        />
        {/* Gradient overlay for readability */}
        <div
          aria-hidden="true"
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to top, rgba(18,19,22,0.88) 0%, rgba(18,19,22,0.25) 50%, rgba(18,19,22,0.15) 100%)',
          }}
        />
      </div>

      {/* ── Centre headline — 2 lines ── */}
      <div className="relative z-10 flex-1 flex items-center justify-center px-4">
        <h1
          className="text-white text-center leading-tight select-none"
          style={{
            fontSize: 'clamp(2.2rem, 5.5vw, 4.5rem)',
            fontWeight: 900,
            fontFamily: locale === 'bn' ? 'var(--font-bangla)' : 'var(--font-sans)',
            letterSpacing: locale === 'bn' ? '0' : '-0.03em',
          }}
        >
          <span className="block">{t('heroLine1')}</span>
          <span className="block">{t('heroLine2')}</span>
        </h1>
      </div>

      {/* ── Search bar — pinned to bottom ── */}
      <div className="relative z-10 section-container pb-14">
        <form onSubmit={handleSearch} aria-label="Search properties">
          <div className="flex flex-col sm:flex-row bg-white shadow-2xl overflow-hidden">

            {/* Location */}
            <div className="flex-1 border-b sm:border-b-0 sm:border-r border-[var(--color-hairline)]">
              <label
                className="block px-5 pt-3.5 pb-0.5 type-label-code text-[var(--color-slate)]"
                style={{ fontSize: '9px' }}
              >
                LOCATION
              </label>
              <select
                value={filters.location}
                onChange={(e) => setFilters((f) => ({ ...f, location: e.target.value }))}
                className="w-full px-5 pb-3.5 pt-0.5 bg-transparent text-[var(--color-on-surface)] type-body-sm font-medium appearance-none focus:outline-none cursor-pointer"
              >
                <option value="">All Locations</option>
                <option value="dhaka">Dhaka</option>
                <option value="chattogram">Chattogram</option>
                <option value="sylhet">Sylhet</option>
              </select>
            </div>

            {/* Property Type */}
            <div className="flex-1 border-b sm:border-b-0 sm:border-r border-[var(--color-hairline)]">
              <label
                className="block px-5 pt-3.5 pb-0.5 type-label-code text-[var(--color-slate)]"
                style={{ fontSize: '9px' }}
              >
                PROPERTY TYPE
              </label>
              <select
                value={filters.type}
                onChange={(e) => setFilters((f) => ({ ...f, type: e.target.value }))}
                className="w-full px-5 pb-3.5 pt-0.5 bg-transparent text-[var(--color-on-surface)] type-body-sm font-medium appearance-none focus:outline-none cursor-pointer"
              >
                <option value="">All Types</option>
                <option value="residence">Luxury Residence</option>
                <option value="duplex">Duplex Penthouse</option>
                <option value="commercial">Grade-A Commercial</option>
              </select>
            </div>

            {/* Status */}
            <div className="flex-1">
              <label
                className="block px-5 pt-3.5 pb-0.5 type-label-code text-[var(--color-slate)]"
                style={{ fontSize: '9px' }}
              >
                STATUS
              </label>
              <select
                value={filters.status}
                onChange={(e) => setFilters((f) => ({ ...f, status: e.target.value }))}
                className="w-full px-5 pb-3.5 pt-0.5 bg-transparent text-[var(--color-on-surface)] type-body-sm font-medium appearance-none focus:outline-none cursor-pointer"
              >
                <option value="">Any Status</option>
                <option value="ongoing">Under Construction</option>
                <option value="finishing">Finishing</option>
                <option value="completed">Completed</option>
                <option value="upcoming">Upcoming</option>
              </select>
            </div>

            {/* Search button */}
            <button
              type="submit"
              className="flex items-center justify-center gap-2.5 bg-[var(--color-terracotta)] hover:bg-[var(--color-terracotta-dark)] text-white px-10 type-label-caps transition-colors shrink-0 min-h-[64px]"
            >
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="11" cy="11" r="8" stroke="currentColor" strokeWidth="2"/>
                <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
              Search
            </button>
          </div>
        </form>
      </div>
    </section>
  )
}
