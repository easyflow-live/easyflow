import { useEffect } from 'react';

import CardDocument from '../../src/documents/card.doc';
import { useCachedUsers } from '../store/users';

export const useCardAssignees = (card: CardDocument) => {
  const store = useCachedUsers();

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
  }, [card.data.assignee && card.data.assignee.length]);

  return { assignees };
};
