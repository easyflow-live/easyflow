import { formatRelative } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren } from 'react';
import ContentLoader from 'react-content-loader';

import { User } from '../../store/users';
import ActionDocument from '../../documents/action.doc';
import { Avatar, Truncate } from '../shared';
import { useBoardsStore } from '../../store';
import {
  CardActions,
  NewCardData,
  MoveCardData,
  AssigneeCardData,
  EditCardData,
  CompleteCardData,
  RemoveCardData,
} from '../../core/actions/card.actions';

const Text = ({ children }: { children: PropsWithChildren<{}> }) => (
  <span className='text-gray-400'> {children} </span>
);

const TruncatedTitle = ({
  children,
  title,
}: PropsWithChildren<{ title: string }>) => (
  <Truncate title={title}>{children}</Truncate>
);

export const ActionCardPlaceholder = () => (
  <ContentLoader
    speed={2}
    width={300}
    height={60}
    viewBox='0 0 300 60'
    primaryColor='#cecece'
    secondaryColor='#ecebeb'
    className='p-3'
  >
    <rect x='60' y='8' rx='3' ry='3' width='88' height='6' />
    <rect x='60' y='26' rx='3' ry='3' width='152' height='6' />
    <rect x='60' y='48' rx='3' ry='3' width='202' height='6' />
    <circle cx='21' cy='31' r='20' />
  </ContentLoader>
);

const NewCardAction = ({ data }: { data: NewCardData }) => {
  const { getList } = useBoardsStore();

  const listTitle = getList(data.list.id) && getList(data.list.id).data.title;

  return (
    <>
      <Text> added a new card </Text>
      <TruncatedTitle title={data.title}>{data.title}</TruncatedTitle>
      <Text> to </Text>
      <span>{listTitle}</span>
      <Text> column</Text>
    </>
  );
};

const RemoveCardAction = ({ data }: { data: RemoveCardData }) => {
  const { getList } = useBoardsStore();

  const listTitle = getList(data.list.id) && getList(data.list.id).data.title;

  return (
    <>
      <Text> removed a card </Text>
      <TruncatedTitle title={data.title}>{data.title}</TruncatedTitle>
      <Text> from </Text>
      <span>{listTitle}</span>
      <Text> column</Text>
    </>
  );
};

const MoveCardAction = ({ data }: { data: MoveCardData }) => {
  const { getList } = useBoardsStore();

  const listBeforeTitle =
    getList(data.listBefore.id) && getList(data.listBefore.id).data.title;

  const listAfterTitle =
    getList(data.listAfter.id) && getList(data.listAfter.id).data.title;

  return (
    <>
      <Text> moved a card </Text>
      <TruncatedTitle title={data.title}>{data.title}</TruncatedTitle>
      <Text> from </Text>
      <span>{listBeforeTitle}</span>
      <Text> column to </Text>
      <span>{listAfterTitle}</span>
    </>
  );
};

const AssigneeCardAction = ({ data }: { data: AssigneeCardData }) => {
  const { getList } = useBoardsStore();

  const listTitle = getList(data.list.id) && getList(data.list.id).data.title;

  return (
    <>
      <Text> assigneed to card </Text>
      <TruncatedTitle title={data.title}>{data.title}</TruncatedTitle>
      <Text> in </Text>
      <span>{listTitle}</span>
      <Text> column</Text>
    </>
  );
};

const EditCardAction = ({ data }: { data: EditCardData }) => {
  const { getList } = useBoardsStore();

  const listTitle = getList(data.list.id) && getList(data.list.id).data.title;

  return (
    <>
      <Text> edited a card </Text>
      <TruncatedTitle title={data.title}>{data.title}</TruncatedTitle>
      <Text> in </Text>
      <span>{listTitle}</span>
      <Text> column</Text>
    </>
  );
};

const CompleteCardAction = ({ data }: { data: CompleteCardData }) => {
  const { getList } = useBoardsStore();

  const listTitle = getList(data.list.id) && getList(data.list.id).data.title;

  return (
    <>
      <Text> marked a card </Text>
      <TruncatedTitle title={data.title}>{data.title}</TruncatedTitle>
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
        <div className='flex flex-col' style={{ maxWidth: '80%' }}>
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
