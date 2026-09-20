'use client'

import { useState, useMemo, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { projects } from '@/data/projects'
import { ProjectCard } from '@/components/ui/ProjectCard'
import type { District, ProjectType, ProjectStatus } from '@/types/project'

type View = 'list' | 'map'

interface Filters {
  location: District | 'all'
  type: ProjectType | 'all'
  status: ProjectStatus | 'all'
}

const DEFAULT_FILTERS: Filters = {
  location: 'all',
  type: 'all',
  status: 'all',
}

export default function ProjectDiscovery() {
  const t = useTranslations('projects')
  const locale = useLocale() as 'en' | 'bn'

  const [view, setView] = useState<View>('list')
  const [filters, setFilters] = useState<Filters>(DEFAULT_FILTERS)
  const [isFilterSheetOpen, setIsFilterSheetOpen] = useState(false)

  function setFilter<K extends keyof Filters>(key: K, value: Filters[K]) {
    setFilters((prev) => ({ ...prev, [key]: value }))
  }

  // Listen for search events dispatched by the Hero search bar
  useEffect(() => {
    function onHeroSearch(e: Event) {
      const detail = (e as CustomEvent<{ location: string; type: string; status: string }>).detail
      setFilters({
        location: (detail.location as District) || 'all',
        type: (detail.type as ProjectType) || 'all',
        status: (detail.status as ProjectStatus) || 'all',
      })
    }
    window.addEventListener('hero-search', onHeroSearch)
    return () => window.removeEventListener('hero-search', onHeroSearch)
  }, [])

  const filtered = useMemo(() => {
    return projects.filter((p) => {
      if (filters.location !== 'all' && p.district !== filters.location) return false
      if (filters.type !== 'all' && p.type !== filters.type) return false
      if (filters.status !== 'all' && p.status !== filters.status) return false
      return true
    })
  }, [filters])

  // Desktop filter bar
  const filterBar = (
    <div className="bg-white border border-[var(--color-hairline)] p-5 mb-10 shadow-[var(--shadow-architectural)]">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 w-full">
        {/* Location */}
        <div>
          <label className="type-label-code text-[var(--color-slate)] block mb-1.5">
            {t('filterLocation')}
          </label>
          <select
            value={filters.location}
            onChange={(e) => setFilter('location', e.target.value as Filters['location'])}
            className="w-full bg-[var(--color-surface-container-low)] border border-[var(--color-hairline)] text-[var(--color-on-surface)] type-body-sm py-2.5 px-3 focus:border-[var(--color-basalt)] focus:outline-none"
          >
            <option value="all">{t('filterLocationAll')}</option>
            <option value="dhaka">Dhaka</option>
            <option value="chattogram">Chattogram</option>
            <option value="sylhet">Sylhet</option>
          </select>
        </div>

        {/* Type */}
        <div>
          <label className="type-label-code text-[var(--color-slate)] block mb-1.5">
            {t('filterType')}
          </label>
          <select
            value={filters.type}
            onChange={(e) => setFilter('type', e.target.value as Filters['type'])}
            className="w-full bg-[var(--color-surface-container-low)] border border-[var(--color-hairline)] text-[var(--color-on-surface)] type-body-sm py-2.5 px-3 focus:border-[var(--color-basalt)] focus:outline-none"
          >
            <option value="all">{t('filterTypeAll')}</option>
            <option value="residence">{t('filterTypeResidence')}</option>
            <option value="duplex">{t('filterTypeDuplex')}</option>
            <option value="commercial">{t('filterTypeCommercial')}</option>
          </select>
        </div>

        {/* Status */}
        <div>
          <label className="type-label-code text-[var(--color-slate)] block mb-1.5">
            {t('filterStatus')}
          </label>
          <select
            value={filters.status}
            onChange={(e) => setFilter('status', e.target.value as Filters['status'])}
            className="w-full bg-[var(--color-surface-container-low)] border border-[var(--color-hairline)] text-[var(--color-on-surface)] type-body-sm py-2.5 px-3 focus:border-[var(--color-basalt)] focus:outline-none"
          >
            <option value="all">{t('filterStatusAll')}</option>
            <option value="ongoing">{t('filterStatusOngoing')}</option>
            <option value="upcoming">{t('filterStatusUpcoming')}</option>
            <option value="completed">{t('filterStatusCompleted')}</option>
          </select>
        </div>
      </div>
    </div>
  )

  return (
    <section
      id="projects"
      aria-labelledby="projects-heading"
      className="bg-[var(--color-surface-container-low)] border-b border-[var(--color-hairline)] py-[var(--spacing-2xl)]"
    >
      <div className="section-container">
        {/* Header + view toggle */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 pb-6 border-b border-[var(--color-hairline)] gap-4">
          <div>
            <p className="type-label-code text-[var(--color-slate)]">{t('eyebrow')}</p>
            <h2 id="projects-heading" className="type-headline-xl text-[var(--color-basalt)] mt-2">
              {t('heading')}
            </h2>
          </div>

          <div className="flex items-center gap-3">
            {/* Mobile: open filter sheet */}
            <button
              className="sm:hidden type-label-caps border border-[var(--color-hairline)] px-4 py-2 text-[var(--color-basalt)] hover:bg-[var(--color-surface-low)] transition-colors"
              onClick={() => setIsFilterSheetOpen(true)}
              aria-expanded={isFilterSheetOpen}
              aria-controls="filter-sheet"
            >
              {t('filtersCta')}
            </button>

            {/* List / Map toggle */}
            <div
              className="flex border border-[var(--color-hairline)] bg-white"
              role="group"
              aria-label="View toggle"
            >
              <button
                onClick={() => setView('list')}
                aria-pressed={view === 'list'}
                className={`type-label-code px-4 py-2 transition-colors ${
                  view === 'list'
                    ? 'bg-[var(--color-basalt)] text-white'
                    : 'text-[var(--color-slate)] hover:text-[var(--color-basalt)]'
                }`}
              >
                {t('viewList')}
              </button>
              <button
                onClick={() => setView('map')}
                aria-pressed={view === 'map'}
                className={`type-label-code px-4 py-2 transition-colors ${
                  view === 'map'
                    ? 'bg-[var(--color-basalt)] text-white'
                    : 'text-[var(--color-slate)] hover:text-[var(--color-basalt)]'
                }`}
              >
                {t('viewMap')}
              </button>
            </div>
          </div>
        </div>

        {/* Desktop filters */}
        <div className="hidden sm:block">{filterBar}</div>

        {/* Accessible live result count */}
        <p
          className="type-label-code text-[var(--color-slate)] mb-6"
          aria-live="polite"
          aria-atomic="true"
        >
          {t('resultCount', { count: filtered.length })}
        </p>

        {/* List view */}
        {view === 'list' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filtered.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
            {filtered.length === 0 && (
              <p className="col-span-full type-body-md text-[var(--color-slate)] py-12 text-center">
                No projects match your filters.
              </p>
            )}
          </div>
        )}

        {/* Static map view — ready for a map provider without breaking the layout */}
        {view === 'map' && (
          <div className="grid grid-cols-1 lg:grid-cols-[1.35fr_1fr] gap-6 items-stretch">
            <div
              className="relative min-h-[420px] overflow-hidden border border-[var(--color-hairline)] bg-[#e8eee9] p-4 sm:p-6"
              aria-label="Map view — project locations in Bangladesh"
            >
              <div className="absolute inset-0 opacity-70" aria-hidden="true">
                <svg viewBox="0 0 800 500" className="h-full w-full" preserveAspectRatio="none">
                  <defs>
                    <pattern id="map-grid" width="48" height="48" patternUnits="userSpaceOnUse">
                      <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#cbd8ce" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="800" height="500" fill="url(#map-grid)" />
                  <path d="M115 0 C220 95 170 150 260 220 S330 380 285 500" fill="none" stroke="#b4cfc7" strokeWidth="22" opacity=".55" />
                  <path d="M520 0 C470 100 575 145 500 245 S590 385 535 500" fill="none" stroke="#b4cfc7" strokeWidth="17" opacity=".5" />
                  <path d="M0 330 C155 290 215 360 360 315 S615 270 800 325" fill="none" stroke="#c0d9d0" strokeWidth="12" opacity=".7" />
                  <path d="M80 75 L690 75 M80 420 L700 420" stroke="#d2ddd4" strokeWidth="2" strokeDasharray="8 12" />
                </svg>
              </div>
              <div className="relative z-10 flex items-start justify-between">
                <div>
                  <p className="type-label-code text-[var(--color-terracotta)]">{t('viewMap')}</p>
                  <p className="type-body-sm text-[var(--color-slate)] mt-1 max-w-xs">{t('mapPlaceholder')}</p>
                </div>
                <span className="type-label-code bg-white/80 px-2.5 py-1 text-[var(--color-slate)]">
                  {filtered.length} {locale === 'bn' ? 'টি' : 'sites'}
                </span>
              </div>
              {filtered.filter((p) => p.mapCoords).map((project, index) => {
                const positions = [
                  { left: '36%', top: '35%' },
                  { left: '48%', top: '28%' },
                  { left: '72%', top: '62%' },
                  { left: '31%', top: '49%' },
                ]
                const position = positions[index % positions.length]
                return (
                  <div
                    key={project.id}
                    className="absolute z-10 -translate-x-1/2 -translate-y-1/2"
                    style={position}
                    title={project.title[locale]}
                  >
                    <span className="flex h-8 w-8 items-center justify-center rounded-full border-4 border-white bg-[var(--color-terracotta)] text-[10px] font-bold text-white shadow-lg">
                      {index + 1}
                    </span>
                  </div>
                )
              })}
              <div className="absolute bottom-4 left-4 right-4 z-10 flex items-center gap-2 bg-white/85 px-3 py-2 backdrop-blur-sm">
                <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-terracotta)]" />
                <span className="type-label-code text-[var(--color-slate)]">{t('viewMap')}</span>
              </div>
            </div>

            <ul className="grid content-start gap-3" aria-label="Project locations">
              {filtered.filter((p) => p.mapCoords).map((p, index) => (
                <li key={p.id} className="border border-[var(--color-hairline)] bg-white p-4 shadow-[var(--shadow-architectural)]">
                  <div className="flex items-start gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-[var(--color-basalt)] text-xs font-bold text-white">
                      {index + 1}
                    </span>
                    <div className="min-w-0">
                      <p className="type-headline-md text-[var(--color-basalt)]">{p.title[locale]}</p>
                      <p className="type-body-sm mt-1 text-[var(--color-slate)]">{p.location[locale]}</p>
                      {p.mapCoords && (
                        <p className="type-label-code mt-2 text-[var(--color-slate)]">
                          {p.mapCoords[0].toFixed(4)}, {p.mapCoords[1].toFixed(4)}
                        </p>
                      )}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>

      {/* Mobile bottom-sheet filter */}
      {isFilterSheetOpen && (
        <div
          id="filter-sheet"
          className="fixed inset-0 z-50 flex flex-col justify-end sm:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Filters"
        >
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setIsFilterSheetOpen(false)}
            aria-hidden="true"
          />
          {/* Sheet */}
          <div className="relative bg-white p-6 space-y-5 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between mb-2">
              <p className="type-headline-md text-[var(--color-basalt)]">Filters</p>
              <button
                onClick={() => setIsFilterSheetOpen(false)}
                aria-label={t('filtersClose')}
                className="type-label-code text-[var(--color-slate)] p-2"
              >
                ✕
              </button>
            </div>
            {filterBar}
            <button
              onClick={() => setIsFilterSheetOpen(false)}
              className="w-full bg-[var(--color-basalt)] text-white type-label-caps py-4 mt-4"
            >
              {t('filtersApply')}
            </button>
          </div>
        </div>
      )}
    </section>
  )
}
