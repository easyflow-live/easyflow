import React from 'react';
import BoardTitle from './BoardTitle';
import BoardDeleter from './BoardDeleter';
import BoardAddMember from './BoardAddMember';
import BoardAddTags from './BoardAddTags';
import './BoardHeader.css';

interface BoardHeaderProps {
  boardTitle: string;
  boardId: string;
}

const BoardHeader = ({ boardTitle, boardId }: BoardHeaderProps) => (
  <div className='flex justify-between items-center'>
    <BoardTitle boardTitle={boardTitle} boardId={boardId} />
    <div className='flex items-center'>
      <BoardAddTags boardId={boardId} />
      <BoardAddMember boardId={boardId} />
      <div className='vertical-line' />
      <BoardDeleter boardId={boardId} />
    </div>
  </div>
);

export default BoardHeader;
