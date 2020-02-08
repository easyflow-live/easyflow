import { formatRelative } from 'date-fns';
import { observer } from 'mobx-react-lite';

import { useBoardsData } from '../../store';
import { User } from '../../store/users';
import ActionDocument from '../../documents/action.doc';
import { Avatar } from '../shared/Avatar';
import {
  CardActions,
  NewCardData,
  MoveCardData,
  AssigneeCardData,
  EditCardData,
  CompleteCardData,
} from '../../core/actions/card.actions';

const NewCardAction = ({ data }: { data: NewCardData }) => {
  const store = useBoardsData(s => s);

  const listTitle =
    store.getList(data.list.id) && store.getList(data.list.id).data.title;

  return (
    <>
      <span className='text-gray-400'> added a new card </span>
      <span>{data.title}</span>
      <span className='text-gray-400'> to </span>
      <span>{listTitle}</span>
      <span className='text-gray-400'> column</span>
    </>
  );
};

const RemoveCardAction = ({ data }: { data: NewCardData }) => {
  const store = useBoardsData(s => s);

  const listTitle =
    store.getList(data.list.id) && store.getList(data.list.id).data.title;

  return (
    <>
      <span className='text-gray-400'> removed a card </span>
      <span>{data.title}</span>
      <span className='text-gray-400'> from </span>
      <span>{listTitle}</span>
      <span className='text-gray-400'> column</span>
    </>
  );
};

const MoveCardAction = ({ data }: { data: MoveCardData }) => {
  const store = useBoardsData(s => s);

  const listBeforeTitle =
    store.getList(data.listBefore.id) &&
    store.getList(data.listBefore.id).data.title;

  const listAfterTitle =
    store.getList(data.listAfter.id) &&
    store.getList(data.listAfter.id).data.title;

  return (
    <>
      <span className='text-gray-400'> moved a card </span>
      <span>{data.title}</span>
      <span className='text-gray-400'> from </span>
      <span>{listBeforeTitle}</span>
      <span className='text-gray-400'> column to </span>
      <span>{listAfterTitle}</span>
    </>
  );
};

const AssigneeCardAction = ({ data }: { data: AssigneeCardData }) => {
  const store = useBoardsData(s => s);

  const listTitle =
    store.getList(data.list.id) && store.getList(data.list.id).data.title;

  return (
    <>
      <span className='text-gray-400'> assigneed to card </span>
      <span>{data.title}</span>
      <span className='text-gray-400'> in </span>
      <span>{listTitle}</span>
      <span className='text-gray-400'> column</span>
    </>
  );
};

const EditCardAction = ({ data }: { data: EditCardData }) => {
  const store = useBoardsData(s => s);

  const listTitle =
    store.getList(data.list.id) && store.getList(data.list.id).data.title;

  return (
    <>
      <span className='text-gray-400'> edited a card </span>
      <span>{data.title}</span>
      <span className='text-gray-400'> in </span>
      <span>{listTitle}</span>
      <span className='text-gray-400'> column</span>
    </>
  );
};

const CompleteCardAction = ({ data }: { data: CompleteCardData }) => {
  const store = useBoardsData(s => s);

  const listTitle =
    store.getList(data.list.id) && store.getList(data.list.id).data.title;

  return (
    <>
      <span className='text-gray-400'> marked a card </span>
      <span>{data.title}</span>
      <span className='text-gray-400'> in </span>
      <span>{listTitle}</span>
      <span className='text-gray-400'> column as </span>
      <span>{data.completed ? 'completed' : 'uncompleted'}</span>
    </>
  );
};

const CardsActions = ({ data }: { data: any }) => {
  switch (data.action) {
    case CardActions.NEW:
      return <NewCardAction data={data} />;

    case CardActions.REMOVE:
      return <RemoveCardAction data={data} />;

    case CardActions.MOVE:
      return <MoveCardAction data={data} />;

    case CardActions.ASSIGNEE:
      return <AssigneeCardAction data={data} />;

    case CardActions.EDIT:
      return <EditCardAction data={data} />;

    case CardActions.COMPLETE:
      return <CompleteCardAction data={data} />;

    default:
      return null;
  }
};

interface ActionCardProps {
  action: ActionDocument;
  user: User;
}

const ActionCard = ({ action, user }: ActionCardProps) => {
  return (
    user && (
      <div className='flex items-center p-3' key={action.id}>
        <div className='mr-4 ml-2'>
          <Avatar
            username={user.username}
            src={user.photo}
            className='max-w-none'
          />
        </div>
        <div className='flex flex-col'>
          <p>
            {user.username}
            <CardsActions data={action.data.data} />
          </p>
          <p className='text-gray-600'>
            {formatRelative(new Date(action.data.date), new Date())}
          </p>
        </div>
      </div>
    )
  );
};

export default observer(ActionCard);
