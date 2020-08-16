import React from 'react';
import Link from 'next/link';
import { observer } from 'mobx-react-lite';

import { useSession } from 'hooks/use-session';

import { Avatar } from 'components/shared';
import UserMenu from 'components/shared/UserMenu';
import { GiveFeedback } from 'components/shared/Feedback/GiveFeedback';
import { useInterface } from 'components/providers/InterfaceProvider';

const Header = observer(() => {
  const { user, userDoc } = useSession();
  const { previewMode } = useInterface();

  if (previewMode || !user) return null;

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
              {user && (
                <div className='flex items-center justify-end'>
                  <GiveFeedback user={userDoc} />
                  <UserMenu
                    userName={user.displayName}
                    userEmail={user.email}
                    trigger={
                      <div className='flex items-center'>
                        <Avatar
                          src={user.photoURL}
                          username={user.displayName}
                          className='cursor-pointer'
                        />
                      </div>
                    }
                  />
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
});

export default Header;
