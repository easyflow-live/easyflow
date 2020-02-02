import { Title } from 'react-head';

import Privacy from '../components/LandingPage/Privacy';
import Footer from '../components/LandingPage/Footer';
import Header from '../components/LandingPage/Header';
import { useSession } from '../hooks/use-session';

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
