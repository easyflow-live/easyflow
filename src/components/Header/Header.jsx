import React from 'react';
import Link from 'next/link';
import { FaUserSecret } from 'react-icons/fa';
import './Header.scss';
import { useSession } from '../../hooks/useSession';
import { useGoogleLogin } from '../../hooks/useLogin';

const Header = () => {
  const { user } = useSession();
  const { logout } = useGoogleLogin();

  return (
    <header>
      <Link href="/">
        <a>React Kanban</a>
      </Link>
      <div className="header-right-side">
        {user ? (
          <img
            src={user.photoURL}
            alt={user.displayName}
            className="user-thumbnail"
            title={user.displayName}
          />
        ) : (
          <FaUserSecret className="guest-icon" />
        )}
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
