import { useEffect, useState } from 'react';

import BoardDocument from 'modules/Board/data/board.doc';
import { useSession } from 'hooks/use-session';

export const useBoard = (boardUid: string): [BoardDocument, boolean] => {
  const { userDoc } = useSession();
  const [board, setBoard] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (board) return;

    setIsLoading(true);
    if (!userDoc) {
      setBoard(new BoardDocument(`boards/${boardUid}`));
    } else if (userDoc && userDoc.boards) {
      setBoard(userDoc.boards.docs.find(d => d.id === boardUid));
    }

    setIsLoading(board && board.isLoading);
  }, [board, boardUid, userDoc]);

  return [board, isLoading];
};
