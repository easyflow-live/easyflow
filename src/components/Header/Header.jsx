import React from 'react';
import Link from 'next/link';
import { FaUserSecret } from 'react-icons/fa';
import { Style } from 'react-head';
import './Header.scss';
import { useSession } from '../../hooks/useSession';
import { useGoogleLogin } from '../../hooks/useLogin';
import { Avatar } from '../Avatar/Avatar';

const Header = () => {
  const { user } = useSession();
  const { logout } = useGoogleLogin();

  return (
    <header>
      <Link href="/">
        <a>Easy Flow</a>
      </Link>

      <div className="header-right-side">
        <Avatar user={user} />
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
};

export default Header;
