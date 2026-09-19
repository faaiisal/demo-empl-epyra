// Cleaned partner and testimonial data — placeholder images removed
// Real logos and quotes to be replaced before launch

export interface Partner {
  id: string
  name: string
  acronym: string
  description: string
}

export interface Testimonial {
  id: string
  quote: { en: string; bn: string }
  author: string
  initials: string
  role: { en: string; bn: string }
  projectId: string
}

export const partners: Partner[] = [
  {
    id: 'rajuk',
    name: 'Rajdhani Unnayan Kartripakkha',
    acronym: 'RAJUK',
    description: 'Capital Development Authority',
  },
  {
    id: 'bnbc',
    name: 'Bangladesh National Building Code',
    acronym: 'BNBC 2020',
    description: 'Seismic Zone 2 Compliant',
  },
  {
    id: 'rehab',
    name: 'Real Estate & Housing Association',
    acronym: 'REHAB',
    description: 'Member Developer',
  },
  {
    id: 'wasa',
    name: 'Dhaka Water Supply & Sewerage Authority',
    acronym: 'DWASA',
    description: 'Utility Approval',
  },
]

export const testimonials: Testimonial[] = [
  {
    id: 'testimonial-1',
    quote: {
      en: 'The engineering quality and transparency throughout the process set EMPLD apart from every other developer we considered.',
      bn: 'ইঞ্জিনিয়ারিং মান এবং প্রক্রিয়া জুড়ে স্বচ্ছতা ইএমপিএলডিকে আমাদের বিবেচিত অন্য সব ডেভেলপার থেকে আলাদা করেছে।',
    },
    author: 'A. Rahman',
    initials: 'AR',
    role: {
      en: 'Buyer, EMPLD Residence Gulshan 2',
      bn: 'ক্রেতা, ইএমপিএলডি রেসিডেন্স গুলশান ২',
    },
    projectId: 'empld-residence-gulshan-2',
  },
  {
    id: 'testimonial-2',
    quote: {
      en: 'As a landowner, the joint venture model was clear, fair and well-documented. I would partner with EMPLD again without hesitation.',
      bn: 'জমির মালিক হিসেবে, যৌথ উদ্যোগ মডেলটি স্পষ্ট, ন্যায্য এবং সুনথিবদ্ধ ছিল। আমি দ্বিধা ছাড়াই আবার ইএমপিএলডির সাথে অংশীদারিত্ব করব।',
    },
    author: 'S. Hossain',
    initials: 'SH',
    role: {
      en: 'Joint venture partner, Baridhara project',
      bn: 'যৌথ উদ্যোগ অংশীদার, বারিধারা প্রকল্প',
    },
    projectId: 'embassy-duplex-baridhara',
  },
]
