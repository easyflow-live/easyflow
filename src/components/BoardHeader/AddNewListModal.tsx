import React, { useRef, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import shortid from 'shortid';
import { toast } from 'react-toastify';

import BoardDocument from '../../documents/board.doc';
import { useKeySubmit } from '../../hooks/use-key-submit';
import Dialog from '../Dialog/Dialog';
import Input from '../styled/Input';

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
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    boardRef.current = new BoardDocument(`boards/${boardId}`);
  }, [boardId]);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setValue(event.target.value);
  };

  const save = async newValue => {
    if (!newValue) return;

    const lists = firebase
      .firestore()
      .collection('boards')
      .doc(boardId)
      .collection('lists');

    const index = (await lists.get()).size;

    setIsSubmit(true);

    return lists
      .add({
        uid: shortid.generate(),
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
