import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import classNames from 'classnames';
import dynamic from 'next/dynamic';
import { observer } from 'mobx-react-lite';

import BoardDocument from 'documents/board.doc';

import { useInterface } from 'components/providers/InterfaceProvider';
import AddTagsModal from 'modules/Board/components/BoardHeader/AddTagsModal';

import styles from './BoardMenu.module.css';

const Actions = dynamic(() => import('components/shared/Actions'));

interface BoardMenuProps {
  board: BoardDocument;
}

const BoardMenu = ({ board }: BoardMenuProps) => {
  const { isMenuOpen, setMenu } = useInterface();
  const [isTagsModalOpen, setIsTagsModalOpen] = useState(false);

  const onClose = () => setMenu(false);

  const toggleTagsModal = () => setIsTagsModalOpen(o => !o);

  return (
    <div
      className={classNames(
        styles.BoardMenu,
        'transition-all block absolute bottom-0 right-0 z-50',
        {
          [styles.BoardMenuOpen]: isMenuOpen,
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
