import React from 'react';
import BoardTitle from './BoardTitle';
// import ColorPicker from './ColorPicker';
import BoardDeleter from './BoardDeleter';
import './BoardHeader.scss';

const BoardHeader = ({ boardTitle, boardId }) => (
  <div className="board-header">
    <BoardTitle boardTitle={boardTitle} boardId={boardId} />
    <div className="board-header-right">
      {/* <ColorPicker /> */}
      <div className="vertical-line" />
      <BoardDeleter boardId={boardId} />
    </div>
  </div>
);

export default BoardHeader;
