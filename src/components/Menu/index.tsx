import React from 'react';
import {
  Button,
  Wrapper,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
} from 'react-aria-menubutton';

import Divider from '../Divider/Divider';

import './Menu.css';

interface MenuProps {
  trigger: React.ReactChild;
  header?: React.ReactChild;
  items: React.ReactChild;
  className?: string;
  onSelection?: (value: any, event: Event) => void;
}

const Menu = ({
  trigger,
  header,
  items,
  className,
  onSelection,
}: MenuProps) => {
  return (
    <Wrapper className='menu relative' onSelection={onSelection}>
      {trigger}
      <AriaMenu
        className={`menu__menu text-white bg-gray-700 p-6 shadow-lg rounded min-w-full ${className}`}
      >
        {header && (
          <>
            <div className='menu__header'>{header}</div>
            <Divider className='my-4' />
          </>
        )}

        {items}
      </AriaMenu>
      <div className='popover-arrow' />
    </Wrapper>
  );
};

const MenuItem = ({ children, ...props }) => (
  <AriaMenuItem
    className='flex items-center cursor-pointer hover:bg-gray-800 p-3'
    {...props}
  >
    {children}
  </AriaMenuItem>
);

export default Menu;
export { MenuItem, Button, Divider };
