import { Title } from 'react-head';

import Changelog from '../components/pages/Changelog';
import Header from '../components/LandingPage/Header';
import Footer from '../components/LandingPage/Footer';
import { useSession } from '../hooks/use-session';

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
