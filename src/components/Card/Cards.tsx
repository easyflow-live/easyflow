import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { observer } from 'mobx-react-lite';
import { Collection } from 'firestorter';

import CardDocument from '../../documents/card.doc';
import CardPlaceholder from './CardPlaceholder';
import Card from './Card';

interface CardProps {
  cards: Collection<CardDocument>;
  listId: string;
}

const Cards = ({ cards, listId }: CardProps) => {
  const { isLoading } = cards;

  return (
    <Droppable droppableId={listId} direction='vertical' isCombineEnabled>
      {(provided, { isDraggingOver }) => (
        <div className='cards' ref={provided.innerRef}>
          {isLoading ? (
            <CardPlaceholder />
          ) : (
            cards.docs.map((card, index) => (
              <Card
                key={card.id}
                isDraggingOver={isDraggingOver}
                card={card}
                index={index}
                listId={listId}
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
