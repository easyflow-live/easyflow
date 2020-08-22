import React from 'react';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';

import { useSession } from 'hooks/use-session';
import BoardDocument from 'documents/board.doc';
import Dialog from './Dialog';
import NewBoardForm from './NewBoardForm';

interface AddBoardModalProps {
  isOpen?: boolean;
  toggleIsOpen?(): void;
}

const AddBoardModal = ({ toggleIsOpen, isOpen }: AddBoardModalProps) => {
  const { userDoc } = useSession();

  const onSubmit = async props => {
    const { title, code, index } = props;

    await BoardDocument.create({
      owner: userDoc.ref,
      users: [userDoc.ref],
      title,
      code,
      index,
    }).then(() => {
      toast(`A new board was created!`);
      toggleIsOpen();
    });

    toggleIsOpen();
  };

  return (
    <Dialog title='Start a new board' isOpen={isOpen} onClose={toggleIsOpen}>
      <div className='m-4 sm:m-8 mt-0 sm:mt-0'>
        <NewBoardForm onKeyDown={toggleIsOpen} onSubmit={onSubmit} />
      </div>
    </Dialog>
  );
};

export default observer(AddBoardModal);
