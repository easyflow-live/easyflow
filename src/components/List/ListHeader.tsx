import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';

import ListDocument from '../../documents/list.doc';
import { useKeySubmit } from '../../hooks/use-key-submit';
import { useInterface } from '../providers/InterfaceProvider';
import { Input } from '../shared';
import CardCounter from './CardCounter';
import ListMenu from './ListMenu';

interface ListHeaderProps {
  listTitle: string;
  dragHandleProps: any;
  list: ListDocument;
  isDragging: boolean;
}

const ListHeader = ({
  listTitle,
  dragHandleProps,
  list,
  isDragging,
}: ListHeaderProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [newTitle, setNewTitle] = useState(listTitle);
  const { isEditable } = useInterface();

  const handleChange = event => setNewTitle(event.target.value);

  const handleSubmit = () => {
    if (newTitle === '') return;

    if (newTitle !== listTitle) {
      list.ref.update({ title: newTitle });
    }
    setIsOpen(false);
  };

  const revertTitle = () => {
    setIsOpen(false);
    setNewTitle(listTitle);
  };

  const handleKeyDown = useKeySubmit(handleSubmit, revertTitle);

  const openTitleEditor = () => setIsOpen(true);

  const handleButtonKeyDown = event => {
    if (event.keyCode === 13) {
      event.preventDefault();
      openTitleEditor();
    }
  };

  const handleCounterSubmit = (value: number) => {
    list.ref.update({ cardsLimit: value });
  };

  return (
    <div
      className={`flex inline-flex items-center flex-shrink-0 p-3 rounded-lg ${
        isDragging ? 'bg-gray-600' : ''
      }`}
      {...(isEditable && dragHandleProps)}
    >
      {isOpen && isEditable ? (
        <div>
          <Input
            autoFocus
            value={newTitle}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            onBlur={handleSubmit}
            spellCheck={false}
          />
        </div>
      ) : (
        <div
          role='button'
          tabIndex={0}
          onClick={openTitleEditor}
          onKeyDown={event => {
            handleButtonKeyDown(event);
            dragHandleProps.onKeyDown(event);
          }}
          className='text-white font-semibold w-full cursor-text break-words flex-grow'
        >
          <span
            title='Click to change the list title'
            className={isEditable ? 'cursor-text' : ''}
          >
            {listTitle}
          </span>
        </div>
      )}

      <CardCounter
        counter={list.cards.docs.length}
        max={list.data.cardsLimit}
        onChange={handleCounterSubmit}
        editable={isEditable}
      />

      {isEditable && <ListMenu list={list} />}
    </div>
  );
};

export default observer(ListHeader);
