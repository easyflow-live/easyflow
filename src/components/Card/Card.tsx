import React, { useState, useRef, useMemo } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { observer } from 'mobx-react-lite';
import styled, { css } from 'styled-components';

import CardDocument from '../../documents/card.doc';
import { useMarkdownCheckbox } from '../../hooks/use-markdown-checkbox';
import { useRect } from '../../hooks/use-rect';
import { findCheckboxes } from '../../helpers/find-check-boxes';
import CardModal from '../CardModal/CardModal';
import CardBadges from '../CardBadges/CardBadges';
import formatMarkdown from './formatMarkdown';

interface CardProps {
  card: CardDocument;
  isDraggingOver: boolean;
  index: number;
  listId: string;
  draggable: boolean;
}

const Card = ({
  card,
  index,
  isDraggingOver,
  listId,
  draggable = true,
}: CardProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef(null);
  const [cardRect] = useRect(cardRef);
  const toggleCheckbox = useMarkdownCheckbox(card.data.text);
  const checkboxes = useMemo(() => findCheckboxes(card.data.text), [
    card.data.text,
  ]);

  const toggleCardModal = () => setIsModalOpen(!isModalOpen);

  const handleClick = event => {
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
    // Only open card on enter since spacebar is used by react-beautiful-dnd for keyboard dragging
    if (event.keyCode === 13 && event.target.tagName.toLowerCase() !== 'a') {
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
    <Draggable draggableId={card.id} index={index} isDragDisabled={!draggable}>
      {(provided, { isDragging }) => (
        <>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            {...provided.dragHandleProps}
          >
            <StyledCard
              ref={cardRef}
              className='card relative text-sm shadow select-none cursor-pointer rounded my-2 mx-0 text-gray-900 break-words'
              bg={card.data.color}
              onClick={handleClick}
              onKeyDown={handleKeyDown}
              isDragging={isDragging}
            >
              <StyledCardHtml
                dangerouslySetInnerHTML={{
                  __html: formatMarkdown(card.data.text),
                }}
              />

              {showBadges && (
                <CardBadges
                  checkboxes={checkboxes}
                  card={card}
                  listId={listId}
                />
              )}
            </StyledCard>
          </div>
          {/* Remove placeholder when not dragging over to reduce snapping */}
          {isDraggingOver && provided.placeholder}
          <CardModal
            isOpen={isModalOpen}
            cardElement={cardRef}
            cardRect={cardRect}
            card={card}
            toggleCardModal={toggleCardModal}
            listId={listId}
          />
        </>
      )}
    </Draggable>
  );
};

export default observer(Card);

const StyledCard = styled.div<{ isDragging: boolean; bg: string }>`
  box-sizing: border-box;
  transition: box-shadow 0.15s;
  background-color: ${props => props.bg};

  ${props =>
    props.isDragging &&
    css`
      box-shadow: 1px 9px 8px 1px rgba(0, 0, 0, 0.3) !important;
    `};
`;

const StyledCardHtml = styled.div`
  padding: 6px 8px;

  h1 {
    font-size: 1.3rem !important;
  }

  h2 {
    font-size: 1.2rem !important;
  }

  h3 {
    font-size: 1.1rem !important;
  }

  h1,
  h2,
  h3,
  h4,
  h5,
  h6 {
    margin: 8px 0;
    font-weight: bold !important;
  }

  img {
    max-width: 100%;
  }

  p {
    margin: 4px 0;
  }

  code,
  pre {
    white-space: pre-wrap;
  }
  pre {
    margin: 4px 0;
    padding: 4px 2px;
    background: rgba(100, 100, 100, 0.08);
  }

  ul {
    list-style: disc;
  }

  & > ul {
    margin-left: 1.2rem;
  }

  a {
    text-decoration: underline;
  }

  table {
    width: 100%;
  }

  thead {
    border-bottom: 1px solid #939393;
  }

  tbody > tr > td:first-child {
    border-left: 1px solid #939393;
  }

  tbody > tr:last-child {
    border-bottom: 1px solid #939393;
  }

  tbody > tr > td {
    border-right: 1px solid #939393;
  }

  tbody > tr:hover {
    background-color: #dedede;
  }
`;
