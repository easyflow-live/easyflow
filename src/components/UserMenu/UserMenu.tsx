import React from 'react';

import Menu, { MenuItem, Button } from '../shared/Menu';
import { useSession } from 'hooks/use-session';

interface UserMenuProps {
  trigger: React.ReactChild;
  userName: string;
  userEmail: string;
}

const UserName = ({ name }: { name: string }) => (
  <span className='font-semibold'>{name}</span>
);
const UserEmail = ({ email }: { email: string }) => (
  <span className='font-light'>{email}</span>
);

const UserMenu = ({ trigger, userName, userEmail }: UserMenuProps) => {
  const { logout } = useSession();

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
          onClick={logout}
        >
          Sign out
        </MenuItem>
      }
    />
  );
};

export default UserMenu;
