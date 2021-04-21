import React, { useState, useEffect, MutableRefObject, useRef } from 'react';
import Modal from 'react-modal';
import { observer } from 'mobx-react-lite';
import { useRect } from '../../hooks/use-rect';
import { useThinDisplay } from '../../hooks/use-thin-display';

const useModalPositionStyle = (
  targetRect: ClientRect,
  modalRect: ClientRect
) => {
  const [style, setStyle] = useState({});
  const isThinDisplay = useThinDisplay();

  useEffect(() => {
    if (!targetRect || !modalRect) return;

    // Returns true if card is closer to right border than to the left
    const isCardNearRightBorder =
      window.innerWidth - targetRect.right < targetRect.left;

    const freeSpace = window.innerHeight - targetRect.top;

    const hasSpace = modalRect.height <= freeSpace;

    const height = Math.min(
      targetRect.top,
      window.innerHeight - targetRect.height - 18
    );

    const awayFromScreen = height < 0;

    const SCREEN_PADDING = 26;
    const diff = targetRect.top - modalRect.height + targetRect.height;

    const top = awayFromScreen ? SCREEN_PADDING : hasSpace ? height : diff;
    const left = isCardNearRightBorder ? null : targetRect.left;
    const right = isCardNearRightBorder
      ? window.innerWidth - targetRect.right
      : null;

    const desktopStyle = {
      content: {
        top,
        left,
        right,
        flexDirection: isCardNearRightBorder ? 'row-reverse' : 'row',
      },
    };

    // For layouts that are less wide than 550px, let the modal take up the entire width at the top of the screen
    const mobileStyle = {
      content: {
        flexDirection: 'column',
        top: 3,
        left: 3,
        right: 3,
      },
    };

    setStyle(isThinDisplay ? mobileStyle : desktopStyle);
  }, [targetRect, modalRect, isThinDisplay]);

  return style;
};

interface MyModalProps {
  targetElement?: MutableRefObject<HTMLElement>;
  isOpen?: boolean;
  toggleIsOpen?(): void;
  children: React.ReactChild;
}

const MyModal = ({
  targetElement,
  isOpen,
  toggleIsOpen,
  children,
}: MyModalProps) => {
  useEffect(() => {
    Modal.setAppElement('#__next');
  }, []);

  const modalRef = useRef(null);
  const [modalRect, refreshModalRect] = useRect(modalRef);
  const [targetRect, refreshRect] = useRect(targetElement);
  const style = useModalPositionStyle(targetRect, modalRect);

  const handleRequestClose = () => toggleIsOpen();

  const afterOpenModal = () => {
    refreshRect();
    refreshModalRect();
  };

  return (
    <Modal
      contentRef={node => (modalRef.current = node)}
      closeTimeoutMS={150}
      isOpen={isOpen}
      onRequestClose={handleRequestClose}
      overlayClassName='modal-underlay'
      className='modal'
      style={style}
      includeDefaultStyles={false}
      onClick={handleRequestClose}
      onAfterOpen={afterOpenModal}
    >
      {children}
    </Modal>
  );
};

export default observer(MyModal);
