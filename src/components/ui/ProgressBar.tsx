'use client'

import { cn } from '@/lib/cn'
import { useEffect, useRef } from 'react'

interface ProgressBarProps {
  percent: number // 0–100
  className?: string
  label?: string // accessible label e.g. "62% complete"
}

export function ProgressBar({ percent, className, label }: ProgressBarProps) {
  const fillRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (fillRef.current) {
      fillRef.current.style.setProperty('--progress-width', `${percent}%`)
    }
  }, [percent])

  return (
    <div
      role="progressbar"
      aria-valuenow={percent}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-label={label ?? `${percent}% complete`}
      className={cn('w-full h-1.5 bg-[var(--color-hairline)] overflow-hidden', className)}
    >
      <div
        ref={fillRef}
        className="h-full bg-[var(--color-terracotta)] progress-bar-fill"
        style={{ '--progress-width': `${percent}%` } as React.CSSProperties}
      />
    </div>
  )
}
