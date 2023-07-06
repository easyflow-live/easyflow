import { Title } from 'react-head'

import { Changelog } from '@/components/pages/Changelog'
import { Header } from '@/modules/LandingPage/Header'
import { Footer } from '@/modules/LandingPage/Footer'
// import { useSession } from '@/hooks/use-session'

export function Index() {
  // const { user, initializing } = useSession();

  // if (initializing) return null;

  return (
    <>
      <Title>Easy Flow Changelog</Title>
      <Header />
      <Changelog />
      <Footer />
    </>
  )
}
