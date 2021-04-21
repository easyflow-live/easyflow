import { observer } from 'mobx-react-lite';
import { FaUser } from 'react-icons/fa';

import { useAssign } from 'modules/Card/hooks/use-assign';
import CardDocument from 'modules/Card/data/card.doc';
import CardOptionButton from './CardOptionButton';

interface Props {
  card: CardDocument;
  listId: string;
}

const CardOptionAssignToMe = observer(({ card, listId }: Props) => {
  const toggleAssignment = useAssign(card, listId);

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
