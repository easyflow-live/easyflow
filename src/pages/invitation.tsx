import React, { useEffect, useState } from 'react';
import { Title } from 'react-head';
import Router from 'next/router';
import { observer } from 'mobx-react-lite';
import Link from 'next/link';
import { NextPage } from 'next';

import firebase from 'services/firebase.service';
import { useSession } from 'hooks/use-session';
import Header from 'components/LandingPage/Header';
import { SafariButtonWarning } from 'components/shared';
import { InviteStatus } from 'documents/board-invite.doc';
import Loader from 'components/shared/Loader';

const Shell: React.FC = ({ children }) => (
  <section className='w-full grid' style={{ placeItems: 'center' }}>
    <div className='mx-auto mt-16' style={{ maxWidth: '1280px' }}>
      <div className='flex flex-col items-center bg-gray-750 border-gray-700 border rounded p-12'>
        {children}
      </div>
    </div>
  </section>
);

const Invitation: NextPage<{ token?: string }> = ({ token }) => {
  const { isLogged, user } = useSession();
  const [error, setError] = useState<string>(null);

  useEffect(() => {
    async function fetchInvite() {
      const i = await firebase.getBoardInvite(token as string).get();

      if (!i.exists) {
        setError('Invalid token');
        return null;
      }

      const invite = i.data();

      if (invite.user.id !== user.email) {
        setError('This invite is not for you');
        return null;
      }

      if (invite.status !== InviteStatus.ACCEPTED) {
        await i.ref.update({ status: InviteStatus.ACCEPTED });
      }

      return invite;
    }

    if (user) {
      fetchInvite().then(invite => {
        if (invite) {
          Router.replace(`/b/${invite.board.id}?redirect=true`);
        }
      });
    }
  }, [user, token]);

  if (error)
    return (
      <Shell>
        <h1 className='text-2xl font-light text-white leading-tight mb-6'>
          {error}
        </h1>
        <Link href='/'>
          <a className='text-pink-500'>Go back to home</a>
        </Link>
      </Shell>
    );

  return isLogged ? (
    <Loader />
  ) : (
    <main className='flex flex-col justify-between'>
      <Title>Easy Flow</Title>

      <Header />

      <Shell>
        <h1 className='text-2xl font-light text-white leading-tight mb-6'>
          Log in to EasyFlow
        </h1>
        <SafariButtonWarning>Login with Google</SafariButtonWarning>
      </Shell>
    </main>
  );
};

Invitation.getInitialProps = ctx => {
  if (ctx.query.token) {
    return { token: ctx.query.token as string };
  }

  if (ctx.res) {
    ctx.res.writeHead(302, { Location: '/' });
    ctx.res.end();
  }
  return {};
};

export default observer(Invitation);
