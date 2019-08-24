import { Title } from 'react-head';

import Privacy from '../src/components/LandingPage/Privacy';
import Footer from '../src/components/LandingPage/Footer';
import Header from '../src/components/LandingPage/Header';

export default () => (
  <div>
    <Title>Easy Flow Privacy</Title>

    <Header />

    <main
      className='w-full relative mx-auto px-6 py-16'
      style={{ maxWidth: '1280px' }}
    >
      <Privacy />
      <Footer />
    </main>
  </div>
);
