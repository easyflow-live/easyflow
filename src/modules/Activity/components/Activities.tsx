import { observer } from 'mobx-react-lite';

import BoardDocument from 'modules/Board/data/board.doc';
import { useUsersStore } from 'store';
import ActivityCard, {
  ActivityCardPlaceholder,
} from 'modules/Activity/components/ActivityCard';

interface ActivitiesProps {
  board: BoardDocument;
}

const Activities = ({ board }: ActivitiesProps) => {
  const { getUser } = useUsersStore();

  return (
    <>
      {board.actions.isLoading ? (
        <>
          <ActivityCardPlaceholder />
          <ActivityCardPlaceholder />
          <ActivityCardPlaceholder />
        </>
      ) : (
        board.actions.docs.map(action => (
          <ActivityCard
            key={action.id}
            activity={action}
            user={getUser(action.data.memberCreator.id)}
          />
        ))
      )}
    </>
  );
};

export default observer(Activities);
