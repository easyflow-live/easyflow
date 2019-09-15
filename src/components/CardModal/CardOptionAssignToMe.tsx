import * as React from 'react';
import { observer } from 'mobx-react-lite';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { FaUser } from 'react-icons/fa';

import { useSession } from '../../hooks/use-session';
import CardDocument from '../../documents/card.doc';
import { emitter } from '../../libs/emitter';

interface Props {
  card: CardDocument;
}

const CardOptionAssignToMe = observer(({ card }: Props) => {
  const { userDoc } = useSession();

  const toggleAssignment = async () => {
    if (!card.data.assignee) {
      await card.update({
        assignee: firebase.firestore.FieldValue.arrayUnion(userDoc.ref),
      });
      return;
    }

    const ids = card.data.assignee && [card.data.assignee.id];

    if (ids.includes(userDoc.ref.id)) {
      // Toggle if the user is already an assignee
      await card.update({
        assignee: firebase.firestore.FieldValue.arrayRemove(userDoc.ref),
      });
    } else {
      // If is not an array, we need to keep the old assigne to save with the new one,
      // otherwise, the old assigne will be cleanned. (backwards compatibility)
      if (!Array.isArray(card.data.assignee)) {
        const oldAssignee = card.data.assignee;
        await card.update({
          assignee: firebase.firestore.FieldValue.arrayUnion(
            ...[oldAssignee, userDoc.ref]
          ),
        });
      } else {
        await card.update({
          assignee: firebase.firestore.FieldValue.arrayUnion(userDoc.ref),
        });
      }
    }

    emitter.emit('ASSIGNEE_UPDATED', { cardId: card.id });
  };

  return (
    <div>
      <button onClick={toggleAssignment} className='options-list-button'>
        <div className='modal-icon'>
          <FaUser />
        </div>
        &nbsp;Toggle assignment
      </button>
    </div>
  );
});

export default CardOptionAssignToMe;
