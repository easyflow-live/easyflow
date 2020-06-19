import React, { ReactChild } from 'react';
import { observer } from 'mobx-react-lite';
import Modal from 'react-modal';

import { MdClose } from 'react-icons/md';

if (typeof window !== 'undefined') {
  Modal.setAppElement('#__next');
}

interface DialogProps {
  isOpen?: boolean;
  onClose?: () => void;
  title: string;
  children: ReactChild;
  top?: number;
  width?: number;
}

const Dialog = ({
  top,
  width,
  onClose,
  isOpen,
  title,
  children,
}: DialogProps) => {
  const getStyles = (_width = 400, _top = 20) => ({
    overlay: {
      backgroundColor: 'rgba(0, 0, 0, 0.75)',
      overflowY: 'auto',
      zIndex: 30,
      transform: 'translate3d(0, 0, 0)',
    },
    content: {
      position: 'relative',
      overflow: 'hidden',
      padding: 0,
      width: _width,
      maxWidth: '98%',
      top: `${_top}vh`,
      bottom: 40,
      left: 0,
      right: 0,
      margin: `0 auto ${_top}vh`,
      border: 'none',
      borderRadius: '0.5rem',
      backgroundColor: 'transparent',
    },
  });

  return (
    <Modal
      htmlOpenClassName='ReactModal__Html--open'
      closeTimeoutMS={150}
      isOpen={isOpen}
      onRequestClose={onClose}
      style={getStyles(width, top)}
      includeDefaultStyles={false}
    >
      <div className='bg-gray-800 rounded-lg w-full'>
        <div className='flex flex-col'>
          <div className='flex items-center justify-between p-4 sm:p-8 mb-8 bg-gray-900 rounded-t-lg'>
            <h1 className='text-white text-xl'>{title}</h1>
            <button
              aria-label='Close'
              className='text-gray-500 hover:text-gray-100'
              onClick={onClose}
            >
              <MdClose size='25' />
            </button>
          </div>

          {children}
        </div>
      </div>
    </Modal>
  );
};

export default observer(Dialog);
