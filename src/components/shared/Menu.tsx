import React from 'react';
import {
  Button,
  Wrapper,
  Menu as AriaMenu,
  MenuItem as AriaMenuItem,
} from 'react-aria-menubutton';
import classNames from 'classnames';
import styled from 'styled-components';

import Divider from './Divider';

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
      <StyledMenu
        className={classNames(
          'menu__menu flex flex-col mt-3 absolute z-10 right-0 text-white bg-gray-700 p-6 shadow-lg rounded min-w-full',
          className
        )}
      >
        {header && (
          <>
            <div>{header}</div>
            <Divider className='my-4' />
          </>
        )}

        {items}
      </StyledMenu>
      <div className='popover-arrow' />
    </Wrapper>
  );
};

const MenuItem = props => (
  <AriaMenuItem
    className='flex items-center cursor-pointer hover:bg-gray-800 p-3'
    {...props}
  />
);

export default Menu;
export { MenuItem, Button, Divider };

const StyledMenu = styled(AriaMenu)`
  & ~ .popover-arrow {
    position: absolute;
    left: 50%;
    margin-left: -7px;
    top: 99%;
    clip: rect(0 18px 14px -4px);
  }

  & ~ .popover-arrow:after {
    content: '';
    display: block;
    width: 14px;
    height: 14px;
    background: #4a5568;
    transform: rotate(45deg) translate(6px, 6px);
    box-shadow: -1px -1px 1px -1px rgba(0, 0, 0, 0.54);
  }
`;
