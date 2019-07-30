import React from 'react';
import Link from 'next/link';
import { FaUserSecret } from 'react-icons/fa';
import { Style } from 'react-head';
import { observer } from 'mobx-react-lite';

import { useSession } from '../../hooks/useSession';

import { Avatar } from '../Avatar/Avatar';
import UserMenu from '../UserMenu/UserMenu';
import { useInterface } from '../providers/InterfaceProvider';

const Header = observer(() => {
  const { user } = useSession();
  const { isKioskMode } = useInterface();

  if (!user || isKioskMode) return null;

  return (
    <header className='z-100 bg-gray-900 inset-x-0 top-0 lg:static flex items-center shadow-lg'>
      <nav className='w-full relative mx-auto px-6'>
        <div className='h-20 flex flex-col justify-center'>
          <div className='flex items-center -mx-6 justify-between'>
            <div className='lg:w-1/4 xl:w-1/5 pl-6 pr-6'>
              <div className='flex items-center'>
                <Link href='/'>
                  <a className='text-2xl text-white'>
                    <span className='text-teal-500'>easy</span>flow
                    <small className='text-pink-500 text-xs ml-2'>beta</small>
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
