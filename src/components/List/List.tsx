import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { observer } from 'mobx-react-lite';

import ListDocument from '../../documents/list.doc';
import CardAdder from '../CardAdder/CardAdder';
import ListHeader from './ListHeader';
import Cards from '../Card/Cards';
import { useInterface } from '../providers/InterfaceProvider';
import './List.css';

interface ListProps {
  index: number;
  list: ListDocument;
}

const List = ({ index, list }: ListProps) => {
  const { isEditable } = useInterface();
  const { isLoading } = list;

  if (isLoading) return null;

  return (
    <Draggable
      draggableId={list.id}
      index={index}
      disableInteractiveElementBlocking
    >
      {(provided, snapshot) => (
        <>
          <div ref={provided.innerRef} {...provided.draggableProps}>
            <div
              tabIndex={0}
              className={`list relative bg-gray-750 shadow-lg rounded-lg p-1 mx-2 cursor-pointer ${
                snapshot.isDragging ? 'list--drag' : ''
              }`}
            >
              <ListHeader
                dragHandleProps={provided.dragHandleProps}
                listTitle={list.data.title}
                list={list}
                isDragging={snapshot.isDragging}
              />
              <div className='mx-2 mt-3 overflow-y-auto overflow-x-hidden'>
                <Cards cards={list.cards} listId={list.id} />
              </div>

              {isEditable && (
                <CardAdder
                  limit={list.data.cardsLimit}
                  cards={list.cards}
                  list={list}
                />
              )}
            </div>
          </div>
          {provided.placeholder}
        </>
      )}
    </Draggable>
  );
};

export default observer(List);
