import { useEffect, useState } from 'react';

import CardDocument from 'documents/card.doc';
import { useUsersStore } from 'store';
import { sortUsersAlpha } from 'helpers/sortUsersAlpha';

export const useCardAssignees = (card: CardDocument) => {
  const { users, loadUsers } = useUsersStore();
  const [assignees, setAssignees] = useState([]);

  useEffect(() => {
    // (backwards compatibility)
    if (card.data.assignee && !Array.isArray(card.data.assignee)) {
      card.data.assignee = [card.data.assignee];
    }

    if (card.data.assignee) {
      loadUsers(card.data.assignee);
    }
  }, [card.data.assignee, loadUsers]);

  useEffect(() => {
    if (card.data.assignee) {
      const ids = card.data.assignee.map(a => a.id);
      const assignees = users
        .filter(u => ids.includes(u.id))
        .sort(sortUsersAlpha);

      setAssignees(assignees);
    }
  }, [users, card.data.assignee]);

  return { assignees };
};
