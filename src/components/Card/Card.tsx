import React, { useState, useRef, useMemo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { observer } from 'mobx-react-lite';

import CardDocument from '../../documents/card.doc';
import { useMarkdownCheckbox } from '../../hooks/use-markdown-checkbox';
import { useSession } from '../../hooks/use-session';
import { useRect } from '../../hooks/use-rect';
import { findCheckboxes } from '../../helpers/find-check-boxes';
import CardModal from '../CardModal/CardModal';
import CardBadges from '../CardBadges/CardBadges';
import formatMarkdown from './formatMarkdown';

import './Card.scss';

interface CardProps {
  card: CardDocument;
  isDraggingOver: boolean;
  index: number;
}

const Card = ({ card, index, isDraggingOver }: CardProps) => {
  const { user } = useSession();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef(null);
  const [cardRect] = useRect(cardRef);
  const toggleCheckbox = useMarkdownCheckbox(card.data.text);
  const checkboxes = useMemo(() => findCheckboxes(card.data.text), [
    card.data.text,
  ]);

  const toggleCardModal = () => setIsModalOpen(!isModalOpen);

  const handleClick = event => {
    if (!user) return;

    const { tagName, checked, id } = event.target;

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
    if (!user) return;

    // Only open card on enter since spacebar is used by react-beautiful-dnd for keyboard dragging
    if (event.keyCode === 13 && event.target.tagName.toLowerCase() !== 'a') {
      event.preventDefault();
      toggleCardModal();
    }
  };

  return (
    <Draggable draggableId={card.id} index={index}>
      {(provided, snapshot) => (
        <>
          <div
            className={`card-title ${
              snapshot.isDragging ? 'card-title--drag' : ''
            }`}
            ref={ref => {
              provided.innerRef(ref);
              cardRef.current = ref;
            }}
            // Enable draggable to authenticated users
            {...(user
              ? { ...provided.draggableProps, ...provided.dragHandleProps }
              : {})}
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
              checkboxes.total > 0) && (
              <CardBadges checkboxes={checkboxes} card={card} />
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
      )}
    </Draggable>
  );
};

export default observer(Card);
