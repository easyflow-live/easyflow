import * as React from 'react';
import { useSession } from '../../hooks/useSession';
import firebase from '../../firebase.service';

type Props = {
  boardId: string;
  listId: string;
  cardId: string;
};

const CardOptionAssignToMe: React.FunctionComponent<Props> = ({
  cardId,
  listId,
  boardId,
}) => {
  const { user } = useSession();
  const toggleAssignment = async () => {
    const cardRef = await firebase.getCard(boardId, listId, cardId);
    const cardObj = (await cardRef.get()).data();
    const cardAssigneeObj =
      cardObj.assignee && (await cardObj.assignee.get()).data();
    const userRef = await firebase.getUser(user.email);
    if (cardAssigneeObj && user.email == cardAssigneeObj.email) {
      cardRef.update({ assignee: '' });
    } else {
      cardRef.update({ assignee: userRef });
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
