import { useState } from 'react';
import { MdClose } from 'react-icons/md';
import classNames from 'classnames';

import { useBoardActions } from '../../hooks/use-board-actions';
import { useUsersData } from '../../store';
import AddTagsModal from '../BoardHeader/AddTagsModal';
import { observer } from 'mobx-react-lite';
import { useInterface } from '../providers/InterfaceProvider';
import ActionCard from '../ActionCard';
import './BoardMenu.css';

const BoardMenu = ({ board }) => {
  const actions = useBoardActions(board);
  const { isMenuOpen, setMenu } = useInterface();
  const [isTagsModalOpen, setIsTagsModalOpen] = useState(false);
  const store = useUsersData(s => s);

  const onClose = () => setMenu(false);

  const toggleTagsModal = () => setIsTagsModalOpen(o => !o);

  return (
    <div
      className={classNames(
        'BoardMenu-container block absolute bottom-0 right-0 z-50',
        {
          'BoardMenu-container--open': isMenuOpen,
        }
      )}
      style={{ top: '0' }}
    >
      <div
        className={`BoardMenu flex flex-col bg-gray-750 shadow-lg rounded-l text-white`}
      >
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
          {actions &&
            actions.docs.map(action => (
              <ActionCard
                key={action.id}
                action={action}
                user={store.getUser(action.data.memberCreator.id)}
              />
            ))}
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
