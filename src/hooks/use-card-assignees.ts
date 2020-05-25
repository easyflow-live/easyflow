import { useEffect } from 'react';

import CardDocument from '../../src/documents/card.doc';
import { useUsersStore } from '../store';
import { sortUsersAlpha } from '../helpers/sortUsersAlpha';

export const useCardAssignees = (card: CardDocument) => {
  const { users, loadUsers } = useUsersStore();

  // (backwards compatibility)
  if (card.data.assignee && !Array.isArray(card.data.assignee)) {
    card.data.assignee = [card.data.assignee];
  }

  const ids = (card.data.assignee && card.data.assignee.map(a => a.id)) || [];
  const assignees = users.filter(u => ids.includes(u.id)).sort(sortUsersAlpha);

  useEffect(() => {
    if (card.data.assignee) {
      loadUsers(card.data.assignee);
    }
  }, [card.data.assignee, loadUsers]);

  return { assignees };
};
