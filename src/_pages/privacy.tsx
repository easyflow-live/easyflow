import { Title } from 'react-head'

import Privacy from '@/modules/LandingPage/Privacy'
import { Footer } from '@/modules/LandingPage/Footer'
import { Header } from '@/modules/LandingPage/Header'
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
