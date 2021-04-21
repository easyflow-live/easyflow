import { ReactElement } from 'react';
import { ErrorProps } from 'next/error';
import Error from 'next/error';

import LandingPage from 'modules/LandingPage';
import { useSession } from 'hooks/use-session';
import Loader from 'components/shared/Loader';

interface PageProps {
  children: ReactElement;
  isAnonymous?: boolean;
  redirect?: boolean;
  error?: ErrorProps;
}

export default ({ children, isAnonymous, redirect, error }: PageProps) => {
  const { user } = useSession();

  if (redirect) return <Loader />;
  if (error) return <Error {...error} />;
  if (!user && !isAnonymous) return <LandingPage />;

  return children;
};
