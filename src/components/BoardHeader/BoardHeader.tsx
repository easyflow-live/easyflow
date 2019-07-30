import React from 'react';
import BoardTitle from './BoardTitle';
import Team from './Team';
import './BoardHeader.css';
import BoardDocument from '../../documents/board.doc';
import BoardMenu from './BoardMenu';
import { FaList } from 'react-icons/fa';
import BoardButton from './BoardButton';
import AddNewListModal from './AddNewListModal';
import TeamListModal from './TeamListModal';
import { VerticalLine } from '../layout/VerticalLine';
import { observer } from 'mobx-react-lite';
import { useInterface } from '../providers/InterfaceProvider';

interface BoardHeaderProps {
  board: BoardDocument;
}

const BoardHeader = ({ board }: BoardHeaderProps) => {
  const { isEditable, isKioskMode } = useInterface();

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
          renderModal={props =>
            isEditable && <TeamListModal board={board} {...props} />
          }
        />
        {isEditable && !isKioskMode && (
          <>
            <VerticalLine />
            <BoardButton
              icon={<FaList />}
              text='Add list'
              renderModal={props => (
                <AddNewListModal boardId={board.id} {...props} />
              )}
            />
            <BoardMenu className='ml-2' board={board} />
          </>
        )}
      </div>
    </div>
  );
};

export default observer(BoardHeader);
