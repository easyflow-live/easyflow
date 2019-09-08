import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import shortid from 'shortid';
import { toast } from 'react-toastify';

import { useKeySubmit } from '../../hooks/use-key-submit';
import { useSession } from '../../hooks/use-session';
import Dialog from '../Dialog/Dialog';

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

  const save = async (value: string) => {
    if (!value) return;

    const index = userDoc.boards.docs.length;

    // TODO change this to modal class
    return userDoc.boards.ref
      .add({
        uid: shortid.generate(),
        owner: userDoc.ref,
        title: value,
        color: '',
        users: firebase.firestore.FieldValue.arrayUnion(userDoc.ref),
        index,
      })
      .then(() => {
        toast(`A new board was created!`);
      });
  };

  const handleSubmit = async () => {
    await save(title);
    setTitle('');
    toggleIsOpen();
  };

  const handleKeyDown = useKeySubmit(handleSubmit, () => {
    setTitle('');
    toggleIsOpen();
  });

  return (
    <Dialog title='New board' isOpen={isOpen} onClose={toggleIsOpen}>
      <div className='m-4 sm:m-8 mt-0 sm:mt-0'>
        <input
          placeholder='Type a name'
          autoFocus
          type={'text'}
          value={title}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className='bg-gray-700 shadow appearance-none rounded w-full py-2 px-3 text-white leading-tight'
        />
      </div>
    </Dialog>
  );
};

export default observer(AddBoardModal);
