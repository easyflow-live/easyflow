import React, { useRef, useState } from 'react';
import { FaHashtag } from 'react-icons/fa';
import './BoardButton.scss';
import AddTagsModal from './AddTagsModal';

const BoardAddTags = ({ boardId }) => {
  const buttonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='board-wrapper'>
      <span
        className='board-button'
        ref={buttonRef}
        onClick={() => setIsOpen(true)}
      >
        <div className='modal-icon'>
          <FaHashtag />
        </div>
        <div className='board-header-right-text'>&nbsp;Tags</div>
      </span>

      <AddTagsModal
        isOpen={isOpen}
        buttonElement={buttonRef.current}
        boardId={boardId}
        toggleCardEditor={() => setIsOpen(!isOpen)}
      />
    </div>
  );
};

export default BoardAddTags;
