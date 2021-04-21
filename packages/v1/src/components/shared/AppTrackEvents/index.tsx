import { observer } from 'mobx-react-lite';

import { useEmitter } from 'hooks/use-emitter';
import * as cardsActivities from 'modules/Activity/data/card-activities';
import { useBoardsStore } from 'store';
import { useSession } from 'hooks/use-session';

const AppTrackEvents = () => {
  const { currentBoard, getList } = useBoardsStore();
  const { userDoc } = useSession();

  useEmitter(
    'REMOVE_CARD',
    ({ title, text, listId }) =>
      cardsActivities.trackRemoveActivity({
        memberCreator: userDoc.ref,
        data: {
          title,
          text,
          board: currentBoard.ref,
          list: getList(listId).ref,
        },
      }),
    [userDoc, currentBoard]
  );

  useEmitter(
    'COMPLETE_CARD',
    ({ cardId, listId, title, completed }) =>
      cardsActivities.trackCompleteActivity({
        memberCreator: userDoc.ref,
        data: {
          board: currentBoard.ref,
          list: getList(listId).ref,
          card: getList(listId).cards.docs.find(c => c.id === cardId).ref,
          title,
          completed,
        },
      }),
    [userDoc, currentBoard]
  );

  useEmitter(
    'ASSIGNE_CARD',
    ({ cardId, listId, title, assigneId }) =>
      cardsActivities.trackAssigneeActivity({
        memberCreator: userDoc.ref,
        data: {
          board: currentBoard.ref,
          list: getList(listId).ref,
          card: getList(listId).cards.docs.find(c => c.id === cardId).ref,
          assignee: assigneId ? userDoc.ref : null,
          title,
        },
      }),
    [userDoc, currentBoard]
  );

  useEmitter(
    'ADD_CARD',
    ({ cardId, listId, title }) =>
      cardsActivities.trackNewActivity({
        memberCreator: userDoc.ref,
        data: {
          board: currentBoard.ref,
          list: getList(listId).ref,
          card: getList(listId).cards.docs.find(c => c.id === cardId).ref,
          title,
        },
      }),
    [userDoc, currentBoard]
  );

  useEmitter(
    'EDIT_CARD',
    ({ cardId, listId, ...payload }) =>
      cardsActivities.trackEditActivity({
        memberCreator: userDoc.ref,
        data: {
          board: currentBoard.ref,
          list: getList(listId).ref,
          card: getList(listId).cards.docs.find(c => c.id === cardId).ref,
          ...payload,
          oldTitle: payload.oldTitle || '',
          newTitle: payload.newTitle || payload.oldTitle || '',
        },
      }),
    [userDoc, currentBoard]
  );

  useEmitter(
    'MOVE_CARD',
    ({ cardId, listBeforeId, listAfterId, title }) =>
      cardsActivities.trackMoveActivity({
        memberCreator: userDoc.ref,
        data: {
          board: currentBoard.ref,
          listBefore: getList(listBeforeId).ref,
          listAfter: getList(listAfterId).ref,
          card: getList(listBeforeId).cards.docs.find(c => c.id === cardId).ref,
          title,
        },
      }),
    [userDoc, currentBoard]
  );

  return null;
};

AppTrackEvents.displayName = 'AppTrackEvents';

export default observer(AppTrackEvents);
