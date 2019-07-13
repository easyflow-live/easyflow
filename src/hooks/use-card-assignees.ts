import { useState, useEffect } from 'react';

import CardDocument from 'src/documents/card.doc';
import { useEmitter } from './use-emitter';
import { useIsMounted } from './use-is-mounted';

export const useCardAssignees = (card: CardDocument) => {
  const [assignees, setAssignees] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const isMounted = useIsMounted();

  async function getAssigneeData() {
    if (!card.data.assignee) {
      setAssignees([]); // clear state to update the UI
      return;
    }

    setLoading(true);

    let assigneeUsers = [];

    if (Array.isArray(card.data.assignee)) {
      assigneeUsers = await Promise.all(
        card.data.assignee.map(async a => (await a.get()).data())
      );
    } else {
      assigneeUsers = [(await card.data.assignee.get()).data()];
    }

    // we should update the component state only if it is mounted still
    if (isMounted) {
      setAssignees(assigneeUsers);
      setLoading(false);
    }
  }

  useEffect(() => {
    getAssigneeData();
  }, []);

  useEmitter(
    'ASSIGNEE_UPDATED',
    ({ cardId }) => card.id === cardId && getAssigneeData(),
    [card]
  );

  return { assignees, isLoading };
};
