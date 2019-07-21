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

interface BoardHeaderProps {
  boardTitle: string;
  boardId: string;
  board: BoardDocument;
}

const BoardHeader = ({ boardTitle, boardId, board }: BoardHeaderProps) => {
  return (
    <div className='flex justify-between items-center'>
      <BoardTitle boardTitle={boardTitle} boardId={boardId} />
      <div className='flex items-center'>
        <BoardButton
          style={{ paddingLeft: '18px' }}
          icon={<Team board={board} />}
          renderModal={props => <TeamListModal board={board} {...props} />}
        />
        <VerticalLine />
        <BoardButton
          icon={<FaList />}
          text='Add list'
          renderModal={props => (
            <AddNewListModal boardId={board.id} {...props} />
          )}
        />
        <BoardMenu className='ml-2' board={board} />
      </div>
    </div>
  );
};

export default BoardHeader;
