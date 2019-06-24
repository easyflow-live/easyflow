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
  const [assignee, setAssignee] = useState(null);
  const [loading, setLoading] = useState(false);
  const isMounted = useIsMounted();

  async function getAssigneeData() {
    if (!card.data.assignee) {
      setAssignee(null); // clear state to update the UI
      return;
    }

    setLoading(true);
    const assigneeUser = (await card.data.assignee.get()).data();

    // we should update the component state only if it is mounted still
    if (isMounted) {
      setAssignee(assigneeUser);
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
    assignee && (
      <Avatar
        imgUrl={assignee.photo}
        username={assignee.username}
        className={className}
        style={style}
      />
    )
  );
});

export default Assignee;
