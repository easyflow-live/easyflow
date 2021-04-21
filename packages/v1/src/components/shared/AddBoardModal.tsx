import React from 'react';
import { observer } from 'mobx-react-lite';

import { useSession } from 'hooks/use-session';
import BoardDocument from 'modules/Board/data/board.doc';
import { useAppToast } from 'hooks/use-app-toast';
import Dialog from './Dialog';
import NewBoardForm from './NewBoardForm';

interface AddBoardModalProps {
  isOpen?: boolean;
  toggleIsOpen?(): void;
}

const AddBoardModal = ({ toggleIsOpen, isOpen }: AddBoardModalProps) => {
  const toast = useAppToast();
  const { userDoc } = useSession();

  const onSubmit = async props => {
    const { title, code, index } = props;

    await BoardDocument.create({
      owner: userDoc.ref,
      users: [userDoc.ref],
      title,
      code,
      index,
    })
      .then(() => toast({ id: code, title: 'A new board was created!' }))
      .finally(toggleIsOpen);
  };

  return (
    <Dialog title='Start a new board' isOpen={isOpen} onClose={toggleIsOpen}>
      <div className='m-4 sm:m-8 mt-0 sm:mt-0'>
        <NewBoardForm onSubmit={onSubmit} />
      </div>
    </Dialog>
  );
};

export default observer(AddBoardModal);
