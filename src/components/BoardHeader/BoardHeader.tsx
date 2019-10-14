import React from 'react';
import { MdTimeline, MdViewColumn } from 'react-icons/md';
import { observer } from 'mobx-react-lite';

import BoardDocument from '../../documents/board.doc';
import { useInterface } from '../providers/InterfaceProvider';
import AddNewListModal from './AddNewListModal';
import TeamListModal from './TeamListModal';
import BoardButton from './BoardButton';
import BoardMenu from './BoardMenu';
import BoardTitle from './BoardTitle';
import Team from './Team';
import './BoardHeader.css';

interface BoardHeaderProps {
  board: BoardDocument;
}

const BoardHeader = ({ board }: BoardHeaderProps) => {
  const { isEditable, isKioskMode, setMenu } = useInterface();

  const toggleMenu = () => setMenu(true);

  return (
    <div className='flex justify-between items-center'>
      <BoardTitle
        boardTitle={board.data.title}
        boardId={board.id}
        editable={isEditable}
      />
      <div className='flex items-center'>
        <BoardButton
          style={{ paddingLeft: '18px' }}
          icon={<Team board={board} />}
          renderModal={
            isEditable
              ? props => <TeamListModal board={board} {...props} />
              : () => null
          }
        />
        {isEditable && !isKioskMode && (
          <>
            <BoardButton
              icon={<MdViewColumn size='16px' />}
              text='Add column'
              renderModal={props => (
                <AddNewListModal boardId={board.id} {...props} />
              )}
            />
            <BoardButton
              icon={<MdTimeline size='16px' />}
              text='Activity'
              onClick={toggleMenu}
            />

            <BoardMenu className='ml-2' board={board} />
          </>
        )}
      </div>
    </div>
  );
};

export default observer(BoardHeader);
