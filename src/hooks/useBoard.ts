import React from 'react';
import BoardDocument from '../documents/board.doc';
import { useSession } from './useSession';

export const useBoard = (boardUid: string): BoardDocument => {
  const { userDoc } = useSession();
  const [board, setBoard] = React.useState(null);

  React.useEffect(() => {
    if (board) return;

    if (!userDoc) {
      setBoard(new BoardDocument(`boards/${boardUid}`));
    } else if (userDoc && userDoc.boards) {
      setBoard(userDoc.boards.docs.find(d => d.id === boardUid));
    }
  }, [boardUid]);

  return board;
};
