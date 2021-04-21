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
    <div className='p-2 h-full overflow-y-auto'>
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
    </div>
  );
};

export default observer(Activities);
