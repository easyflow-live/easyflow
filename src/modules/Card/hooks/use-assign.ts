import { useCallback } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import { useSession } from 'hooks/use-session';
import CardDocument from 'modules/Card/data/card.doc';
import { emitter } from 'libs/emitter';

export const useAssign = (card: CardDocument, listId: string): (() => void) => {
  const { userDoc } = useSession();

  const userRef = userDoc?.ref;

  const emitEvent = useCallback(
    assigneId =>
      emitter.emit('ASSIGNE_CARD', {
        title: card.data.title || '',
        cardId: card.id,
        listId,
        assigneId,
      }),
    [card, listId]
  );

  const toggleAssignment = async () => {
    if (!card.data.assignee || !card.data.assignee.length) {
      await card
        .update({
          assignee: firebase.firestore.FieldValue.arrayUnion(userRef),
        })
        .then(() => emitEvent(userDoc.id));
    } else {
      const ids = card.data.assignee.map(a => a.id);

      if (ids.includes(userRef.id)) {
        // Toggle if the user is already an assignee
        await card
          .update({
            assignee: firebase.firestore.FieldValue.arrayRemove(userRef),
          })
          .then(() => emitEvent(null));
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
            .then(() => emitEvent(userDoc.id));
        } else {
          await card
            .update({
              assignee: firebase.firestore.FieldValue.arrayUnion(userRef),
            })
            .then(() => emitEvent(userDoc.id));
        }
      }
    }
  };

  return toggleAssignment;
};
