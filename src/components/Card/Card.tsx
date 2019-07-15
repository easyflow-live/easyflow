import React, { useState, useRef } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { observer } from 'mobx-react-lite';

import CardDocument from '../../documents/card.doc';
import { useMarkdownCheckbox } from '../../hooks/use-markdown-checkbox';
import { useRect } from '../../hooks/use-rect';
import CardModal from '../CardModal/CardModal';
import CardBadges from '../CardBadges/CardBadges';
import { findCheckboxes } from '../utils';
import formatMarkdown from './formatMarkdown';
import { CardProvider } from './CardProvider';

import './Card.scss';

interface CardProps {
  card: CardDocument;
  isDraggingOver: boolean;
  index: number;
}

const Card = ({ card, index, isDraggingOver }: CardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef(null);
  const [cardRect] = useRect(cardRef);
  const toggleCheckbox = useMarkdownCheckbox(card.data.text);
  const checkboxes = findCheckboxes(card.data.text);

  const toggleCardModal = () => setIsModalOpen(!isModalOpen);

  const handleClick = event => {
    const { tagName, checked, id } = event.target;
    console.log(tagName);
    if (tagName.toLowerCase() === 'input') {
      // The id is a string that describes which number in the order of checkboxes this particular checkbox has
      const newText = toggleCheckbox({
        checked,
        index: parseInt(id, 10),
      });
      card.ref.update({ text: newText });
    } else if (tagName.toLowerCase() !== 'a') {
      toggleCardModal();
    }
  };

  const handleKeyDown = event => {
    // Only open card on enter since spacebar is used by react-beautiful-dnd for keyboard dragging
    if (event.keyCode === 13 && event.target.tagName.toLowerCase() !== 'a') {
      event.preventDefault();
      toggleCardModal();
    }
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <CardProvider card={card}>
          <>
            <div
              className={`card-title ${
                snapshot.isDragging ? 'card-title--drag' : ''
              }`}
              ref={ref => {
                provided.innerRef(ref);
                cardRef.current = ref;
              }}
              {...provided.draggableProps}
              {...provided.dragHandleProps}
              onClick={event => {
                provided.dragHandleProps.onClick(event);
                handleClick(event);
              }}
              onKeyDown={event => {
                provided.dragHandleProps.onKeyDown(event);
                handleKeyDown(event);
              }}
              style={{
                ...provided.draggableProps.style,
                background: card.data.color,
              }}
            >
              <div
                className='card-title-html'
                dangerouslySetInnerHTML={{
                  __html: formatMarkdown(card.data.text),
                }}
              />

              {(card.data.assignee ||
                card.data.date ||
                card.data.tags ||
                checkboxes.total > 0) &&
                'badges' && (
                  <CardBadges
                    date={
                      card.data.date
                        ? new Date(card.data.date.seconds * 1000)
                        : undefined
                    }
                    checkboxes={checkboxes}
                    card={card}
                  />
                )}
            </div>
            {/* Remove placeholder when not dragging over to reduce snapping */}
            {isDraggingOver && provided.placeholder}
            <CardModal
              isOpen={isModalOpen}
              cardElement={cardRef}
              cardRect={cardRect}
              card={card}
              toggleCardModal={toggleCardModal}
            />
          </>
        </CardProvider>
      )}
    </Draggable>
  );
};

export default observer(Card);
