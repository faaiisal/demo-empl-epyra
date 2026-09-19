import type { ProgressEntry } from '@/types/progress'

// TODO: verify all progress percentages and milestone dates before launch

export const progressLog: ProgressEntry[] = [
  {
    projectId: 'empld-residence-gulshan-2',
    sitePhotoSrc: '/placeholders/8.webp',
    sitePhotoAlt: {
      en: 'EMPLD Residence construction site — Gulshan 2, September 2026',
      bn: 'ইএমপিএলডি রেসিডেন্স নির্মাণ সাইট — গুলশান ২, সেপ্টেম্বর ২০২৬',
    },
    progressPercent: 62, // TODO: verify
    source: 'EMPLD site engineer report, Sept 2026', // TODO: verify
    nextMilestone: {
      en: 'Roof slab casting — Oct 2026',
      bn: 'ছাদ স্ল্যাব ঢালাই — অক্টোবর ২০২৬',
    },
    lastUpdated: '2026-09-01',
    phases: [
      {
        label: { en: 'Foundation', bn: 'ভিত্তি' },
        isComplete: true,
        isCurrent: false,
      },
      {
        label: { en: 'Structural frame', bn: 'কাঠামো' },
        isComplete: true,
        isCurrent: false,
      },
      {
        label: { en: 'Slab & services', bn: 'স্ল্যাব ও পরিষেবা' },
        isComplete: false,
        isCurrent: true,
      },
      {
        label: { en: 'Facade', bn: 'সম্মুখভাগ' },
        isComplete: false,
        isCurrent: false,
      },
      {
        label: { en: 'Interior finishing', bn: 'অভ্যন্তরীণ ফিনিশিং' },
        isComplete: false,
        isCurrent: false,
      },
      {
        label: { en: 'Handover', bn: 'হস্তান্তর' },
        isComplete: false,
        isCurrent: false,
      },
    ],
  },
  {
    projectId: 'embassy-duplex-baridhara',
    sitePhotoSrc: '/placeholders/9.webp',
    sitePhotoAlt: {
      en: 'Embassy Duplex construction site — Baridhara, September 2026',
      bn: 'এম্বাসি ডুপ্লেক্স নির্মাণ সাইট — বারিধারা, সেপ্টেম্বর ২০২৬',
    },
    progressPercent: 88, // TODO: verify
    source: 'EMPLD site engineer report, Sept 2026', // TODO: verify
    nextMilestone: {
      en: 'Interior finishing — Nov 2026',
      bn: 'অভ্যন্তরীণ ফিনিশিং — নভেম্বর ২০২৬',
    },
    lastUpdated: '2026-09-01',
    phases: [
      {
        label: { en: 'Foundation', bn: 'ভিত্তি' },
        isComplete: true,
        isCurrent: false,
      },
      {
        label: { en: 'Structural frame', bn: 'কাঠামো' },
        isComplete: true,
        isCurrent: false,
      },
      {
        label: { en: 'Slab & services', bn: 'স্ল্যাব ও পরিষেবা' },
        isComplete: true,
        isCurrent: false,
      },
      {
        label: { en: 'Facade', bn: 'সম্মুখভাগ' },
        isComplete: true,
        isCurrent: false,
      },
      {
        label: { en: 'Interior finishing', bn: 'অভ্যন্তরীণ ফিনিশিং' },
        isComplete: false,
        isCurrent: true,
      },
      {
        label: { en: 'Handover', bn: 'হস্তান্তর' },
        isComplete: false,
        isCurrent: false,
      },
    ],
  },
]
