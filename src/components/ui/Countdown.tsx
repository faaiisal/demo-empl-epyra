'use client'

import { useEffect, useState } from 'react'

interface TimeLeft {
  days: number
  hours: number
  minutes: number
  seconds: number
}

// EMPLD Residence Gulshan 2 — target handover Q4 2026
const HANDOVER_DATE = new Date('2026-12-31T00:00:00')
const EMPTY_TIME: TimeLeft = { days: 0, hours: 0, minutes: 0, seconds: 0 }

function getTimeLeft(): TimeLeft {
  const diff = HANDOVER_DATE.getTime() - Date.now()
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 }
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

function pad(n: number) {
  return String(n).padStart(2, '0')
}

interface CountdownProps {
  className?: string
}

export function Countdown({ className = '' }: CountdownProps) {
  // Keep the server render and the first client render identical.
  const [time, setTime] = useState<TimeLeft>(EMPTY_TIME)

  useEffect(() => {
    setTime(getTimeLeft())
    const id = setInterval(() => setTime(getTimeLeft()), 1000)
    return () => clearInterval(id)
  }, [])

  const units = [
    { label: 'Days',    value: time.days,    padded: String(time.days).padStart(3, '0') },
    { label: 'Hours',   value: time.hours,   padded: pad(time.hours) },
    { label: 'Minutes', value: time.minutes, padded: pad(time.minutes) },
    { label: 'Seconds', value: time.seconds, padded: pad(time.seconds) },
  ]

  return (
    <div className={`flex items-end gap-3 sm:gap-5 ${className}`} aria-live="off">
      {units.map(({ label, padded }, i) => (
        <div key={label} className="flex items-end gap-3 sm:gap-5">
          <div className="text-center">
            <span
              className="block font-sans text-white leading-none"
              style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, fontVariantNumeric: 'tabular-nums', letterSpacing: '-0.03em' }}
              aria-label={`${padded} ${label}`}
            >
              {padded}
            </span>
            <span className="type-label-code text-white/40 mt-1 block" style={{ fontSize: '9px' }}>
              {label.toUpperCase()}
            </span>
          </div>
          {i < units.length - 1 && (
            <span className="text-white/30 pb-5 text-2xl font-light select-none" aria-hidden="true">:</span>
          )}
        </div>
      ))}
    </div>
  )
}
