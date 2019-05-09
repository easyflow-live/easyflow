import React, { useRef, useState } from 'react';
import { FaUsers } from 'react-icons/fa';
import './BoardButton.scss';
import AddMemberModal from './AddMemberModal';
import { useSession } from '../../hooks/useSession';

const BoardAddMember = () => {
  const buttonRef = useRef(null);
  const [ isOpen, setIsOpen ] = useState(false);
  const {currentBoard} = useSession();

  return (
    <div className="board-wrapper">
      <span className="board-button" ref={buttonRef} onClick={() => setIsOpen(true)}>
        <div className="modal-icon">
          <FaUsers />
        </div>
        <div className="board-header-right-text">&nbsp;Add member</div>
      </span>

      <AddMemberModal 
        isOpen={isOpen}
        buttonElement={buttonRef.current}
        boardId={currentBoard}
        toggleCardEditor={() => setIsOpen(!isOpen)}
        />
    </div>
  );
}

export default BoardAddMember;
