import React, { useRef, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import './BoardButton.scss';
import AddMemberModal from './AddMemberModal';

const BoardAddMember = ({ boardId }) => {
  const buttonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='board-wrapper'>
      <button
        className='board-button'
        ref={buttonRef}
        onClick={() => setIsOpen(true)}
      >
        <div className='modal-icon'>
          <FaUsers />
        </div>
        <div className='board-header-right-text'>&nbsp;Add member</div>
      </button>

      <AddMemberModal
        isOpen={isOpen}
        buttonElement={buttonRef.current}
        boardId={boardId}
        toggleCardEditor={() => setIsOpen(!isOpen)}
      />
    </div>
  );
};

export default BoardAddMember;
