import React, { useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Button, Wrapper, Menu, MenuItem } from 'react-aria-menubutton';
import { FaTrash } from 'react-icons/fa';

import ListDocument from '../../documents/list.doc';
import { useKeySubmit } from '../../hooks/use-key-submit';
import { useInterface } from '../providers/InterfaceProvider';
import CardCounter from './CardCounter';
import './ListHeader.scss';

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

  const deleteList = () => list.ref.delete();

  return (
    <div
      className={`flex inline-flex items-center flex-shrink-0 text-lg p-3 hover:bg-gray-600 rounded-lg ${
        isDragging ? 'bg-gray-600' : ''
      }`}
      {...isEditable && dragHandleProps}
    >
      {isOpen && isEditable ? (
        <div>
          <input
            autoFocus
            value={newTitle}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight'
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
          className='text-white font-semibold w-full cursor-pointer break-words flex-grow'
        >
          <span
            title='Click to change the list title'
            className={isEditable ? 'cursor-pointer' : ''}
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

      {isEditable && (
        <Wrapper className='delete-list-wrapper ml-2' onSelection={deleteList}>
          <Button className='delete-list-button'>
            <FaTrash />
          </Button>
          <Menu className='delete-list-menu'>
            <div className='delete-list-header'>Are you sure?</div>
            <MenuItem className='delete-list-confirm bg-red-500 hover:bg-red-600'>
              Delete
            </MenuItem>
          </Menu>
          <div className='popover-arrow' />
        </Wrapper>
      )}
    </div>
  );
};

export default observer(ListHeader);
