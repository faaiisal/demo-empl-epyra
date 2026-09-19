import { redirect } from 'next/navigation'

// Redirect root to /en (next-intl middleware handles this too, belt-and-suspenders)
export default function RootPage() {
  redirect('/en')
}
