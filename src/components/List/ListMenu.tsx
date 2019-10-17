import React from 'react';
import Router from 'next/router';
import { FaTrash, FaEllipsisH } from 'react-icons/fa';
import { toast } from 'react-toastify';
import styled from 'styled-components';

import Menu, { MenuItem, Button } from '../Menu';
import ListDocument from 'src/documents/list.doc';

interface ListMenuProps {
  list: ListDocument;
  className?: string;
}

const ListMenu = ({ list, className }: ListMenuProps) => {
  const removeList = async () => {
    try {
      await list.delete();
      Router.push('/');
      toast(`The list ${list.data.title} was removed!`);
    } catch (error) {
      toast(`An error occurred. Please, try again.`);
    }
  };

  const handleSelection = (value: string) => {
    switch (value) {
      case 'deleteList':
        removeList();
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
  padding: 8px 10px 8px 10px;
  border-radius: 3px;
  color: #fff;
  transition: background 0.1s;
  cursor: pointer;
  margin-left: 5px;
  min-height: 40px;

  &:hover,
  &:focus {
    background: rgba(0, 0, 0, 0.2);
  }
`;
