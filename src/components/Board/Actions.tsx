import { observer } from 'mobx-react-lite';

import BoardDocument from '../../documents/board.doc';
import { useUsersData } from '../../store';
import ActionCard, { ActionCardPlaceholder } from '../ActionCard';

interface ActionsProps {
  board: BoardDocument;
}

const Actions = ({ board }: ActionsProps) => {
  const store = useUsersData(s => s);

  return (
    <>
      {board.actions.isLoading ? (
        <>
          <ActionCardPlaceholder />
          <ActionCardPlaceholder />
          <ActionCardPlaceholder />
        </>
      ) : (
        board.actions.docs.map(action => (
          <ActionCard
            key={action.id}
            action={action}
            user={store.getUser(action.data.memberCreator.id)}
          />
        ))
      )}
    </>
  );
};

export default observer(Actions);
