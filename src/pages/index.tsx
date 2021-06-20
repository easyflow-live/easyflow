import nextCookies from 'next-cookies';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import Home from 'components/pages/Home';
import LandingPage from 'modules/LandingPage';
import { useSession } from 'hooks/use-session';

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nextCookies(ctx);
  const sessionToken = cookies['next-auth.session-token'];
  const authObject = cookies.auth;

  const hasAuth = !!sessionToken || !!authObject;

  return {
    props: { auth: hasAuth },
  };
};

const Index: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  auth,
}) => {
  const { user } = useSession();

  return auth || user ? <Home /> : <LandingPage />;
};

export default Index;
