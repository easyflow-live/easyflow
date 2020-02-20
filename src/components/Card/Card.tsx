import React, { useState, useRef, useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import CardDocument from '../../documents/card.doc';
import { useMarkdownCheckbox } from '../../hooks/use-markdown-checkbox';
import { useRect } from '../../hooks/use-rect';
import { findCheckboxes } from '../../helpers/find-check-boxes';
import CardModal from '../CardModal/CardModal';
import CardBadges from '../CardBadges/CardBadges';
import DraggableCard from './DraggableCard';
import MarkdownText from '../shared/MarkdownText';

interface CardProps {
  card: CardDocument;
  isDraggingOver: boolean;
  index: number;
  listId: string;
  draggable: boolean;
}

const isLink = (tagName: string) => tagName.toLowerCase() === 'a';
const isInput = (tagName: string) => tagName.toLowerCase() === 'input';

const Card = ({ card, index, listId, draggable = true }: CardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef(null);
  const [cardRect] = useRect(cardRef);
  const toggleCheckbox = useMarkdownCheckbox(card.data.text);
  const checkboxes = useMemo(() => findCheckboxes(card.data.text), [
    card.data.text,
  ]);

  const toggleCardModal = () => setIsModalOpen(!isModalOpen);

  const changeCheckbox = (checked: boolean, index: number) => {
    const newText = toggleCheckbox({
      checked,
      index,
    });
    card.ref.update({ text: newText });
  };

  const handleClick = event => {
    const { tagName, checked, id } = event.target;

    if (isInput(tagName)) {
      changeCheckbox(checked, parseInt(id));
    } else if (!isLink(tagName)) {
      toggleCardModal();
    }
  };

  const handleKeyDown = event => {
    const { tagName } = event.target;

    // Only open card on enter since spacebar is used by react-beautiful-dnd for keyboard dragging
    if (event.keyCode === 13 && !isLink(tagName)) {
      event.preventDefault();
      toggleCardModal();
    }
  };

  const showBadges =
    card.data.assignee ||
    card.data.date ||
    card.data.tags ||
    checkboxes.total > 0;

  return (
    <DraggableCard id={card.id} index={index} draggable={draggable}>
      <>
        <div
          ref={cardRef}
          className='card relative text-sm select-none cursor-pointer rounded my-2 mx-0 text-gray-900 break-words'
          style={{ backgroundColor: card.data.color, minHeight: '60px' }}
          onClick={handleClick}
          onKeyDown={handleKeyDown}
        >
          <div className='p-2'>
            <MarkdownText source={card.data.text} />
          </div>

          {showBadges && (
            <CardBadges checkboxes={checkboxes} card={card} listId={listId} />
          )}
        </div>

        {isModalOpen && (
          <CardModal
            isOpen={isModalOpen}
            cardElement={cardRef}
            cardRect={cardRect}
            card={card}
            toggleCardModal={toggleCardModal}
            listId={listId}
          />
        )}
      </>
    </DraggableCard>
  );
};

export default observer(Card);
