import React from 'react';
import Router from 'next/router';

import { useGoogleLogin } from '../../hooks/use-google-login';
import Menu, { MenuItem, Button } from '../Menu';

interface UserMenuProps {
  trigger: React.ReactChild;
  userName: string;
  userEmail: string;
}

const UserName = ({ name }) => <span className='font-semibold'>{name}</span>;
const UserEmail = ({ email }) => <span className='font-light'>{email}</span>;

const UserMenu = ({ trigger, userName, userEmail }: UserMenuProps) => {
  const { logout } = useGoogleLogin();

  const signOut = () => {
    logout();
    Router.push('/');
  };

  return (
    <Menu
      trigger={<Button>{trigger}</Button>}
      header={
        <>
          <div>
            <UserName name={userName} />
          </div>
          <div>
            <UserEmail email={userEmail} />
          </div>
        </>
      }
      items={
        <MenuItem
          className='cursor-pointer hover:text-teal-500 px-25 py-7'
          onClick={signOut}
        >
          Sign out
        </MenuItem>
      }
    />
  );
};

export default UserMenu;
