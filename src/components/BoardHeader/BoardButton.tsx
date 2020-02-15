import React, { useRef, useState, CSSProperties } from 'react';
import styled from 'styled-components';

interface BoardButtonProps {
  icon: React.ReactChild;
  text?: string;
  renderModal?: ({ isOpen, originRef, toggleIsOpen }) => React.ReactChild;
  onClick?: () => void;
  style?: CSSProperties;
}

const BoardButton = ({
  icon,
  text,
  renderModal,
  onClick,
  style,
}: BoardButtonProps) => {
  const buttonRef = useRef(null);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <StyledButton
        ref={buttonRef}
        onClick={() => {
          if (onClick) {
            onClick();
          }
          setIsOpen(true);
        }}
        style={style}
      >
        <div className='btn-icon'>{icon}</div>
        {text && <div className='hidden sm:block'>&nbsp;{text}</div>}
      </StyledButton>
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

const StyledButton = styled.button`
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

  & > .btn-icon {
    flex-shrink: 0;

    margin-bottom: 3px;
  }
`;
