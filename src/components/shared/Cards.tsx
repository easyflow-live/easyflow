import React from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { observer } from 'mobx-react-lite';
import { Collection } from 'firestorter';
import styled from 'styled-components';

import CardDocument, { Card as CardModel } from 'documents/card.doc';
import CardPlaceholder from 'components/shared/CardPlaceholder';
import Card from 'modules/Card';
import { emitter } from 'libs/emitter';
import DraggableElement from './DraggableElement';
import { useCardFullModal } from 'modules/Board/components/CardModalProvider';

interface CardProps {
  cards: Collection<CardDocument>;
  listId: string;
  previewMode?: boolean;
}

const Cards = ({ cards, listId, previewMode }: CardProps) => {
  const { isLoading } = cards;

  const { isOpen, hideModal, showModal } = useCardFullModal();

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
              <DraggableElement
                key={card.id}
                id={card.id}
                index={index}
                draggable={!previewMode && !isOpen}
              >
                <Card
                  key={card.id}
                  card={card}
                  listId={listId}
                  previewMode={previewMode}
                  onRemove={removeCard}
                  onUpdate={updateCard}
                  onShowModal={showModal}
                  onHideModal={hideModal}
                />
              </DraggableElement>
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
