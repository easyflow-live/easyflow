import React from 'react';
import Menu from 'react-burger-menu/lib/menus/slide';
import { MdClose } from 'react-icons/md';

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

const SideMenu: React.FC<SideMenuProps> = ({
  isOpen,
  title,
  right,
  onClose,
  onStateChange,
  children,
}) => {
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
      <div className='overflow-hidden h-full flex flex-col bg-gray-750 shadow-lg rounded-l text-white'>
        <div className='flex items-center justify-between'>
          <p className='p-3 text-gray-500 uppercase'>{title}</p>
          <button
            aria-label='Close activities'
            onClick={onClose}
            className='p-3 text-gray-500 hover:text-gray-100'
          >
            <MdClose size='25' />
          </button>
        </div>
        <div className='h-full overflow-y-auto'>{children}</div>
      </div>
    </Menu>
  );
};

export default SideMenu;
