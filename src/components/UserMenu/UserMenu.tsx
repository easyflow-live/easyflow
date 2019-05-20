import React from 'react';
import { Button, Wrapper, Menu, MenuItem } from 'react-aria-menubutton';

import { useGoogleLogin } from '../../hooks/useLogin';

interface UserMenuProps {
  trigger: React.ReactChild;
}

const style = {
  position: 'absolute',
  top: '80%',
  right: '23px',
  display: 'flex',
  flexDirection: 'column',
  width: '140px',
  marginTop: '4px',
  zIndex: 100,
};

const UserMenu = ({ trigger }: UserMenuProps) => {
  const { logout } = useGoogleLogin();

  return (
    <Wrapper>
      <Button>{trigger}</Button>
      <Menu className='text-white bg-gray-800 p-8 shadow-lg' style={style}>
        <MenuItem className='cursor-pointer' onClick={logout}>
          Sign out
        </MenuItem>
      </Menu>
    </Wrapper>
  );
};

export default UserMenu;
