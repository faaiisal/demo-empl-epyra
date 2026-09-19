import { useTranslations } from 'next-intl'
import { AnimatedStat } from '@/components/ui/AnimatedStat'
import { Countdown } from '@/components/ui/Countdown'

const STATS = [
  { valueKey: 'stat1Value', labelKey: 'stat1Label', target: 100, suffix: '%' },
  { valueKey: 'stat2Value', labelKey: 'stat2Label', target: 5000, suffix: '+' },
  { valueKey: 'stat3Value', labelKey: 'stat3Label', target: 28, suffix: '-Years' },
  { valueKey: 'stat4Value', labelKey: 'stat4Label', target: 12, suffix: '' },
] as const

export default function ProofStrip() {
  const t = useTranslations('proof')

  return (
    <section
      id="proof"
      aria-labelledby="proof-heading"
      className="bg-[var(--color-basalt)] border-b border-white/10"
    >
      <h2 id="proof-heading" className="sr-only">{t('heading')}</h2>

      {/* Stats row */}
      <dl className="section-container grid grid-cols-2 lg:grid-cols-4 divide-x divide-white/10 border-b border-white/10">
        {STATS.map(({ valueKey, labelKey, target, suffix }) => (
          <div key={valueKey} className="px-6 py-10 md:py-12">
            <dd
              className="text-white leading-none"
              style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 800, fontFamily: 'var(--font-sans)', letterSpacing: '-0.03em' }}
            >
              <AnimatedStat target={target} suffix={suffix} />
            </dd>
            <dt className="type-body-sm text-white/45 mt-2 leading-snug">
              {t(labelKey)}
            </dt>
          </div>
        ))}
      </dl>

      {/* Countdown strip */}
      <div className="section-container py-8 flex flex-col sm:flex-row items-center justify-center gap-6 sm:gap-12 text-center">
        <div>
          <p className="type-label-code text-[var(--color-terracotta)]" style={{ fontSize: '9px' }}>
            HANDOVER COUNTDOWN — EMPLD RESIDENCE · GULSHAN 2
          </p>
          <p className="type-body-sm text-white/40 mt-0.5">Q4 2026 · Dhaka, Bangladesh</p>
        </div>
        <Countdown />
      </div>
    </section>
  )
}
