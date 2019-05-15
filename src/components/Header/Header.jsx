import React from 'react';
import Link from 'next/link';
import { FaUserSecret } from 'react-icons/fa';
import { Style } from 'react-head';
import { observer } from 'mobx-react-lite';

import { useSession } from '../../hooks/useSession';
import { useGoogleLogin } from '../../hooks/useLogin';
import { Avatar } from '../Avatar/Avatar';
import './Header.scss';

const Header = observer(() => {
  const { user } = useSession();
  const { logout } = useGoogleLogin();

  return (
    <header>
      <Link href="/">
        <a>Easy Flow</a>
      </Link>

      <div className="header-right-side">
        {user && <Avatar imgUrl={user.photoURL} username={user.displayName} />}
        {user ? (
          <a className="signout-link" onClick={logout}>
            Sign out
          </a>
        ) : (
          <a className="signout-link" href="/">
            Sign in
          </a>
        )}
      </div>
    </header>
  );
});

export default Header;
