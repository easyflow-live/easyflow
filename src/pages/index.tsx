import Home from '../components/Home/Home';
import AuthenticatedPage from '../components/shared/AuthenticatedPage';
import { useSession } from '../hooks/use-session';

export default () => {
  const { userDoc } = useSession();

  return (
    <AuthenticatedPage>
      <Home userDoc={userDoc} />
    </AuthenticatedPage>
  );
};
