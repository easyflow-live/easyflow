import React, { useRef, useEffect, RefObject, useState } from 'react';
import { observer } from 'mobx-react-lite';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import shortid from 'shortid';

import BoardDocument from '../../documents/board.doc';
import Dialog from '../Dialog/Dialog';
import { useKeySubmit } from '../../hooks/use-key-submit';
import { toast } from 'react-toastify';

interface AddNewListModalProps {
  boardId?: string;
  isOpen?: boolean;
  toggleIsOpen?(): void;
}

const AddNewListModal = ({
  boardId,
  toggleIsOpen,
  isOpen,
}: AddNewListModalProps) => {
  const boardRef = useRef(null);
  const [value, setValue] = useState('');

  useEffect(() => {
    boardRef.current = new BoardDocument(`boards/${boardId}`);
  }, [boardId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const save = async value => {
    if (!value) return;

    const lists = firebase
      .firestore()
      .collection('boards')
      .doc(boardId)
      .collection('lists');

    const index = (await lists.get()).size;

    return lists
      .add({
        uid: shortid.generate(),
        title: value,
        index,
      })
      .then(() => {
        toast(`A new list was created!`);
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
        <input
          placeholder='Type a name'
          autoFocus
          type={'text'}
          value={value}
          onChange={handleChange}
          onKeyDown={handleKeyDown}
          className='bg-gray-700 shadow appearance-none rounded w-full py-2 px-3 text-white leading-tight'
        />
      </div>
    </Dialog>
  );
};

export default observer(AddNewListModal);
