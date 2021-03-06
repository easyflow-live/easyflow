import React, { useState } from 'react';
import { FaArchive, FaHashtag } from 'react-icons/fa';
import styled from 'styled-components';
import { MdSettings } from 'react-icons/md';

import BoardDocument from 'modules/Board/data/board.doc';
import Menu, { MenuItem, Button, Divider } from 'components/shared/Menu';
import AddTagsModal from './AddTagsModal';

interface BoardMenuProps {
  board: BoardDocument;
  isOwner: boolean;
  className: string;
  onRemove: () => void;
}

const BoardMenu = ({ board, isOwner, className, onRemove }: BoardMenuProps) => {
  const [isTagsModalOpen, setIsTagsModalOpen] = useState(false);

  const toggleTagsModal = () => setIsTagsModalOpen(o => !o);

  const handleSelection = async (value: string) => {
    switch (value) {
      case 'tags':
        toggleTagsModal();
        break;

      case 'deleteBoard':
        onRemove();
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
              <FaArchive className='text-red-400 mr-3' />
              <span className='text-red-400'>
                {isOwner ? 'Archive board' : 'Leave board'}
              </span>
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
  border-radius: 0.25rem;
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
