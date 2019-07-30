import LandingPage from '../src/components/LandingPage/LandingPage';
import Home from '../src/components/Home/Home';
import { useSession } from '../src/hooks/useSession';
import { useInterface } from '../src/components/providers/InterfaceProvider';

export default () => {
  const { user, initializing } = useSession();
  const { setIsKioskMode } = useInterface();
  if (initializing) return null;

  // remove kiosk when load the page
  setIsKioskMode(false);

  return user ? <Home /> : <LandingPage />;
};
