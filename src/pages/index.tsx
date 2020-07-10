import nextCookies from 'next-cookies';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import Home from '../components/Home/Home';
import LandingPage from 'components/LandingPage/LandingPage';
import { useSession } from 'hooks/use-session';

export const getServerSideProps: GetServerSideProps = async ctx => {
  const auth = nextCookies(ctx).auth || null;

  return {
    props: { auth },
  };
};

const Index: InferGetServerSidePropsType<typeof getServerSideProps> = ({
  auth,
}) => {
  const { user } = useSession();

  return auth || user ? <Home /> : <LandingPage />;
};

export default Index;
