import React from 'react';
import Link from 'next/link';
import { FaUserSecret } from 'react-icons/fa';
import { Style } from 'react-head';
import { observer } from 'mobx-react-lite';

import { useSession } from '../../hooks/useSession';

import { Avatar } from '../Avatar/Avatar';
import UserMenu from '../UserMenu/UserMenu';

const Header = observer(() => {
  const { user } = useSession();

  if (!user) return null;

  return (
    <header className='fixed z-100 bg-gray-900 inset-x-0 top-0 lg:static flex items-center shadow-lg'>
      <nav className='w-full relative mx-auto px-6'>
        <div className='h-24 flex flex-col justify-center'>
          <div className='flex items-center -mx-6 justify-between'>
            <div className='lg:w-1/4 xl:w-1/5 pl-6 pr-6'>
              <div className='flex items-center'>
                <Link href='/'>
                  <a className='text-2xl text-white'>
                    <span className='text-teal-500'>easy</span>flow
                  </a>
                </Link>
              </div>
            </div>

            <div className='lg:w-1/4 xl:w-1/5 pl-6 pr-6'>
              <div className='flex items-center justify-end'>
                {user && (
                  <UserMenu
                    userName={user.displayName}
                    userEmail={user.email}
                    trigger={
                      <Avatar
                        imgUrl={user.photoURL}
                        username={user.displayName}
                        className='cursor-pointer'
                      />
                    }
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
});

export default Header;

{
  /* <Link href='/'>
        <a>Easy Flow</a>
      </Link>

      <div className='header-right-side'>
        {user && (
          <Avatar imgUrl={user.photoURL} username={user.displayName} />
        )}
        {user ? (
          <a className='signout-link' onClick={logout}>
            Sign out
          </a>
        ) : (
          <a className='signout-link' href='/'>
            Sign in
          </a>
        )}
      </div> */
}
