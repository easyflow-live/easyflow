import React from 'react';
import Menu from 'react-burger-menu/lib/menus/slide';
import { MdClose } from 'react-icons/md';

import { useLockBodyScroll } from 'hooks/use-lock-body-scroll';

interface SideMenuProps {
  isOpen: boolean;
  title: string;
  right?: boolean;
  onClose: () => void;
  onStateChange: (state: boolean) => void;
}

const styles = {
  bmMenuWrap: {
    top: 0,
    position: 'absolute',
  },
  bmMenu: {
    overflow: 'hidden',
  },
};

interface ModalHeaderProps {
  title: string;
  onClose: () => void;
}

const ModalHeader = ({ title, onClose }: ModalHeaderProps) => (
  <div className='flex items-center justify-between border-b border-solid border-gray-700 py-3 mx-3 mb-3'>
    <p className='text-gray-400'>{title}</p>
    <button
      aria-label='Close activities'
      onClick={onClose}
      className='text-gray-400 hover:text-gray-100'
    >
      <MdClose size='22' />
    </button>
  </div>
);

const SideMenu: React.FC<SideMenuProps> = ({
  isOpen,
  title,
  right,
  onClose,
  onStateChange,
  children,
}) => {
  useLockBodyScroll(isOpen);

  return (
    <Menu
      width='320px'
      styles={styles}
      right={right}
      pageWrapId='page-wrap'
      outerContainerId={'outer-container'}
      isOpen={isOpen}
      customBurgerIcon={false}
      onStateChange={state => onStateChange(state.isOpen)}
    >
      <div className='h-full bg-gray-800 shadow-lg rounded-r'>
        <ModalHeader title={title} onClose={onClose} />

        <div style={{ height: 'calc(100% - 65px)' }}>{children}</div>
      </div>
    </Menu>
  );
};

export default SideMenu;
