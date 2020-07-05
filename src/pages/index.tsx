import Home from '../components/Home/Home';
import AuthenticatedPage from '../components/shared/AuthenticatedPage';
import { useSession } from '../hooks/use-session';
import { useRouter } from 'next/router';

export default () => {
  const { userDoc } = useSession();
  const { query } = useRouter();
  const { redirect } = query;

  return (
    <AuthenticatedPage redirect={redirect === 'true' ? true : false}>
      <Home userDoc={userDoc} />
    </AuthenticatedPage>
  );
};
