import Image from 'next/image'
import { useTranslations, useLocale } from 'next-intl'
import { progressLog } from '@/data/progressLog'
import { projects } from '@/data/projects'
import { ProgressBar } from '@/components/ui/ProgressBar'
import { formatDate } from '@/lib/formatDate'
import { cn } from '@/lib/cn'

export default function LiveProgress() {
  const t = useTranslations('progress')
  const locale = useLocale() as 'en' | 'bn'

  return (
    <section
      id="progress"
      aria-labelledby="progress-heading"
      className="bg-[var(--color-basalt)] border-b border-white/10 py-[var(--spacing-2xl)]"
    >
      <div className="section-container">
        {/* Section header */}
        <div className="mb-12 flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
          <div>
            <p className="type-label-code text-[var(--color-terracotta)]">{t('eyebrow')}</p>
            <h2 id="progress-heading" className="type-headline-xl text-white mt-2">
              {t('heading')}
            </h2>
          </div>
          {/* Live indicator */}
          <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-2.5 self-start sm:self-auto">
            <span
              className="w-2 h-2 rounded-full bg-[var(--color-terracotta)] animate-pulse"
              aria-hidden="true"
            />
            <span className="type-label-code text-white/70">LIVE SITE DATA · SEPT 2026</span>
          </div>
        </div>

        {/* Progress entries */}
        <div className="space-y-8">
          {progressLog.map((entry, idx) => {
            const project = projects.find((p) => p.id === entry.projectId)
            if (!project) return null

            return (
              <article
                key={entry.projectId}
                className="border border-white/10 bg-white/5 overflow-hidden"
                aria-label={`${project.title[locale]} — construction progress`}
              >
                <div className="grid grid-cols-1 lg:grid-cols-[480px_1fr] gap-0">
                  {/* Site photo */}
                  <div className="relative h-64 lg:h-full overflow-hidden border-b lg:border-b-0 lg:border-r border-white/10">
                    <Image
                      src={entry.sitePhotoSrc}
                      alt={entry.sitePhotoAlt[locale]}
                      fill
                      loading={idx === 0 ? 'eager' : 'lazy'}
                      sizes="(max-width: 1024px) 100vw, 480px"
                      className="object-cover opacity-80"
                    />
                    {/* Dark overlay */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 bg-gradient-to-t from-[var(--color-basalt)]/60 to-transparent"
                    />
                    {/* Live marker */}
                    <div className="absolute top-4 left-4 flex items-center gap-1.5 bg-[var(--color-basalt)]/90 backdrop-blur-sm border border-white/10 px-3 py-1.5">
                      <span
                        className="w-1.5 h-1.5 rounded-full bg-[var(--color-terracotta)] animate-pulse"
                        aria-hidden="true"
                      />
                      <span className="type-label-code text-white text-[9px]">LIVE</span>
                    </div>
                    {/* Progress % overlay on photo bottom */}
                    <div className="absolute bottom-4 left-4 right-4">
                      <div className="flex items-end justify-between mb-2">
                        <p className="type-label-code text-white/60 text-[9px]">{project.location[locale]}</p>
                        <span className="type-display text-white/20 font-bold leading-none" style={{ fontSize: '4rem' }}>
                          {entry.progressPercent}
                          <span className="text-2xl">%</span>
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Progress data */}
                  <div className="p-7 lg:p-10 flex flex-col gap-6">
                    {/* Title */}
                    <div>
                      <p className="type-label-code text-[var(--color-terracotta)]/70">
                        {project.location[locale]}
                      </p>
                      <h3 className="type-headline-md text-white mt-1">
                        {project.title[locale]}
                      </h3>
                    </div>

                    {/* Progress bar + percentage */}
                    <div className="space-y-3">
                      <div className="flex justify-between items-baseline">
                        <span className="type-label-code text-white/40 text-[9px]">
                          {t('source')}: {entry.source}
                        </span>
                        <span className="type-label-code text-[var(--color-terracotta)] text-base font-bold">
                          {entry.progressPercent}% {locale === 'bn' ? 'সম্পন্ন' : 'complete'}
                        </span>
                      </div>
                      <ProgressBar
                        percent={entry.progressPercent}
                        label={`${project.title[locale]}: ${entry.progressPercent}% complete`}
                      />
                    </div>

                    {/* Key facts */}
                    <dl className="grid grid-cols-2 gap-4 border-t border-white/10 pt-5">
                      <div>
                        <dt className="type-label-code text-white/40 text-[9px]">{t('lastUpdated')}</dt>
                        <dd className="type-body-sm text-white mt-1">
                          {formatDate(entry.lastUpdated, locale)}
                        </dd>
                      </div>
                      <div>
                        <dt className="type-label-code text-white/40 text-[9px]">{t('nextMilestone')}</dt>
                        <dd className="type-body-sm text-white mt-1">
                          {entry.nextMilestone[locale]}
                        </dd>
                      </div>
                    </dl>

                    {/* Phase timeline */}
                    <div>
                      <p className="type-label-code text-white/40 text-[9px] mb-3">{t('phases')}</p>
                      <ol className="flex flex-wrap gap-2" aria-label="Construction phases">
                        {entry.phases.map((phase, i) => (
                          <li
                            key={i}
                            className={cn(
                              'type-label-code text-[9px] px-3 py-1.5 border transition-colors',
                              phase.isComplete
                                ? 'bg-[var(--color-terracotta)] text-white border-[var(--color-terracotta)]'
                                : phase.isCurrent
                                  ? 'border-[var(--color-terracotta)]/60 text-[var(--color-terracotta)] bg-[var(--color-terracotta)]/10'
                                  : 'border-white/10 text-white/30',
                            )}
                            aria-current={phase.isCurrent ? 'step' : undefined}
                          >
                            {phase.isComplete && (
                              <span aria-hidden="true" className="mr-1">✓</span>
                            )}
                            {phase.isCurrent && (
                              <span aria-hidden="true" className="mr-1">›</span>
                            )}
                            {phase.label[locale]}
                          </li>
                        ))}
                      </ol>
                    </div>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </div>
    </section>
  )
}
