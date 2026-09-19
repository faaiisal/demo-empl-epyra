import Image from 'next/image'
import { Badge } from './Badge'
import { Button } from './Button'
import { formatBDT } from '@/lib/formatBDT'
import type { Project } from '@/types/project'
import { useTranslations, useLocale } from 'next-intl'

interface ProjectCardProps {
  project: Project
}

// Status label map
const statusLabel: Record<Project['status'], string> = {
  ongoing: 'Ongoing',
  finishing: 'Finishing',
  completed: 'Completed',
  upcoming: 'Upcoming',
}

export function ProjectCard({ project }: ProjectCardProps) {
  const t = useTranslations('projects')
  const locale = useLocale() as 'en' | 'bn'

  const minPrice = project.unitTypes.length > 0
    ? Math.min(...project.unitTypes.map((u) => u.priceFromCr))
    : null

  return (
    <article className="bg-white border border-[var(--color-hairline)] flex flex-col group hover:shadow-[var(--shadow-architectural)] transition-shadow duration-300">
      {/* Thumbnail */}
      <div className="relative h-60 overflow-hidden border-b border-[var(--color-hairline)] flex-shrink-0">
        <Image
          src={project.thumbnailSrc}
          alt={project.thumbnailAlt[locale]}
          fill
          className="object-cover group-hover:scale-[1.02] transition-transform duration-700 ease-out"
          sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 25vw"
        />
        {/* Status badge — top left */}
        <div className="absolute top-3 left-3">
          <Badge
            status={project.status}
            label={`${statusLabel[project.status].toUpperCase()} • ${project.handoverQuarter}`}
          />
        </div>
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1 gap-4">
        <div>
          <p className="type-label-code text-[var(--color-slate)]">
            {project.location[locale]}
          </p>
          <h3 className="type-headline-md text-[var(--color-basalt)] mt-1">
            {project.title[locale]}
          </h3>
          <p className="type-body-sm text-[var(--color-on-surface-variant)] mt-2 line-clamp-2">
            {project.shortDescription[locale]}
          </p>
        </div>

        {/* Key specs */}
        <dl className="border-t border-[var(--color-hairline)] pt-3 space-y-1.5">
          {project.unitTypes[0] && (
            <div className="flex justify-between type-body-sm">
              <dt className="text-[var(--color-slate)]">
                {project.unitTypes.length > 1
                  ? `${project.unitTypes[0].areaSqFtMin.toLocaleString()} – ${project.unitTypes[project.unitTypes.length - 1].areaSqFtMax.toLocaleString()} sq.ft`
                  : `${project.unitTypes[0].areaSqFtMin.toLocaleString()} sq.ft`}
              </dt>
            </div>
          )}
          {minPrice !== null && (
            <div className="flex justify-between type-body-sm">
              <dt className="text-[var(--color-slate)]">{t('from')}</dt>
              <dd className="font-bold text-[var(--color-basalt)]">
                {formatBDT(minPrice, locale)}
              </dd>
            </div>
          )}
        </dl>

        {/* CTA — flush to bottom */}
        <div className="mt-auto pt-2">
          <Button
            as="a"
            href={`#contact`}
            variant="primary"
            size="sm"
            className="w-full justify-center"
          >
            {t('cardCta')}
          </Button>
        </div>
      </div>
    </article>
  )
}
