import LandingPage from '../components/LandingPage/LandingPage';
import Home from '../components/Home/Home';
import { useSession } from '../hooks/use-session';
import { useInterface } from '../components/providers/InterfaceProvider';

export default () => {
  const { user, userDoc, initializing } = useSession();
  const { setIsKioskMode } = useInterface();
  if (initializing) return null;

  // remove kiosk when load the page
  setIsKioskMode(false);

  return user ? <Home userDoc={userDoc} /> : <LandingPage />;
};
