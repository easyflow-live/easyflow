import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import classNames from 'classnames';
import dynamic from 'next/dynamic';

import AddTagsModal from '../BoardHeader/AddTagsModal';
import { observer } from 'mobx-react-lite';
import { useInterface } from '../providers/InterfaceProvider';
import './BoardMenu.css';

const Actions = dynamic(() => import('./Actions'));

const BoardMenu = ({ board }) => {
  const { isMenuOpen, setMenu } = useInterface();
  const [isTagsModalOpen, setIsTagsModalOpen] = useState(false);

  const onClose = () => setMenu(false);

  const toggleTagsModal = () => setIsTagsModalOpen(o => !o);

  return (
    <div
      className={classNames(
        'BoardMenu-container transition-all block absolute bottom-0 right-0 z-50',
        {
          'BoardMenu-container--open': isMenuOpen,
        }
      )}
      style={{ top: '0' }}
    >
      <div className='h-full flex flex-col bg-gray-750 shadow-lg rounded-l text-white'>
        <div className='flex items-center justify-between'>
          <p className='p-3 text-gray-500 uppercase'>Activity</p>
          <button
            aria-label='Close activities'
            onClick={onClose}
            className='p-3 text-gray-500 hover:text-gray-100'
          >
            <MdClose size='25' />
          </button>
        </div>

        <div
          className='max-w-full overflow-y-auto'
          style={{ height: 'calc(100% - 49px)' }}
        >
          {isMenuOpen && <Actions board={board} />}
        </div>
      </div>

      <AddTagsModal
        board={board}
        isOpen={isTagsModalOpen}
        toggleIsOpen={toggleTagsModal}
      />
    </div>
  );
};

export default observer(BoardMenu);
