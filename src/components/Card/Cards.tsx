import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { observer } from 'mobx-react-lite';
import { Collection } from 'firestorter';
import styled from 'styled-components';

import CardDocument from '../../documents/card.doc';
import { useSession } from '../../hooks/use-session';
import CardPlaceholder from './CardPlaceholder';
import Card from './Card';

interface CardProps {
  cards: Collection<CardDocument>;
  listId: string;
}

const Cards = ({ cards, listId }: CardProps) => {
  const { userDoc } = useSession();
  const { isLoading } = cards;

  return (
    <Droppable droppableId={listId} direction='vertical' isCombineEnabled>
      {(provided, { isDraggingOver }) => (
        <StyledCards ref={provided.innerRef}>
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
                draggable={!!userDoc}
              />
            ))
          )}

          {provided.placeholder}
        </StyledCards>
      )}
    </Droppable>
  );
};

export default observer(Cards);

const StyledCards = styled.div`
  min-height: 1px;

  & > .card:first-child {
    margin-top: 0;
  }
  & > .card:last-child {
    margin-bottom: 0;
  }
`;
