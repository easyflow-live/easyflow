import React from 'react';

import BoardDocument from '../documents/board.doc';
import { useSession } from './use-session';

export const useBoard = (boardUid: string): [BoardDocument, boolean] => {
  const { userDoc } = useSession();
  const [board, setBoard] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  React.useEffect(() => {
    if (board) return;

    if (!userDoc) {
      setBoard(new BoardDocument(`boards/${boardUid}`));
    } else if (userDoc && userDoc.boards) {
      setBoard(userDoc.boards.docs.find(d => d.id === boardUid));
    }

    board && setIsLoading(board.isLoading);
  }, [boardUid]);

  return [board, isLoading];
};
