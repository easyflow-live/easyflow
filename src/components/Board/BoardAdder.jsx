import React, { useState } from 'react';
import * as firebase from 'firebase/app';
import 'firebase/firestore';
import shortid from 'shortid';

import ClickOutside from '../ClickOutside/ClickOutside';
import { useSession } from '../../hooks/useSession';
import CallToActionButton from '../Buttons/CallToActionButton';
import './BoardAdder.css';

const BoardAdder = ({ style }) => {
  const { userDoc } = useSession();
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState('');

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleChange = event => {
    setTitle(event.target.value);
  };

  const handleSubmit = async event => {
    event.preventDefault();
    if (title === '') return;

    await firebase
      .firestore()
      .collection('boards')
      .add({
        uid: shortid.generate(),
        owner: userDoc.ref,
        title,
        color: '',
        users: firebase.firestore.FieldValue.arrayUnion(userDoc.ref),
        lists: []
      });

    setIsOpen(false);
    setTitle('');
  };

  const handleKeyDown = event => {
    if (event.keyCode === 27) {
      setIsOpen(false);
    }
  };

  return isOpen ? (
    <ClickOutside handleClickOutside={toggleOpen}>
      <form
        onSubmit={handleSubmit}
        className='bg-gray-700 shadow-lg rounded-lg p-4 m-2'
      >
        <div>
          <input
            autoFocus
            type='text'
            value={title}
            onKeyDown={handleKeyDown}
            onChange={handleChange}
            spellCheck={false}
            placeholder='Board name'
            className='shadow appearance-none border rounded w-full py-2 px-3 my-5 text-gray-700 leading-tight'
          />
        </div>

        <div>
          <CallToActionButton type='submit' disabled={title === ''}>
            Create
          </CallToActionButton>
        </div>
      </form>
    </ClickOutside>
  ) : (
    <button
      title='Add a new board'
      onClick={toggleOpen}
      className='board-adder bg-pink-500 hover:bg-pink-600 text-4xl shadow-lg rounded-lg p-4 m-2 w-32 cursor-pointer text-white'
      style={style}
    >
      +
    </button>
  );
};

export default BoardAdder;
