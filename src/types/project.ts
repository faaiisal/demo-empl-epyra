export type ProjectStatus = 'ongoing' | 'finishing' | 'completed' | 'upcoming'
export type ProjectType = 'residence' | 'duplex' | 'commercial' | 'mixed'
export type BudgetBracket = '5-10' | '10-25' | '25+'
export type District = 'dhaka' | 'chattogram' | 'sylhet'

export interface LocalisedText {
  en: string
  bn: string
}

export interface UnitType {
  label: LocalisedText
  areaSqFtMin: number
  areaSqFtMax: number
  priceFromCr: number // TODO: verify all prices before launch
}

export interface Project {
  id: string // e.g. 'empld-residence-gulshan-2'
  title: LocalisedText
  shortDescription: LocalisedText
  location: LocalisedText
  district: District
  type: ProjectType
  status: ProjectStatus
  handoverQuarter: string // e.g. 'Q4 2026' — TODO: verify
  unitTypes: UnitType[]
  budgetBracket: BudgetBracket
  thumbnailSrc: string // relative to /public
  thumbnailAlt: LocalisedText
  gallerySrcs?: string[]
  mapCoords?: [number, number] // [lat, lng]
  isFlagship: boolean
  progressPercent?: number // TODO: verify
  progressSource?: string // e.g. 'Site engineer report, Aug 2026'
  nextMilestone?: LocalisedText
  lastUpdated?: string // ISO date
}
