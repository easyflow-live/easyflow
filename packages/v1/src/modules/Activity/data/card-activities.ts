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
  action: CardActivity.MOVE;
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
  data: Omit<MoveCardData, 'action'>;
}) =>
  createActivity(CardActivity.MOVE, memberCreator, {
    ...data,
    action: CardActivity.MOVE,
  });

export interface EditCardData extends BaseCardData {
  list: ListDocument['ref'];
  action: CardActivity.EDIT;
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
  data: Omit<EditCardData, 'action'>;
}) =>
  createActivity(CardActivity.EDIT, memberCreator, {
    ...data,
    action: CardActivity.EDIT,
  });

export interface NewCardData extends BaseCardData {
  list: ListDocument['ref'];
  action: CardActivity.NEW;
  title: string;
}

export const trackNewActivity = ({
  memberCreator,
  data,
}: {
  memberCreator: UserDocument['ref'];
  data: Omit<NewCardData, 'action'>;
}) =>
  createActivity(CardActivity.NEW, memberCreator, {
    ...data,
    action: CardActivity.NEW,
  });

export interface RemoveCardData extends Omit<BaseCardData, 'card'> {
  text: string;
  list: ListDocument['ref'];
  action: CardActivity.REMOVE;
  title: string;
}

export const trackRemoveActivity = ({
  memberCreator,
  data,
}: {
  memberCreator: UserDocument['ref'];
  data: Omit<RemoveCardData, 'action'>;
}) =>
  createActivity(CardActivity.REMOVE, memberCreator, {
    ...data,
    action: CardActivity.REMOVE,
  });

export interface AssigneeCardData extends BaseCardData {
  list: ListDocument['ref'];
  action: CardActivity.ASSIGNEE;
  assignee: UserDocument['ref'];
  title: string;
}

export const trackAssigneeActivity = ({
  memberCreator,
  data,
}: {
  memberCreator: UserDocument['ref'];
  data: Omit<AssigneeCardData, 'action'>;
}) =>
  createActivity(CardActivity.ASSIGNEE, memberCreator, {
    ...data,
    action: CardActivity.ASSIGNEE,
  });

export interface CompleteCardData extends BaseCardData {
  list: ListDocument['ref'];
  action: CardActivity.COMPLETE;
  title: string;
  completed: boolean;
}

export const trackCompleteActivity = ({
  memberCreator,
  data,
}: {
  memberCreator: UserDocument['ref'];
  data: Omit<CompleteCardData, 'action'>;
}) =>
  createActivity(CardActivity.COMPLETE, memberCreator, {
    ...data,
    action: CardActivity.COMPLETE,
  });
