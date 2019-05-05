import LandingPage from '../src/components/LandingPage/LandingPage';
import Home from '../src/components/Home/Home';
import { useSession } from '../src/hooks/useSession';

export default () => {
  const { user, initializing } = useSession();

  if (initializing) return 'Loading...';

  return user ? <Home /> : <LandingPage />;
};
