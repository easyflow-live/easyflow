import React from 'react';
import {
  Button,
  Wrapper,
  Menu as AriaMenu,
  MenuItem,
} from 'react-aria-menubutton';

import './Menu.css';

interface MenuProps {
  trigger: React.ReactChild;
  header?: React.ReactChild;
  items: React.ReactChild;
  className?: string;
}

const Divider = () => (
  <div className='my-4 border-b border-solid border-gray-700' />
);

const Menu = ({ trigger, header, items, className }: MenuProps) => {
  return (
    <Wrapper className='menu relative'>
      {trigger}
      <AriaMenu
        className={`menu__menu text-white bg-gray-800 p-6 shadow-lg rounded min-w-full ${className}`}
      >
        {header && (
          <>
            <div className='menu__header'>{header}</div>
            <Divider />
          </>
        )}

        {items}
      </AriaMenu>
      <div className='popover-arrow' />
    </Wrapper>
  );
};

export default Menu;
export { MenuItem, Button, Divider };
