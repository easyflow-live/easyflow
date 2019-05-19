import React from 'react';
import BoardTitle from './BoardTitle';
// import ColorPicker from './ColorPicker';
import BoardDeleter from './BoardDeleter';
import BoardAddMember from './BoardAddMember';
import BoardAddTags from './BoardAddTags';
import './BoardHeader.scss';

interface BoardHeaderProps {
  boardTitle: string;
  boardId: string;
}

const BoardHeader = ({ boardTitle, boardId }: BoardHeaderProps) => (
  <div className='board-header'>
    <BoardTitle boardTitle={boardTitle} boardId={boardId} />
    <div className='board-header-right'>
      {/* <ColorPicker /> */}
      {<BoardAddTags boardId={boardId} />}
      <BoardAddMember boardId={boardId} />
      <div className='vertical-line' />
      <BoardDeleter boardId={boardId} />
    </div>
  </div>
);

export default BoardHeader;
