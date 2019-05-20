import React from 'react';
import { Button, Wrapper, Menu, MenuItem } from 'react-aria-menubutton';

import { useGoogleLogin } from '../../hooks/useLogin';
import './UserMenu.css';
import Router from 'next/router';

interface UserMenuProps {
  trigger: React.ReactChild;
  userName: string;
  userEmail: string;
}

const Divider = () => (
  <div className='my-4 border-b border-solid border-gray-700' />
);

const UserName = ({ name }) => <span className='font-semibold'>{name}</span>;
const UserEmail = ({ email }) => <span className='font-light'>{email}</span>;

const UserMenu = ({ trigger, userName, userEmail }: UserMenuProps) => {
  const { logout } = useGoogleLogin();

  const signOut = () => {
    logout();
    Router.push('/');
  };

  return (
    <Wrapper className='user-menu relative'>
      <Button>{trigger}</Button>
      <Menu className='user-menu__menu text-white bg-gray-800 p-6 shadow-lg rounded-sm min-w-full'>
        <div className='user-menu__header'>
          <div>
            <UserName name={userName} />
          </div>
          <div>
            <UserEmail email={userEmail} />
          </div>
        </div>
        <Divider />
        <MenuItem
          className='cursor-pointer hover:text-teal-500 px-25 py-7'
          onClick={signOut}
        >
          Sign out
        </MenuItem>
      </Menu>
      <div className='popover-arrow' />
    </Wrapper>
  );
};

export default UserMenu;
