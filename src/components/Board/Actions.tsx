import { observer } from 'mobx-react-lite';

import { useBoardActions } from '../../hooks/use-board-actions';
import BoardDocument from '../../documents/board.doc';
import { useUsersData } from '../../store';
import ActionCard from '../ActionCard';

interface ActionsProps {
  board: BoardDocument;
}

const Actions = ({ board }: ActionsProps) => {
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
