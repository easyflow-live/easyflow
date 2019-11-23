import { Title } from 'react-head';

import Changelog from '../src/components/pages/Changelog';
import Header from '../src/components/LandingPage/Header';
import Footer from '../src/components/LandingPage/Footer';
import { useSession } from '../src/hooks/use-session';

export default () => {
  const { user, initializing } = useSession();

  if (initializing) return null;

  return (
    <>
      <Title>Easy Flow Changelog</Title>
      {!user && <Header />}
      <Changelog />
      <Footer />
    </>
  );
};
