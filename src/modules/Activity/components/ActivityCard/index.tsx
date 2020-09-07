import { formatRelative } from 'date-fns';
import { observer } from 'mobx-react-lite';
import { PropsWithChildren } from 'react';
import ContentLoader from 'react-content-loader';

import { User } from 'store/users';
import ActivityDocument from 'modules/Activity/data/activity.doc';
import { Avatar } from 'components/shared';
import { useBoardsStore } from 'store';
import { CardActivity } from 'modules/Activity/domain/card-activity';
import {
  NewCardData,
  MoveCardData,
  AssigneeCardData,
  EditCardData,
  CompleteCardData,
  RemoveCardData,
} from 'modules/Activity/data/card-activities';

const Text = ({ children }: { children: PropsWithChildren<{}> }) => (
  <span className='text-gray-400'> {children} </span>
);

const Title = ({ children, title }: PropsWithChildren<{ title: string }>) => (
  <span className='break-words' title={title}>
    {children}
  </span>
);

export const ActivityCardPlaceholder = () => (
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

const NewCardActivity = ({ data }: { data: NewCardData }) => {
  const { getList } = useBoardsStore();

  const listTitle = getList(data.list.id) && getList(data.list.id).data.title;

  return (
    <>
      <Text> added a new card </Text>
      <Title title={data.title}>{data.title}</Title>
      <Text> to </Text>
      <span>{listTitle}</span>
      <Text> column</Text>
    </>
  );
};

const RemoveCardActivity = ({ data }: { data: RemoveCardData }) => {
  const { getList } = useBoardsStore();

  const listTitle = getList(data.list.id) && getList(data.list.id).data.title;

  return (
    <>
      <Text> removed a card </Text>
      <Title title={data.title}>{data.title}</Title>
      <Text> from </Text>
      <span>{listTitle}</span>
      <Text> column</Text>
    </>
  );
};

const MoveCardActivity = ({ data }: { data: MoveCardData }) => {
  const { getList } = useBoardsStore();

  const listBeforeTitle =
    getList(data.listBefore.id) && getList(data.listBefore.id).data.title;

  const listAfterTitle =
    getList(data.listAfter.id) && getList(data.listAfter.id).data.title;

  return (
    <>
      <Text> moved a card </Text>
      <Title title={data.title}>{data.title}</Title>
      <Text> from </Text>
      <span>{listBeforeTitle}</span>
      <Text> column to </Text>
      <span>{listAfterTitle}</span>
    </>
  );
};

const AssigneeCardActivity = ({ data }: { data: AssigneeCardData }) => {
  const { getList } = useBoardsStore();

  const listTitle = getList(data.list.id) && getList(data.list.id).data.title;

  return (
    <>
      <Text> assigneed to card </Text>
      <Title title={data.title}>{data.title}</Title>
      <Text> in </Text>
      <span>{listTitle}</span>
      <Text> column</Text>
    </>
  );
};

const EditCardActivity = ({ data }: { data: EditCardData }) => {
  const { getList } = useBoardsStore();

  const listTitle = getList(data.list.id) && getList(data.list.id).data.title;

  const difTitle = data.oldTitle !== data.newTitle;

  return (
    <>
      <Text> edited a card </Text>
      {difTitle ? (
        <>
          <Text> from title </Text>
          <Title title={data.oldTitle}>{data.oldTitle}</Title>
          <Text> to </Text>
          <Title title={data.newTitle}>{data.newTitle}</Title>
        </>
      ) : (
        <Title title={data.title}>{data.title}</Title>
      )}
      <Text> in </Text>
      <span>{listTitle}</span>
      <Text> column</Text>
    </>
  );
};

const CompleteCardActivity = ({ data }: { data: CompleteCardData }) => {
  const { getList } = useBoardsStore();

  const listTitle = getList(data.list.id) && getList(data.list.id).data.title;

  return (
    <>
      <Text> marked a card </Text>
      <Title title={data.title}>{data.title}</Title>
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

const CardsActivities = ({ data }: { data: Data }) => {
  switch (data.action) {
    case CardActivity.NEW:
      return <NewCardActivity data={data} />;

    case CardActivity.REMOVE:
      return <RemoveCardActivity data={data} />;

    case CardActivity.MOVE:
      return <MoveCardActivity data={data} />;

    case CardActivity.ASSIGNEE:
      return <AssigneeCardActivity data={data} />;

    case CardActivity.EDIT:
      return <EditCardActivity data={data} />;

    case CardActivity.COMPLETE:
      return <CompleteCardActivity data={data} />;

    default:
      return null;
  }
};

interface ActivityCardProps {
  activity: ActivityDocument;
  user: User;
}

const ActivityCard = ({ activity, user }: ActivityCardProps) => {
  return (
    user && (
      <div className='relative ml-10 mb-3' key={activity.id}>
        <div className='absolute l-10' style={{ left: '-40px', top: '6px' }}>
          <Avatar
            username={user.username}
            src={user.photo}
            className='max-w-none'
          />
        </div>
        <div className='flex flex-col'>
          <p className='text-white'>
            {user.username}
            <CardsActivities data={activity.data.data as Data} />
          </p>
          <p className='text-gray-600'>
            {formatRelative(new Date(activity.data.date), new Date())}
          </p>
        </div>
      </div>
    )
  );
};

export default observer(ActivityCard);
