import { LandingPage } from '@/modules/LandingPage'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'EasyFlow',
}

export default function Page() {
  return <LandingPage />
}
