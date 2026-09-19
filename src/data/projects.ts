import type { Project } from '@/types/project'

// TODO: verify all prices, dates, specs and descriptions before launch

export const projects: Project[] = [
  {
    id: 'empld-residence-gulshan-2',
    isFlagship: true,
    title: {
      en: 'EMPLD Residence',
      bn: 'ইএমপিএলডি রেসিডেন্স',
    },
    shortDescription: {
      en: 'Twelve exclusive single-floor lake-facing suites with double-height private sky terraces.',
      bn: 'লেকমুখী বারোটি একচেটিয়া একতলা স্যুট, ব্যক্তিগত দ্বিগুণ-উচ্চতার আকাশ-ছাদ সহ।',
    },
    location: {
      en: 'Gulshan 2, Dhaka',
      bn: 'গুলশান ২, ঢাকা',
    },
    district: 'dhaka',
    type: 'residence',
    status: 'ongoing',
    handoverQuarter: 'Q4 2026', // TODO: verify
    budgetBracket: '25+',
    thumbnailSrc: '/placeholders/1.webp',
    thumbnailAlt: {
      en: 'EMPLD Residence Gulshan 2 — architectural rendering',
      bn: 'ইএমপিএলডি রেসিডেন্স গুলশান ২ — স্থাপত্য রেন্ডারিং',
    },
    gallerySrcs: ['/placeholders/2.webp', '/placeholders/4.webp'],
    mapCoords: [23.7937, 90.4152],
    unitTypes: [
      {
        label: { en: '3 Bed suite', bn: '৩ বেডরুম স্যুট' },
        areaSqFtMin: 5420,
        areaSqFtMax: 5420,
        priceFromCr: 18.5, // TODO: verify
      },
      {
        label: { en: '4 Bed suite', bn: '৪ বেডরুম স্যুট' },
        areaSqFtMin: 6000,
        areaSqFtMax: 6200,
        priceFromCr: 22.0, // TODO: verify
      },
    ],
    progressPercent: 62, // TODO: verify
    progressSource: 'Site engineer report, Aug 2026', // TODO: verify
    nextMilestone: {
      en: 'Roof slab casting — Oct 2026',
      bn: 'ছাদ স্ল্যাব ঢালাই — অক্টোবর ২০২৬',
    },
    lastUpdated: '2026-09-01',
  },
  {
    id: 'embassy-duplex-baridhara',
    isFlagship: false,
    title: {
      en: 'The Embassy Duplex',
      bn: 'দ্য এম্বাসি ডুপ্লেক্স',
    },
    shortDescription: {
      en: 'Diplomatic-grade residential suites with acoustic double-glazing and private concierge.',
      bn: 'অ্যাকুস্টিক ডাবল গ্লেজিং ও প্রাইভেট কনসিয়ের্জ সহ কূটনৈতিক মানের আবাসিক স্যুট।',
    },
    location: {
      en: 'Baridhara Diplomatic Zone, Dhaka',
      bn: 'বারিধারা কূটনৈতিক এলাকা, ঢাকা',
    },
    district: 'dhaka',
    type: 'duplex',
    status: 'finishing',
    handoverQuarter: 'Q2 2025', // TODO: verify
    budgetBracket: '10-25',
    thumbnailSrc: '/placeholders/5.webp',
    thumbnailAlt: {
      en: 'Embassy Duplex Baridhara — exterior facade',
      bn: 'এম্বাসি ডুপ্লেক্স বারিধারা — বাইরের অবয়ব',
    },
    mapCoords: [23.8103, 90.4221],
    unitTypes: [
      {
        label: { en: 'Duplex penthouse', bn: 'ডুপ্লেক্স পেন্টহাউস' },
        areaSqFtMin: 4850,
        areaSqFtMax: 4850,
        priceFromCr: 15.2, // TODO: verify
      },
    ],
    progressPercent: 88, // TODO: verify
    progressSource: 'Site engineer report, Aug 2026', // TODO: verify
    nextMilestone: {
      en: 'Interior finishing & handover prep — Nov 2026',
      bn: 'অভ্যন্তরীণ ফিনিশিং ও হস্তান্তর প্রস্তুতি — নভেম্বর ২০২৬',
    },
    lastUpdated: '2026-09-01',
  },
  {
    id: 'maritime-tower-chattogram',
    isFlagship: false,
    title: {
      en: 'The Maritime Tower',
      bn: 'দ্য মেরিটাইম টাওয়ার',
    },
    shortDescription: {
      en: 'Grade-A commercial headquarters facing the port shipping channel with solar facade.',
      bn: 'সৌর সম্মুখভাগ সহ বন্দর শিপিং চ্যানেলমুখী গ্রেড-এ বাণিজ্যিক সদর দপ্তর।',
    },
    location: {
      en: 'Agrabad CBD, Chattogram',
      bn: 'আগ্রাবাদ সিবিডি, চট্টগ্রাম',
    },
    district: 'chattogram',
    type: 'commercial',
    status: 'ongoing',
    handoverQuarter: 'Q4 2027', // TODO: verify
    budgetBracket: '25+',
    thumbnailSrc: '/placeholders/6.webp',
    thumbnailAlt: {
      en: 'Maritime Tower Agrabad — commercial tower exterior',
      bn: 'মেরিটাইম টাওয়ার আগ্রাবাদ — বাণিজ্যিক ভবনের বাইরে',
    },
    mapCoords: [22.3283, 91.8233],
    unitTypes: [
      {
        label: { en: 'Commercial floor', bn: 'বাণিজ্যিক তল' },
        areaSqFtMin: 8500,
        areaSqFtMax: 14000,
        priceFromCr: 24.0, // TODO: verify
      },
    ],
    progressPercent: 34, // TODO: verify
    progressSource: 'Site engineer report, Aug 2026', // TODO: verify
    nextMilestone: {
      en: 'Structural frame completion — Mar 2027',
      bn: 'কাঠামোগত ফ্রেম সম্পন্ন — মার্চ ২০২৭',
    },
    lastUpdated: '2026-09-01',
  },
  {
    id: 'garden-suites-banani',
    isFlagship: false,
    title: {
      en: 'Banani Garden Suites',
      bn: 'বনানী গার্ডেন স্যুটস',
    },
    shortDescription: {
      en: 'Eight completed garden-level residences with biophilic screening and private courtyards.',
      bn: 'বায়োফিলিক স্ক্রিনিং ও ব্যক্তিগত আঙিনা সহ আটটি সম্পন্ন গার্ডেন-স্তরের আবাসন।',
    },
    location: {
      en: 'Banani, Dhaka',
      bn: 'বনানী, ঢাকা',
    },
    district: 'dhaka',
    type: 'residence',
    status: 'completed',
    handoverQuarter: 'Q1 2024', // TODO: verify
    budgetBracket: '10-25',
    thumbnailSrc: '/placeholders/7.webp',
    thumbnailAlt: {
      en: 'Banani Garden Suites — completed residential exterior',
      bn: 'বনানী গার্ডেন স্যুটস — সম্পন্ন আবাসিক বাইরের অংশ',
    },
    mapCoords: [23.7946, 90.4046],
    unitTypes: [
      {
        label: { en: '3 Bed garden suite', bn: '৩ বেডরুম গার্ডেন স্যুট' },
        areaSqFtMin: 3200,
        areaSqFtMax: 3800,
        priceFromCr: 11.5, // TODO: verify
      },
    ],
    progressPercent: 100,
    lastUpdated: '2024-01-15',
  },
]
