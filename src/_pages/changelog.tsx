import { Title } from 'react-head'

import { Changelog } from '@/components/pages/Changelog'
import { Header } from '@/app/(marketing)/components/Header'
import { Footer } from '@/app/(marketing)/components/Footer'
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
