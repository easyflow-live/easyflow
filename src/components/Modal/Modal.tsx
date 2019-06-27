import React, { useState, useEffect, useLayoutEffect } from 'react';
import Modal from 'react-modal';
import { observer } from 'mobx-react-lite';
import { useRect } from '../../hooks/use-rect';
import { useThinDisplay } from '../../hooks/use-thin-display';

const useModalPositionStyle = buttonRect => {
  const [modalStyle, setModalStyle] = useState({});
  const isThinDisplay = useThinDisplay();

  useLayoutEffect(() => {
    if (!buttonRect) return;
    // Returns true if card is closer to right border than to the left
    const isCardNearRightBorder =
      window.innerWidth - buttonRect.right < buttonRect.left;

    // Check if the display is so thin that we need to trigger a centered, vertical layout
    // DO NOT CHANGE the number 550 without also changing related media-query in CardOptions.scss
    // const isThinDisplay = window.innerWidth < 550;
    // Position textarea at the same place as the card and position everything else away from closest edge
    const style = {
      content: {
        top: Math.min(
          buttonRect.top,
          window.innerHeight - buttonRect.height - 18
        ),
        left: isCardNearRightBorder ? null : buttonRect.left,
        right: isCardNearRightBorder
          ? window.innerWidth - buttonRect.right + 11
          : null,
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

    setModalStyle(isThinDisplay ? mobileStyle : style);
  }, [buttonRect, isThinDisplay]);

  return modalStyle;
};

interface MyModalProps {
  targetElement?: HTMLButtonElement;
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

  const handleRequestClose = () => toggleIsOpen();

  const targetRect = useRect(targetElement);
  const style = useModalPositionStyle(targetRect);

  return (
    <Modal
      closeTimeoutMS={150}
      isOpen={isOpen}
      onRequestClose={handleRequestClose}
      overlayClassName='modal-underlay'
      className='modal'
      style={style}
      includeDefaultStyles={false}
      onClick={handleRequestClose}
    >
      {children}
    </Modal>
  );
};

export default observer(MyModal);
