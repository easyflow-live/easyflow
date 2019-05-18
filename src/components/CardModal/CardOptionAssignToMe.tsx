import * as React from 'react';
import { observer } from 'mobx-react-lite';

import { useSession } from '../../hooks/useSession';
import CardDocument from '../../documents/card.doc';

interface Props {
  card: CardDocument;
}

const CardOptionAssignToMe = observer(({ card }: Props) => {
  const { userDoc } = useSession();

  const toggleAssignment = async () => {
    if (card.data.assignee && card.data.assignee.id === userDoc.ref.id) {
      await card.update({ assignee: null });
    } else {
      await card.update({ assignee: userDoc.ref });
    }
  };

  return (
    <div>
      <button onClick={toggleAssignment} className='options-list-button'>
        <div className='modal-icon' />
        &nbsp;Toggle assignment
      </button>
    </div>
  );
});

export default CardOptionAssignToMe;
