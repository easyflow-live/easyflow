import { useState, useEffect, useRef } from 'react';

import BoardDocument from 'src/documents/board.doc';
import { useEmitter } from './use-emitter';
import { useIsMounted } from './use-is-mounted';

export const useBoardTeam = (board: BoardDocument) => {
  const [assignees, setAssignees] = useState([]);
  const ownerRef = useRef(null);
  const [isLoading, setLoading] = useState(false);
  const isMounted = useIsMounted();

  async function getAssigneeData() {
    if (!board.data.owner) {
      return;
    }

    if (!board.data.users) {
      ownerRef.current = (await board.data.owner.get()).data();
      setAssignees([]); // clear state to update the UI
      return;
    }
    setLoading(true);

    const assigneeUsers = await Promise.all(
      board.data.users.map(async a => {
        const data = (await a.get()).data();

        if (data.email === board.data.owner.id) {
          ownerRef.current = data;
        }

        return data;
      })
    );

    // we should update the component state only if it is mounted still
    if (isMounted) {
      setAssignees(assigneeUsers);
      setLoading(false);
    }
  }

  useEffect(() => {
    getAssigneeData();
  }, [board.data.owner]);

  useEmitter('TEAM_MEMBER_UPDATED', () => getAssigneeData(), [board]);

  return { assignees, owner: ownerRef.current, isLoading };
};
