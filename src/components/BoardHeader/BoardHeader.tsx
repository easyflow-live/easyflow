import React from 'react';
import BoardTitle from './BoardTitle';
import BoardDeleter from './BoardDeleter';
import BoardAddMemberButton from './BoardAddMemberButton';
import BoardAddTagsButton from './BoardAddTagsButton';
import BoardAddListButton from './BoardAddListButton';
import './BoardHeader.css';

interface BoardHeaderProps {
  boardTitle: string;
  boardId: string;
}

const BoardHeader = ({ boardTitle, boardId }: BoardHeaderProps) => (
  <div className='flex justify-between items-center'>
    <BoardTitle boardTitle={boardTitle} boardId={boardId} />
    <div className='flex items-center'>
      <BoardAddListButton boardId={boardId} />
      <BoardAddMemberButton boardId={boardId} />
      <BoardAddTagsButton boardId={boardId} />
      <div className='vertical-line' />
      <BoardDeleter boardId={boardId} />
    </div>
  </div>
);

export default BoardHeader;
