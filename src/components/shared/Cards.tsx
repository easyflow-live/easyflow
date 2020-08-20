import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { observer } from 'mobx-react-lite';
import { Collection } from 'firestorter';
import styled from 'styled-components';

import CardDocument, { Card as CardModel } from 'documents/card.doc';
import CardPlaceholder from 'components/shared/CardPlaceholder';
import Card from 'components/Card';
import { emitter } from 'libs/emitter';

interface CardProps {
  cards: Collection<CardDocument>;
  listId: string;
  previewMode?: boolean;
}

const Cards = ({ cards, listId, previewMode }: CardProps) => {
  const { isLoading } = cards;

  const removeCard = (card: CardDocument) => {
    card.ref.delete().then(() =>
      emitter.emit('REMOVE_CARD', {
        text: card.data.text,
        title: card.data.title || '',
        listId,
      })
    );
  };

  const updateCard = (card: CardDocument, data: Partial<CardModel>) => {
    const oldData = { ...card.data };

    card.ref.update(data).then(() =>
      emitter.emit('EDIT_CARD', {
        cardId: card.id,
        newText: data.text || oldData.text,
        oldText: oldData.text,
        newTitle: data.title || oldData.title,
        oldTitle: oldData.title,
        listId,
      })
    );
  };

  return (
    <Droppable droppableId={listId} direction='vertical' isCombineEnabled>
      {provided => (
        <StyledCards className='px-2' ref={provided.innerRef}>
          {isLoading ? (
            <CardPlaceholder />
          ) : (
            cards.docs.map((card, index) => (
              <Card
                key={card.id}
                card={card}
                index={index}
                listId={listId}
                previewMode={previewMode}
                onRemove={removeCard}
                onUpdate={updateCard}
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
