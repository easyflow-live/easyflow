import * as React from 'react';
import { observer } from 'mobx-react-lite';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { FaUser } from 'react-icons/fa';

import { cards } from '../../core/actions';
import { useBoardsStore } from '../../store';
import { useSession } from '../../hooks/use-session';
import CardDocument from '../../documents/card.doc';
import CardOptionButton from './CardOptionButton';

interface Props {
  card: CardDocument;
  listId: string;
}

const CardOptionAssignToMe = observer(({ card, listId }: Props) => {
  const { currentBoard, getList } = useBoardsStore();
  const { userDoc } = useSession();

  const toggleAssignment = async () => {
    if (!card.data.assignee || !card.data.assignee.length) {
      await card
        .update({
          assignee: firebase.firestore.FieldValue.arrayUnion(userDoc.ref),
        })
        .then(() =>
          cards.assigneeCardAction({
            memberCreator: userDoc.ref,
            data: {
              assignee: userDoc.ref,
              card: card.ref,
              board: currentBoard.ref,
              list: getList(listId).ref,
              title: card.data.title || '',
            },
          })
        );
    } else {
      const ids = card.data.assignee.map(a => a.id);

      if (ids.includes(userDoc.ref.id)) {
        // Toggle if the user is already an assignee
        await card
          .update({
            assignee: firebase.firestore.FieldValue.arrayRemove(userDoc.ref),
          })
          .then(() =>
            cards.assigneeCardAction({
              memberCreator: userDoc.ref,
              data: {
                assignee: null,
                card: card.ref,
                board: currentBoard.ref,
                list: getList(listId).ref,
                title: card.data.title || '',
              },
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
                ...[oldAssignee, userDoc.ref]
              ),
            })
            .then(() =>
              cards.assigneeCardAction({
                memberCreator: userDoc.ref,
                data: {
                  assignee: userDoc.ref,
                  card: card.ref,
                  board: currentBoard.ref,
                  list: getList(listId).ref,
                  title: card.data.title || '',
                },
              })
            );
        } else {
          await card
            .update({
              assignee: firebase.firestore.FieldValue.arrayUnion(userDoc.ref),
            })
            .then(() =>
              cards.assigneeCardAction({
                memberCreator: userDoc.ref,
                data: {
                  assignee: userDoc.ref,
                  card: card.ref,
                  board: currentBoard.ref,
                  list: getList(listId).ref,
                  title: card.data.title || '',
                },
              })
            );
        }
      }
    }
  };

  return (
    <CardOptionButton onClick={toggleAssignment}>
      <div className='modal-icon'>
        <FaUser />
      </div>
      &nbsp;Toggle assignment
    </CardOptionButton>
  );
});

export default CardOptionAssignToMe;
