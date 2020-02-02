import { useEffect } from 'react';

import CardDocument from '../../src/documents/card.doc';
import { useUsersData } from '../store';

export const useCardAssignees = (card: CardDocument) => {
  const store = useUsersData(s => s);

  // (backwards compatibility)
  if (card.data.assignee && !Array.isArray(card.data.assignee)) {
    card.data.assignee = [card.data.assignee];
  }

  const ids = (card.data.assignee && card.data.assignee.map(a => a.id)) || [];
  const assignees = store.users.filter(u => ids.includes(u.id));

  useEffect(() => {
    if (card.data.assignee) {
      store.loadUsers(card.data.assignee);
    }
  }, [card.data.assignee, store]);

  return { assignees };
};
