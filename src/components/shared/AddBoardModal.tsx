import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';

import { useKeySubmit } from 'hooks/use-key-submit';
import { useSession } from 'hooks/use-session';
import BoardDocument from 'documents/board.doc';
import Input from 'components/shared/Input';
import Dialog from './Dialog';

interface AddBoardModalProps {
  isOpen?: boolean;
  toggleIsOpen?(): void;
}

const AddBoardModal = ({ toggleIsOpen, isOpen }: AddBoardModalProps) => {
  const [title, setTitle] = useState('');
  const { userDoc } = useSession();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const save = (value: string) => {
    if (!value) return;

    const index = userDoc.boards.docs.length;

    BoardDocument.craate({
      owner: userDoc.ref,
      users: [userDoc.ref],
      title: value,
      index,
    }).then(() => {
      toast(`A new board was created!`);
      setTitle('');
      toggleIsOpen();
    });
  };

  const handleSubmit = () => save(title);

  const handleKeyDown = useKeySubmit(handleSubmit, () => {
    setTitle('');
    toggleIsOpen();
  });

  return (
    <Dialog title='New board' isOpen={isOpen} onClose={toggleIsOpen}>
      <div className='m-4 sm:m-8 mt-0 sm:mt-0'>
        <Input
          placeholder='Type a name'
          autoFocus
          type={'text'}
          value={title}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
        />
      </div>
    </Dialog>
  );
};

export default observer(AddBoardModal);
