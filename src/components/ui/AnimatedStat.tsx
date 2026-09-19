'use client'

import { useEffect, useState } from 'react'

interface AnimatedStatProps {
  target: number
  suffix?: string
  duration?: number
}

export function AnimatedStat({ target, suffix = '', duration = 2400 }: AnimatedStatProps) {
  const [value, setValue] = useState(0)

  useEffect(() => {
    let frameId = 0
    const start = performance.now()

    const animate = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const easedProgress = 1 - (1 - progress) ** 3
      setValue(Math.round(target * easedProgress))

      if (progress < 1) {
        frameId = requestAnimationFrame(animate)
      }
    }

    frameId = requestAnimationFrame(animate)
    return () => cancelAnimationFrame(frameId)
  }, [duration, target])

  return (
    <>
      {value.toLocaleString('en-US')}
      {suffix}
    </>
  )
}
