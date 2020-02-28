import { useEffect, useRef } from 'react';

import BoardDocument from '../../src/documents/board.doc';
import { useUsersStore } from '../store';

export const useBoardTeam = (board: BoardDocument) => {
  const { loadUsers, isLoading, getUser, users } = useUsersStore();
  const ownerRef = useRef(null);

  useEffect(() => {
    loadUsers(board.data.users);
  }, [board.data.users, loadUsers]);

  if (!board.data.owner) {
    return {
      assignees: [],
      owner: null,
      isLoading,
    };
  }

  ownerRef.current = getUser(board.data.owner.id);
  const ids = (board.data.users && board.data.users.map(b => b.id)) || [];

  return {
    assignees: users.filter(u => ids.includes(u.id)),
    owner: ownerRef.current,
    isLoading,
  };
};
