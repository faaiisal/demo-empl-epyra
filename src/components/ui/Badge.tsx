import { cn } from '@/lib/cn'
import type { ProjectStatus } from '@/types/project'

interface BadgeProps {
  status: ProjectStatus
  label: string // e.g. "ONGOING • Q4 2026"
  className?: string
}

const dotClass: Record<ProjectStatus, string> = {
  ongoing: 'status-dot-ongoing',
  finishing: 'status-dot-finishing',
  completed: 'status-dot-completed',
  upcoming: 'status-dot-upcoming',
}

export function Badge({ status, label, className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5',
        'type-label-code',
        'bg-white/95 border border-[var(--color-hairline)]',
        'px-2.5 py-1 text-[var(--color-basalt)]',
        className,
      )}
    >
      <span
        className={cn('w-1.5 h-1.5 rounded-full flex-shrink-0', dotClass[status])}
        aria-hidden="true"
      />
      {label}
    </span>
  )
}
