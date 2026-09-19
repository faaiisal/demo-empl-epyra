import { useTranslations } from 'next-intl'

const STAGES = [
  {
    key: 'stage1' as const,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M9 22V12h6v10" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    key: 'stage2' as const,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    key: 'stage3' as const,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    key: 'stage4' as const,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M2 20h20M4 20V10l8-6 8 6v10" strokeLinecap="round" strokeLinejoin="round"/>
        <path d="M10 20v-5h4v5" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
  {
    key: 'stage5' as const,
    icon: (
      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" aria-hidden="true">
        <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" strokeLinecap="round" strokeLinejoin="round"/>
      </svg>
    ),
  },
]

export default function EngineeredBD() {
  const t = useTranslations('engineered')

  return (
    <section
      id="engineered"
      aria-labelledby="engineered-heading"
      className="bg-[var(--color-basalt)] text-white py-[var(--spacing-2xl)]"
    >
      <div className="section-container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">

          {/* Left — editorial narrative */}
          <div className="space-y-6">
            <p className="type-label-code text-[var(--color-terracotta)]">{t('eyebrow')}</p>
            <h2 id="engineered-heading" className="type-headline-xl text-white">
              {t('heading')}
            </h2>
            <p className="type-body-lg text-white/65 font-light leading-relaxed">
              {t('body')}
            </p>

            {/* Simple three pillars */}
            <div className="grid grid-cols-3 gap-px bg-white/10 border border-white/10 mt-8">
              {[
                { stat: '5,000+', label: 'PSI concrete spec' },
                { stat: '100%', label: 'Freehold title' },
                { stat: '25yr', label: 'Structural warranty' },
              ].map(({ stat, label }) => (
                <div key={stat} className="bg-[var(--color-basalt)] px-4 py-5">
                  <p className="text-white font-sans font-bold" style={{ fontSize: '1.5rem', letterSpacing: '-0.03em' }}>{stat}</p>
                  <p className="type-label-code text-white/40 mt-1" style={{ fontSize: '9px' }}>{label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right — 5-stage pipeline */}
          <div className="space-y-6">
            <p className="type-label-code text-[var(--color-slate)]">{t('modelHeading')}</p>

            <ol className="space-y-px" aria-label="The five-stage EMPLD integrated model">
              {STAGES.map(({ key, icon }, i) => (
                <li
                  key={key}
                  className="group flex items-center gap-5 bg-white/5 hover:bg-white/10 transition-colors duration-150 px-6 py-5 border-l-2 border-transparent hover:border-[var(--color-terracotta)]"
                >
                  {/* Step number */}
                  <span
                    className="type-label-code text-[var(--color-terracotta)] shrink-0 w-6"
                    style={{ fontSize: '10px' }}
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>

                  {/* Icon */}
                  <span className="text-white/40 group-hover:text-[var(--color-terracotta)] transition-colors shrink-0">
                    {icon}
                  </span>

                  {/* Stage label */}
                  <span className="type-headline-md text-white group-hover:text-white transition-colors">
                    {t(key)}
                  </span>

                  {/* Arrow */}
                  <svg
                    className="ml-auto text-white/20 group-hover:text-white/50 transition-colors shrink-0"
                    width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true"
                  >
                    <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                  </svg>
                </li>
              ))}
            </ol>

            <p className="type-body-sm text-white/35 leading-relaxed">
              From initial land evaluation and regulatory approvals to structural engineering, construction management and final property handover — all in-house.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
