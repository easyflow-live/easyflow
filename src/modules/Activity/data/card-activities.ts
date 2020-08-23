import UserDocument from 'documents/user.doc';
import BoardDocument from 'modules/Board/data/board.doc';
import ListDocument from 'documents/list.doc';
import CardDocument from 'modules/Card/data/card.doc';
import firebaseService from 'services/firebase.service';
import { CardActivity } from 'modules/Activity/domain/card-activity';

interface BaseCardData {
  card: CardDocument['ref'];
  board: BoardDocument['ref'];
}

export interface MoveCardData extends BaseCardData {
  listBefore: ListDocument['ref'];
  listAfter: ListDocument['ref'];
  activity: CardActivity.MOVE;
  title: string;
}

const createActivity = (
  type: CardActivity,
  memberCreator: UserDocument['ref'],
  data: any
) =>
  firebaseService.createActivity({
    date: Date.now(),
    type,
    memberCreator,
    data,
  });

export const trackMoveActivity = ({
  memberCreator,
  data,
}: {
  memberCreator: UserDocument['ref'];
  data: Omit<MoveCardData, 'activity'>;
}) =>
  createActivity(CardActivity.MOVE, memberCreator, {
    ...data,
    activity: CardActivity.MOVE,
  });

export interface EditCardData extends BaseCardData {
  list: ListDocument['ref'];
  activity: CardActivity.EDIT;
  oldText: string;
  newText: string;
  title?: string;
  oldTitle: string;
  newTitle: string;
}

export const trackEditActivity = ({
  memberCreator,
  data,
}: {
  memberCreator: UserDocument['ref'];
  data: Omit<EditCardData, 'activity'>;
}) =>
  createActivity(CardActivity.EDIT, memberCreator, {
    ...data,
    activity: CardActivity.EDIT,
  });

export interface NewCardData extends BaseCardData {
  list: ListDocument['ref'];
  activity: CardActivity.NEW;
  title: string;
}

export const trackNewActivity = ({
  memberCreator,
  data,
}: {
  memberCreator: UserDocument['ref'];
  data: Omit<NewCardData, 'activity'>;
}) =>
  createActivity(CardActivity.NEW, memberCreator, {
    ...data,
    activity: CardActivity.NEW,
  });

export interface RemoveCardData extends Omit<BaseCardData, 'card'> {
  text: string;
  list: ListDocument['ref'];
  activity: CardActivity.REMOVE;
  title: string;
}

export const trackRemoveActivity = ({
  memberCreator,
  data,
}: {
  memberCreator: UserDocument['ref'];
  data: Omit<RemoveCardData, 'activity'>;
}) =>
  createActivity(CardActivity.REMOVE, memberCreator, {
    ...data,
    activity: CardActivity.REMOVE,
  });

export interface AssigneeCardData extends BaseCardData {
  list: ListDocument['ref'];
  activity: CardActivity.ASSIGNEE;
  assignee: UserDocument['ref'];
  title: string;
}

export const trackAssigneeActivity = ({
  memberCreator,
  data,
}: {
  memberCreator: UserDocument['ref'];
  data: Omit<AssigneeCardData, 'activity'>;
}) =>
  createActivity(CardActivity.ASSIGNEE, memberCreator, {
    ...data,
    activity: CardActivity.ASSIGNEE,
  });

export interface CompleteCardData extends BaseCardData {
  list: ListDocument['ref'];
  activity: CardActivity.COMPLETE;
  title: string;
  completed: boolean;
}

export const trackCompleteActivity = ({
  memberCreator,
  data,
}: {
  memberCreator: UserDocument['ref'];
  data: Omit<CompleteCardData, 'activity'>;
}) =>
  createActivity(CardActivity.COMPLETE, memberCreator, {
    ...data,
    activity: CardActivity.COMPLETE,
  });
