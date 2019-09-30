import UserDocument from '../../documents/user.doc';
import BoardDocument from '../../documents/board.doc';
import ListDocument from '../../documents/list.doc';
import CardDocument from '../../documents/card.doc';
import firebaseService from '../../services/firebase.service';
import { Actions } from './types';

enum CardActions {
  MOVE = 'move',
  EDIT = 'edit',
  NEW = 'new',
  REMOVE = 'remove',
  ASSIGNEE = 'assignee',
}

interface BaseCardData {
  card: CardDocument['ref'];
  board: BoardDocument['ref'];
}

interface MoveCardData extends BaseCardData {
  listBefore: ListDocument['ref'];
  listAfter: ListDocument['ref'];
  action: CardActions.MOVE;
}

const createAction = (
  type: Actions,
  memberCreator: UserDocument['ref'],
  data: any
) =>
  firebaseService.createAction({
    date: Date.now(),
    type,
    memberCreator,
    data,
  });

export const moveCardAction = ({
  memberCreator,
  data,
}: {
  memberCreator: UserDocument['ref'];
  data: Omit<MoveCardData, 'action'>;
}) =>
  createAction(Actions.UPDATE_CARD, memberCreator, {
    ...data,
    action: CardActions.MOVE,
  });

interface EditCardData extends BaseCardData {
  list: ListDocument['ref'];
  action: CardActions.MOVE;
  oldText: string;
  newText: string;
}

export const editCardAction = ({
  memberCreator,
  data,
}: {
  memberCreator: UserDocument['ref'];
  data: Omit<EditCardData, 'action'>;
}) =>
  createAction(Actions.UPDATE_CARD, memberCreator, {
    ...data,
    action: CardActions.EDIT,
  });

interface NewCardData extends BaseCardData {
  list: ListDocument['ref'];
  action: CardActions.MOVE;
}

export const newCardAction = ({
  memberCreator,
  data,
}: {
  memberCreator: UserDocument['ref'];
  data: Omit<NewCardData, 'action'>;
}) =>
  createAction(Actions.UPDATE_CARD, memberCreator, {
    ...data,
    action: CardActions.NEW,
  });

interface RemoveCardData extends Omit<BaseCardData, 'card'> {
  text: string;
  list: ListDocument['ref'];
  action: CardActions.REMOVE;
}

export const removeCardAction = ({
  memberCreator,
  data,
}: {
  memberCreator: UserDocument['ref'];
  data: Omit<RemoveCardData, 'action'>;
}) =>
  createAction(Actions.UPDATE_CARD, memberCreator, {
    ...data,
    action: CardActions.REMOVE,
  });

interface AssigneeCardData extends BaseCardData {
  list: ListDocument['ref'];
  action: CardActions.ASSIGNEE;
  assignee: UserDocument['ref'];
}

export const assigneeCardAction = ({
  memberCreator,
  data,
}: {
  memberCreator: UserDocument['ref'];
  data: Omit<AssigneeCardData, 'action'>;
}) =>
  createAction(Actions.UPDATE_CARD, memberCreator, {
    ...data,
    action: CardActions.ASSIGNEE,
  });
