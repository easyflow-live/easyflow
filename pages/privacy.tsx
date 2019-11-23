import { Title } from 'react-head';

import Privacy from '../src/components/LandingPage/Privacy';
import Footer from '../src/components/LandingPage/Footer';
import Header from '../src/components/LandingPage/Header';
import { useSession } from '../src/hooks/use-session';

export default () => {
  const { user, initializing } = useSession();

  if (initializing) return null;

  return (
    <>
      <Title>Easy Flow Privacy</Title>
      {!user && <Header />}
      <Privacy />
      <Footer />
    </>
  );
};
