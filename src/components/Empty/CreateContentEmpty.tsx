import { useState } from 'react';
import { observer } from 'mobx-react-lite';

import BoardDocument from '../../documents/board.doc';
import { CreateContent } from '../images/CreateContent';
import AddNewListModal from '../BoardHeader/AddNewListModal';
import { Empty } from './Empty';
import { Button } from '../shared';

interface AddNewListButtonProps {
  board: BoardDocument;
}

const AddNewListButton = observer(({ board }: AddNewListButtonProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => setIsOpen(!isOpen);

  return (
    <>
      <Button className='mt-5' onClick={toggle}>
        Add new list
      </Button>

      <AddNewListModal board={board} isOpen={isOpen} toggleIsOpen={toggle} />
    </>
  );
});

interface CreateContentEmptyProps {
  board: BoardDocument;
}

export const CreateContentEmpty = observer(
  ({ board }: CreateContentEmptyProps) => (
    <Empty
      image={<CreateContent />}
      message={`Let's start a new board! Add a new list to continue.`}
      button={<AddNewListButton board={board} />}
    />
  )
);
