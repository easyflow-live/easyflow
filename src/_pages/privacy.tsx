import { Title } from 'react-head'

import Privacy from '@/modules/LandingPage/Privacy'
import { Footer } from '@/app/(marketing)/components/Footer'
import { Header } from '@/app/(marketing)/components/Header'
// import { useSession } from '@/hooks/use-session';

export default function Index() {
  // const { user, initializing } = useSession();

  // if (initializing) return null;

  return (
    <>
      <Title>Easy Flow Privacy</Title>
      <Header />
      <Privacy />
      <Footer />
    </>
  )
}
