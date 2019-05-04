import LandingPage from '../src/components/LandingPage/LandingPage';
import { useAuth } from '../src/hooks/useAuth';

export default () => {
  const { user } = useAuth();

  return user ? 'hellow' : <LandingPage />;
};
