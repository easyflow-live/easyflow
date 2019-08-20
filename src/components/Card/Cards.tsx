import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { observer } from 'mobx-react-lite';

import ListDocument from '../../documents/list.doc';
import Card from './Card';
import CardPlaceholder from './CardPlaceholder';

interface CardProps {
  list: ListDocument;
}

const Cards = ({ list }: CardProps) => {
  const { cards } = list;
  const { isLoading } = cards;

  return (
    <Droppable droppableId={list.id} direction='vertical' isCombineEnabled>
      {(provided, { isDraggingOver }) => (
        <div className='cards' ref={provided.innerRef}>
          {isLoading ? (
            <CardPlaceholder />
          ) : (
            Array.isArray(list.cards.docs) &&
            list.cards.docs.map((card, index) => (
              <Card
                key={card.id}
                isDraggingOver={isDraggingOver}
                card={card}
                index={index}
              />
            ))
          )}

          {provided.placeholder}
        </div>
      )}
    </Droppable>
  );
};

export default observer(Cards);
