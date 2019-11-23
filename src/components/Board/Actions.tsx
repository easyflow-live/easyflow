import { observer } from 'mobx-react-lite';

import { useBoardActions } from '../../hooks/use-board-actions';
import { useUsersData } from '../../store';
import ActionCard from '../ActionCard';

const Actions = ({ board }) => {
  const actions = useBoardActions(board);
  const store = useUsersData(s => s);

  return (
    <>
      {actions &&
        actions.docs.map(action => (
          <ActionCard
            key={action.id}
            action={action}
            user={store.getUser(action.data.memberCreator.id)}
          />
        ))}
    </>
  );
};

export default observer(Actions);
