'use client'

import { useState, useMemo, useEffect } from 'react'
import { useTranslations, useLocale } from 'next-intl'
import { projects } from '@/data/projects'
import { ProjectCard } from '@/components/ui/ProjectCard'
import type { District, ProjectType, BudgetBracket, ProjectStatus } from '@/types/project'

type View = 'list' | 'map'

interface Filters {
  location: District | 'all'
  type: ProjectType | 'all'
  budget: BudgetBracket | 'all'
  status: ProjectStatus | 'all'
}

const DEFAULT_FILTERS: Filters = {
  location: 'all',
  type: 'all',
  budget: 'all',
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
        budget: 'all',
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
      if (filters.budget !== 'all' && p.budgetBracket !== filters.budget) return false
      if (filters.status !== 'all' && p.status !== filters.status) return false
      return true
    })
  }, [filters])

  // Desktop filter bar
  const filterBar = (
    <div className="bg-white border border-[var(--color-hairline)] p-5 mb-10 shadow-[var(--shadow-architectural)]">
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
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

        {/* Budget */}
        <div>
          <label className="type-label-code text-[var(--color-slate)] block mb-1.5">
            {t('filterBudget')}
          </label>
          <select
            value={filters.budget}
            onChange={(e) => setFilter('budget', e.target.value as Filters['budget'])}
            className="w-full bg-[var(--color-surface-container-low)] border border-[var(--color-hairline)] text-[var(--color-on-surface)] type-body-sm py-2.5 px-3 focus:border-[var(--color-basalt)] focus:outline-none"
          >
            <option value="all">{t('filterBudgetAll')}</option>
            <option value="5-10">৳5 Cr – ৳10 Cr</option>
            <option value="10-25">৳10 Cr – ৳25 Cr</option>
            <option value="25+">৳25 Cr+</option>
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

        {/* Map view — placeholder for map provider integration */}
        {view === 'map' && (
          <div
            className="border border-[var(--color-hairline)] bg-[var(--color-surface-low)] flex items-center justify-center min-h-[480px] text-center p-8"
            aria-label="Map view — project locations in Bangladesh"
          >
            <div className="space-y-3">
              <p className="type-headline-md text-[var(--color-basalt)]">Map view</p>
              <p className="type-body-md text-[var(--color-slate)] max-w-sm">
                {t('mapPlaceholder')}
              </p>
              <p className="type-label-code text-[var(--color-terracotta)] text-[9px]">
                [TODO: Wire up Leaflet / Mapbox map provider]
              </p>
              {/* Project coordinate list for screen readers */}
              <ul className="mt-6 text-left space-y-2 max-w-xs mx-auto" aria-label="Project locations">
                {filtered.filter(p => p.mapCoords).map((p) => (
                  <li key={p.id} className="type-body-sm text-[var(--color-on-surface-variant)]">
                    <span className="font-medium text-[var(--color-basalt)]">{p.title[locale]}</span>
                    {' — '}{p.location[locale]}
                    {p.mapCoords && (
                      <span className="type-label-code text-[var(--color-slate)] ml-2">
                        [{p.mapCoords[0].toFixed(4)}, {p.mapCoords[1].toFixed(4)}]
                      </span>
                    )}
                  </li>
                ))}
              </ul>
            </div>
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
