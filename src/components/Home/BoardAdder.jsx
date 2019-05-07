import React, { useState } from 'react';
import ClickOutside from '../ClickOutside/ClickOutside';
import firebase from 'firebase';
import shortid from 'shortid';

import { useSession } from '../../hooks/useSession';

const BoardAdder = () => {
  const { user } = useSession();
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
        owner: user.uid,
        title,
        users: [],
        lists: [],
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
      <form onSubmit={handleSubmit} className="board-adder">
        <input
          autoFocus
          className="submit-board-input"
          type="text"
          value={title}
          onKeyDown={handleKeyDown}
          onChange={handleChange}
          spellCheck={false}
        />
        <input
          type="submit"
          value="Create"
          className="submit-board-button"
          disabled={title === ''}
        />
      </form>
    </ClickOutside>
  ) : (
    <button onClick={toggleOpen} className="add-board-button">
      Add a new board...
    </button>
  );
};

export default BoardAdder;
