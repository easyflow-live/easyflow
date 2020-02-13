import React, { useState } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';

import ClickOutside from '../shared/ClickOutside';
import { useSession } from '../../hooks/use-session';
import { Button, Input } from '../shared';

const BoardAdder = () => {
  const { userDoc } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = event => {
    setTitle(event.target.value);
  };

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (title === '') return;

    await firebase
      .firestore()
      .collection('boards')
      .add({
        owner: userDoc.ref,
        title,
        color: '',
        users: firebase.firestore.FieldValue.arrayUnion(userDoc.ref),
        lists: [],
        completed: false,
      });

    setIsOpen(false);
    setTitle('');
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.keyCode === 27) {
      setIsOpen(false);
    }
  };

  return isOpen ? (
    <ClickOutside handleClickOutside={toggleOpen}>
      <form
        onSubmit={handleSubmit}
        className='bg-gray-700 shadow-lg rounded-lg p-4 mr-4 mb-4 w-full sm:w-48 h-32'
      >
        <Input
          autoFocus
          type='text'
          value={title}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          spellCheck={false}
          placeholder='Board name'
          className='my-3'
        />

        <Button type='submit' disabled={title === ''} size='small'>
          Create
        </Button>
      </form>
    </ClickOutside>
  ) : (
    <button
      title='Add a new board'
      onClick={toggleOpen}
      className='bg-pink-500 hover:bg-pink-600 text-4xl shadow-lg rounded-lg p-4 ml-0 mr-4 mb-4 w-full sm:w-32 h-32 cursor-pointer text-white'
    >
      +
    </button>
  );
};

export default BoardAdder;
