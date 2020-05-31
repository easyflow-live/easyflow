import React from 'react';
import { FaTrash, FaEllipsisH } from 'react-icons/fa';
import styled from 'styled-components';

import Menu, { MenuItem, Button } from '../shared/Menu';

interface CardMenuProps {
  title: string;
  onRemove: (title: string) => Promise<void>;
}

const CardMenu = ({ title, onRemove }: CardMenuProps) => {
  const handleSelection = (value: string) => {
    switch (value) {
      case 'delete':
        onRemove(title);
        break;

      default:
        break;
    }
  };

  return (
    <>
      <Menu
        onSelection={handleSelection}
        className='w-56 px-0 py-2'
        trigger={
          <StyledButton className='mr-4' tag='button'>
            <FaEllipsisH />
          </StyledButton>
        }
        items={
          <>
            {/* <Divider className='my-2 ' /> */}
            <MenuItem value='delete'>
              <FaTrash className='text-red-400 mr-3' />
              <span className='text-red-400'>Delete this card</span>
            </MenuItem>
          </>
        }
      />
    </>
  );
};

export default CardMenu;

const StyledButton = styled(Button)`
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0px 10px;
  border-radius: 3px;
  color: #fff;
  transition: background 0.1s;
  cursor: pointer;
  margin-left: 5px;
  min-height: 37px;

  &:hover,
  &:focus {
    background: rgba(0, 0, 0, 0.2);
  }
`;
