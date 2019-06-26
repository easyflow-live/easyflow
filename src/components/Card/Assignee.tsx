import { useEffect, useState, CSSProperties } from 'react';
import { observer } from 'mobx-react-lite';

import CardDocument from '../../documents/card.doc';
import { Avatar } from '../Avatar/Avatar';
import AvatarLoader from '../Avatar/AvatarLoader';
import { useEmitter } from '../../hooks/use-emitter';
import { useIsMounted } from '../../hooks/use-is-mounted';

interface AssigneeProps {
  card: CardDocument;
  style?: CSSProperties;
  className?: string;
}

const Assignee = observer(({ card, className, style }: AssigneeProps) => {
  const [assignees, setAssignee] = useState([]);
  const [loading, setLoading] = useState(false);
  const isMounted = useIsMounted();

  async function getAssigneeData() {
    if (!card.data.assignee) {
      setAssignee([]); // clear state to update the UI
      return;
    }

    setLoading(true);

    let assigneeUsers;

    if (Array.isArray(card.data.assignee)) {
      assigneeUsers = await Promise.all(
        card.data.assignee.map(async a => (await a.get()).data())
      );
    } else {
      assigneeUsers = [(await card.data.assignee.get()).data()];
    }

    // we should update the component state only if it is mounted still
    if (isMounted) {
      setAssignee(assigneeUsers);
      setLoading(false);
    }
  }

  useEffect(() => {
    getAssigneeData();
  }, [card]);

  useEmitter(
    'ASSIGNEE_UPDATED',
    ({ cardId }) => card.id === cardId && getAssigneeData(),
    [card]
  );

  if (loading) {
    return <AvatarLoader className={className} style={style} />;
  }

  return (
    assignees.length > 0 &&
    assignees.map(a => (
      <Avatar
        key={a.username}
        imgUrl={a.photo}
        username={a.username}
        className={className}
        style={style}
      />
    ))
  );
});

export default Assignee;
