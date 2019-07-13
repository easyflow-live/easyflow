import React, {
  useState,
  useEffect,
  useLayoutEffect,
  MutableRefObject,
  useRef,
} from 'react';
import Modal from 'react-modal';
import { observer } from 'mobx-react-lite';
import { useRect } from '../../hooks/use-rect';
import { useThinDisplay } from '../../hooks/use-thin-display';

const useModalPositionStyle = (targetRect, modalRect) => {
  const [modalStyle, setModalStyle] = useState(null);
  const isThinDisplay = useThinDisplay();

  useLayoutEffect(() => {
    if (!targetRect || !modalRect) return;
    // Returns true if card is closer to right border than to the left
    const isCardNearRightBorder =
      window.innerWidth - targetRect.right < targetRect.left;

    const freeSpace = window.innerHeight - targetRect.top;

    const hasSpace = modalRect.height <= freeSpace;

    // Check if the display is so thin that we need to trigger a centered, vertical layout
    // DO NOT CHANGE the number 550 without also changing related media-query in CardOptions.scss
    // const isThinDisplay = window.innerWidth < 550;
    // Position textarea at the same place as the card and position everything else away from closest edge
    const height = Math.min(
      targetRect.top,
      window.innerHeight - targetRect.height - 18
    );

    const awayFromScreen = height < 0;

    const SCREEN_PADDING = 26;
    const diff = modalRect.height - freeSpace - SCREEN_PADDING;

    const style = {
      content: {
        top: awayFromScreen
          ? SCREEN_PADDING
          : hasSpace
          ? height
          : height - diff,
        left: isCardNearRightBorder ? null : targetRect.left,
        right: isCardNearRightBorder
          ? window.innerWidth - targetRect.right
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
  }, [targetRect, modalRect, isThinDisplay]);

  return modalStyle;
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
  useEffect(() => {
    modalRef.current = document.querySelector(
      '.ReactModalPortal > .ReactModal__Overlay > .modal'
    );
  });
  const [modalRect, refreshModalRect] = useRect(modalRef);
  const [targetRect, refreshRect] = useRect(targetElement);

  useEffect(() => {
    refreshRect();
    refreshModalRect();
  }, [isOpen]);
  const style = useModalPositionStyle(targetRect, modalRect);
  console.log(style);

  const handleRequestClose = () => toggleIsOpen();

  return (
    style && (
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
    )
  );
};

export default observer(MyModal);
