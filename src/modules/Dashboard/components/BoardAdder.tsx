import React, { useState } from 'react';

import { useSession } from 'hooks/use-session';
import BoardDocument from 'modules/Board/data/board.doc';
import ClickOutside from 'components/shared/ClickOutside';
import NewBoardForm from 'components/shared/NewBoardForm';

const BoardAdder = () => {
  const { userDoc } = useSession();
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };

  const handleSubmit = async props => {
    const { title, code, index } = props;

    await BoardDocument.create({
      owner: userDoc.ref,
      users: [userDoc.ref],
      title,
      code,
      index,
    });

    setIsOpen(false);
  };

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.keyCode === 27) {
      setIsOpen(false);
    }
  };

  return isOpen ? (
    <ClickOutside handleClickOutside={toggleOpen}>
      <div className='bg-gray-700 shadow-lg rounded-lg p-4 mr-4 mb-4 w-full sm:w-64'>
        <NewBoardForm onKeyDown={handleKeyDown} onSubmit={handleSubmit} />
      </div>
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
