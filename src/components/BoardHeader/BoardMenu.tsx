import React, { useState } from 'react';
import Router from 'next/router';
import { FaTrash, FaHashtag } from 'react-icons/fa';
import { toast } from 'react-toastify';

import BoardDocument from '../../documents/board.doc';
import Menu, { MenuItem, Button, Divider } from '../Menu';
import AddTagsModal from './AddTagsModal';
import { MdSettings } from 'react-icons/md';
import styled from 'styled-components';

interface BoardMenuProps {
  board: BoardDocument;
  className: string;
}

const BoardMenu = ({ board, className }: BoardMenuProps) => {
  const [isTagsModalOpen, setIsTagsModalOpen] = useState(false);

  const toggleTagsModal = () => setIsTagsModalOpen(o => !o);

  const removeBoard = async () => {
    try {
      await board.delete();
      Router.push('/');
      toast(`The board ${board.data.title} was removed!`);
    } catch (error) {
      toast(`An error occurred. Please, try again.`);
    }
  };

  const handleSelection = (value: string) => {
    switch (value) {
      case 'tags':
        toggleTagsModal();
        break;

      case 'deleteBoard':
        removeBoard();
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
            <MdSettings size='16px' />
            <div className='hidden sm:block'>&nbsp;Menu</div>
          </StyledButton>
        }
        items={
          <>
            <MenuItem value='tags'>
              <FaHashtag className='text-white mr-3' />
              <span className='text-white'>Tags</span>
            </MenuItem>
            <Divider className='my-2 ' />
            <MenuItem value='deleteBoard'>
              <FaTrash className='text-red-400 mr-3' />
              <span className='text-red-400'>Delete board</span>
            </MenuItem>
          </>
        }
      />

      <AddTagsModal
        board={board}
        isOpen={isTagsModalOpen}
        toggleIsOpen={toggleTagsModal}
      />
    </>
  );
};

export default BoardMenu;

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
