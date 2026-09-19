import type { LocalisedText } from './project'

export interface ProgressPhase {
  label: LocalisedText
  isComplete: boolean
  isCurrent: boolean
}

export interface ProgressEntry {
  projectId: string
  sitePhotoSrc: string
  sitePhotoAlt: LocalisedText
  progressPercent: number // TODO: verify
  source: string
  nextMilestone: LocalisedText
  lastUpdated: string // ISO date
  phases: ProgressPhase[]
}
