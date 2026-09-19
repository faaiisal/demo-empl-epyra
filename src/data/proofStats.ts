// TODO: verify all figures below before launch

export interface ProofStat {
  id: string
  value: string // translation key e.g. 'proof.stat1Value'
  label: string // translation key e.g. 'proof.stat1Label'
}

export const proofStats: ProofStat[] = [
  { id: 'title', value: 'proof.stat1Value', label: 'proof.stat1Label' },
  { id: 'concrete', value: 'proof.stat2Value', label: 'proof.stat2Label' },
  { id: 'warranty', value: 'proof.stat3Value', label: 'proof.stat3Label' },
  { id: 'projects', value: 'proof.stat4Value', label: 'proof.stat4Label' },
]
