import { ReactElement } from 'react';
import Router from 'next/router';
import { ErrorProps } from 'next/error';
import Error from 'next/error';

import LandingPage from '../LandingPage/LandingPage';
import { useSession } from '../../hooks/use-session';
import Loader from './Loader';

interface PageProps {
  children: ReactElement;
  isAnonymous?: boolean;
  redirect?: boolean;
  error?: ErrorProps;
}

export default ({ children, isAnonymous, redirect, error }: PageProps) => {
  const { user, initializing } = useSession();

  if (initializing) return <Loader />;
  if (error) return <Error {...error} />;
  if (isAnonymous || user) return children;
  if (!redirect) return <LandingPage />;

  Router.push('/');
  return null;
};
