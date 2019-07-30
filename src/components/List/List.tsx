import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { observer } from 'mobx-react-lite';

import ListDocument from '../../documents/list.doc';
import { useSession } from '../../hooks/useSession';
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
  const { user } = useSession();
  const { isEditable } = useInterface();
  const { isLoading } = list;

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
              className={`list relative bg-gray-700 shadow-lg rounded-lg p-1 m-2 cursor-pointer ${
                snapshot.isDragging ? 'list--drag' : ''
              }`}
            >
              <ListHeader
                {...user && provided.dragHandleProps}
                listTitle={list.data.title}
                list={list}
              />
              <div className='mx-2 mt-3 overflow-y-auto overflow-x-hidden'>
                <Cards list={list} cards={list.cards.docs} />
              </div>
              {isEditable && (
                <CardAdder limit={list.data.cardsLimit} cards={list.cards} />
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
