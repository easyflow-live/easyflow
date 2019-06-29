import React, { useRef, useState } from 'react';
import './BoardButton.scss';

interface BoardButtonProps {
  icon: React.ReactChild;
  text: string;
  renderModal: ({ isOpen, buttonElement, toggleIsOpen }) => React.ReactChild;
}

const BoardButton = ({ icon, text, renderModal }: BoardButtonProps) => {
  const buttonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className='board-wrapper'>
      <button
        className='board-button'
        ref={buttonRef}
        onClick={() => setIsOpen(true)}
      >
        <div className='modal-icon'>{icon}</div>
        <div className='board-header-right-text'>&nbsp;{text}</div>
      </button>
      {renderModal({
        isOpen,
        buttonElement: buttonRef,
        toggleIsOpen: () => setIsOpen(!isOpen),
      })}
    </div>
  );
};

export default BoardButton;
