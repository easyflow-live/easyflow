import { formatRelative } from 'date-fns';
import { observer } from 'mobx-react-lite';

import { useBoardsData } from '../../store';
import { User } from '../../store/users';
import ActionDocument from '../../documents/action.doc';
import { Avatar } from '../shared/Avatar';
import { ReactChild } from 'react';
import {
  CardActions,
  NewCardData,
  MoveCardData,
  AssigneeCardData,
  EditCardData,
  CompleteCardData,
  RemoveCardData,
} from '../../core/actions/card.actions';

const Text = ({ children }: { children: ReactChild }) => (
  <span className='text-gray-400'> {children} </span>
);

const NewCardAction = ({ data }: { data: NewCardData }) => {
  const store = useBoardsData(s => s);

  const listTitle =
    store.getList(data.list.id) && store.getList(data.list.id).data.title;

  return (
    <>
      <Text> added a new card </Text>
      <span>{data.title}</span>
      <Text> to </Text>
      <span>{listTitle}</span>
      <Text> column</Text>
    </>
  );
};

const RemoveCardAction = ({ data }: { data: RemoveCardData }) => {
  const store = useBoardsData(s => s);

  const listTitle =
    store.getList(data.list.id) && store.getList(data.list.id).data.title;

  return (
    <>
      <Text> removed a card </Text>
      <span>{data.title}</span>
      <Text> from </Text>
      <span>{listTitle}</span>
      <Text> column</Text>
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
      <Text> moved a card </Text>
      <span>{data.title}</span>
      <Text> from </Text>
      <span>{listBeforeTitle}</span>
      <Text> column to </Text>
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
      <Text> assigneed to card </Text>
      <span>{data.title}</span>
      <Text> in </Text>
      <span>{listTitle}</span>
      <Text> column</Text>
    </>
  );
};

const EditCardAction = ({ data }: { data: EditCardData }) => {
  const store = useBoardsData(s => s);

  const listTitle =
    store.getList(data.list.id) && store.getList(data.list.id).data.title;

  return (
    <>
      <Text> edited a card </Text>
      <span>{data.title}</span>
      <Text> in </Text>
      <span>{listTitle}</span>
      <Text> column</Text>
    </>
  );
};

const CompleteCardAction = ({ data }: { data: CompleteCardData }) => {
  const store = useBoardsData(s => s);

  const listTitle =
    store.getList(data.list.id) && store.getList(data.list.id).data.title;

  return (
    <>
      <Text> marked a card </Text>
      <span>{data.title}</span>
      <Text> in </Text>
      <span>{listTitle}</span>
      <Text> column as </Text>
      <span>{data.completed ? 'completed' : 'uncompleted'}</span>
    </>
  );
};

type Data =
  | NewCardData
  | RemoveCardData
  | MoveCardData
  | AssigneeCardData
  | EditCardData
  | CompleteCardData;

const CardsActions = ({ data }: { data: Data }) => {
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
            <CardsActions data={action.data.data as Data} />
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
