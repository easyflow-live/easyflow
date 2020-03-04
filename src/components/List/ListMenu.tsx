import React from 'react';
import { FaTrash, FaEllipsisH } from 'react-icons/fa';
import styled from 'styled-components';

import Menu, { MenuItem, Button } from '../shared/Menu';

interface ListMenuProps {
  title: string;
  className?: string;
  onRemove: (title: string) => Promise<void>;
}

const ListMenu = ({ title, className, onRemove }: ListMenuProps) => {
  const handleSelection = (value: string) => {
    switch (value) {
      case 'deleteList':
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
        className={`w-56 px-0 py-2 ${className}`}
        trigger={
          <StyledButton tag='button'>
            <FaEllipsisH />
          </StyledButton>
        }
        items={
          <>
            {/* <Divider className='my-2 ' /> */}
            <MenuItem value='deleteList'>
              <FaTrash className='text-red-400 mr-3' />
              <span className='text-red-400'>Delete this list</span>
            </MenuItem>
          </>
        }
      />
    </>
  );
};

export default ListMenu;

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
