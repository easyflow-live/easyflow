import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import 'firebase/firestore';
import { toast } from 'react-toastify';

import { useKeySubmit } from 'hooks/use-key-submit';
import BoardDocument from 'documents/board.doc';
import Dialog from 'components/Dialog/Dialog';
import { Input } from 'components/shared';

interface AddNewListModalProps {
  board: BoardDocument;
  isOpen?: boolean;
  toggleIsOpen: () => void;
}

const AddNewListModal = ({
  board,
  toggleIsOpen,
  isOpen,
}: AddNewListModalProps) => {
  const [value, setValue] = useState('');
  const [isSubmit, setIsSubmit] = useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const save = async (newValue: string) => {
    if (!newValue) return;

    const index = board.lists.docs.length;

    setIsSubmit(true);

    return board.lists
      .add({
        title: newValue,
        index,
      })
      .then(() => {
        toast(`A new list was created!`);
        setIsSubmit(false);
      });
  };

  const handleSubmit = async () => {
    await save(value);
    setValue('');
    toggleIsOpen();
  };

  const handleKeyDown = useKeySubmit(handleSubmit, () => {
    setValue('');
    toggleIsOpen();
  });

  return (
    <Dialog title='New list' isOpen={isOpen} onClose={toggleIsOpen}>
      <div className='m-4 sm:m-8 mt-0 sm:mt-0'>
        <Input
          placeholder='Type a name'
          autoFocus
          type={'text'}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          disabled={isSubmit}
        />
      </div>
    </Dialog>
  );
};

export default observer(AddNewListModal);
