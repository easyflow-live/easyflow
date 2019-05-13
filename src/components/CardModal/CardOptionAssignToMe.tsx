import * as React from 'react';
import { useSession } from '../../hooks/useSession';
import firebase from '../../firebase.service';

type Props = {
  card: any;
};

const CardOptionAssignToMe = ({ card }: Props) => {
  const { user } = useSession();
  const toggleAssignment = async () => {
    const cardAssigneeObj = card.assignee && (await card.assignee.get()).data();
    const userRef = await firebase.getUser(user.email);

    if (cardAssigneeObj && user.email == cardAssigneeObj.email) {
      await card.ref.update({ assignee: null });
    } else {
      await card.ref.update({ assignee: userRef });
    }
  };

  return (
    <div>
      <button onClick={toggleAssignment} className="options-list-button">
        <div className="modal-icon" />
        &nbsp;Toggle assignment
      </button>
    </div>
  );
};

export default CardOptionAssignToMe;
