import { observer } from 'mobx-react-lite';

import { useEmitter } from 'hooks/use-emitter';
import { cards as cardsActions } from 'core/actions';
import { useBoardsStore } from 'store';
import { useSession } from 'hooks/use-session';

const AppActionsEvents = () => {
  const { currentBoard, getList } = useBoardsStore();
  const { userDoc } = useSession();

  useEmitter(
    'REMOVE_CARD',
    ({ title, text, listId }) =>
      cardsActions.removeCardAction({
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
      cardsActions.completeCardAction({
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
      cardsActions.assigneeCardAction({
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
      cardsActions.newCardAction({
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
      cardsActions.editCardAction({
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
      cardsActions.moveCardAction({
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

AppActionsEvents.displayName = 'AppActionsEvents';

export default observer(AppActionsEvents);
