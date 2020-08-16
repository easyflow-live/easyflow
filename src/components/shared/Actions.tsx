import { observer } from 'mobx-react-lite';

import BoardDocument from '../../documents/board.doc';
import { useUsersStore } from '../../store';
import ActionCard, { ActionCardPlaceholder } from './ActionCard';

interface ActionsProps {
  board: BoardDocument;
}

const Actions = ({ board }: ActionsProps) => {
  const { getUser } = useUsersStore();

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
            user={getUser(action.data.memberCreator.id)}
          />
        ))
      )}
    </>
  );
};

export default observer(Actions);
