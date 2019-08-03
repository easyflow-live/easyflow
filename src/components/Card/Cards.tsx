import React, { useRef, useEffect } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { observer } from 'mobx-react-lite';

import ListDocument from '../../documents/list.doc';
import Card from './Card';

interface CardProps {
  list: ListDocument;
}

const Cards = ({ list }: CardProps) => {
  const listEndRef = useRef<HTMLDivElement>();

  useEffect(() => {
    // Scroll to bottom of list if a new card has been added
    if (listEndRef && listEndRef.current) {
      listEndRef.current.scrollIntoView();
    }
  }, [list.cards.docs.length]);

  const { isLoading } = list;

  return (
    <Droppable droppableId={list.id} direction='vertical' isCombineEnabled>
      {(provided, { isDraggingOver }) => (
        <div className='cards' ref={provided.innerRef}>
          {Array.isArray(list.cards.docs) &&
            list.cards.docs.map((card, index) => (
              <Card
                key={card.id}
                isDraggingOver={isDraggingOver}
                card={card}
                index={index}
              />
            ))}
          {provided.placeholder}
          <div style={{ float: 'left', clear: 'both' }} ref={listEndRef} />
        </div>
      )}
    </Droppable>
  );
};

export default observer(Cards);
