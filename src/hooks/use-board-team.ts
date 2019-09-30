import { useEffect, useRef } from 'react';

import BoardDocument from '../../src/documents/board.doc';
import { useUsersData } from '../../src/store';

export const useBoardTeam = (board: BoardDocument) => {
  const ownerRef = useRef(null);

  const store = useUsersData(s => s);

  useEffect(() => {
    store.loadUsers(board.data.users);
  }, [board.data.users]);

  if (!board.data.owner) {
    return {
      assignees: [],
      owner: null,
      isLoading: store.isLoading,
    };
  }

  ownerRef.current = store.getUser(board.data.owner.id);
  const ids = (board.data.users && board.data.users.map(b => b.id)) || [];

  return {
    assignees: store.users.filter(u => ids.includes(u.id)),
    owner: ownerRef.current,
    isLoading: store.isLoading,
  };
};
