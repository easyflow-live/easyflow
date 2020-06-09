import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { cards } from '../core/actions';
import { useBoardsStore } from '../store';
import { useSession } from './use-session';
import CardDocument from '../documents/card.doc';

export const useAssign = (card: CardDocument, listId: string): (() => void) => {
  const { currentBoard, getList } = useBoardsStore();
  const { userDoc } = useSession();

  const userRef = userDoc?.ref;

  const actionData = {
    assignee: userRef,
    card: card.ref,
    board: currentBoard.ref,
    list: getList(listId).ref,
    title: card.data.title || '',
  };

  const toggleAssignment = async () => {
    if (!card.data.assignee || !card.data.assignee.length) {
      await card
        .update({
          assignee: firebase.firestore.FieldValue.arrayUnion(userRef),
        })
        .then(() =>
          cards.assigneeCardAction({
            memberCreator: userRef,
            data: actionData,
          })
        );
    } else {
      const ids = card.data.assignee.map(a => a.id);

      if (ids.includes(userRef.id)) {
        // Toggle if the user is already an assignee
        await card
          .update({
            assignee: firebase.firestore.FieldValue.arrayRemove(userRef),
          })
          .then(() =>
            cards.assigneeCardAction({
              memberCreator: userRef,
              data: { ...actionData, assignee: null },
            })
          );
      } else {
        // If is not an array, we need to keep the old assigne to save with the new one,
        // otherwise, the old assigne will be cleanned. (backwards compatibility)
        if (!Array.isArray(card.data.assignee)) {
          const oldAssignee = card.data.assignee;
          await card
            .update({
              assignee: firebase.firestore.FieldValue.arrayUnion(
                ...[oldAssignee, userRef]
              ),
            })
            .then(() =>
              cards.assigneeCardAction({
                memberCreator: userRef,
                data: actionData,
              })
            );
        } else {
          await card
            .update({
              assignee: firebase.firestore.FieldValue.arrayUnion(userRef),
            })
            .then(() =>
              cards.assigneeCardAction({
                memberCreator: userRef,
                data: actionData,
              })
            );
        }
      }
    }
  };

  return toggleAssignment;
};
