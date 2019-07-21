import React, { useRef, useState, CSSProperties } from 'react';
import './BoardButton.scss';

interface BoardButtonProps {
  icon: React.ReactChild;
  text?: string;
  renderModal?: ({ isOpen, originRef, toggleIsOpen }) => React.ReactChild;
  style?: CSSProperties;
}

const BoardButton = ({ icon, text, renderModal, style }: BoardButtonProps) => {
  const buttonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button
        className='board-button'
        ref={buttonRef}
        onClick={() => setIsOpen(true)}
        style={style}
      >
        <div className='modal-icon'>{icon}</div>
        {text && <div className='board-header-right-text'>&nbsp;{text}</div>}
      </button>
      {renderModal &&
        renderModal({
          isOpen,
          originRef: buttonRef,
          toggleIsOpen: () => setIsOpen(!isOpen),
        })}
    </>
  );
};

export default BoardButton;
