import React, { useState, useRef, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import cn from 'classnames';

import { cards as cardsActions } from '../../core/actions';
import CardDocument from '../../documents/card.doc';
import { useMarkdownCheckbox } from '../../hooks/use-markdown-checkbox';
import { useRect } from '../../hooks/use-rect';
import { findCheckboxes } from '../../helpers/find-check-boxes';
import CardModal from '../CardModal/CardModal';
import CardBadges from '../CardBadges/CardBadges';
import DraggableElement from '../shared/DraggableElement';
import MarkdownText from '../shared/MarkdownText';
import { Card as CardModel } from '../../documents/card.doc';
import { ToastUndo } from '../shared';
import { useBoardsStore } from '../../store/boards';
import { useSession } from '../providers/SessionProvider';

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
  const { currentBoard, getList } = useBoardsStore();
  const { userDoc } = useSession();
  const toggleCheckbox = useMarkdownCheckbox(card.data.text);

  const isHiddenRef = useRef(false);
  const [, forceRenderer] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const cardRef = useRef(null);
  const [cardRect] = useRect(cardRef);
  const checkboxes = useMemo(() => findCheckboxes(card.data.text), [
    card.data.text,
  ]);

  const updateCard = (data: Partial<CardModel>) => card.ref.update(data);

  const toggleCardModal = () => setIsModalOpen(!isModalOpen);

  const changeCheckbox = (checked: boolean, index: number) => {
    const newText = toggleCheckbox({
      checked,
      index,
    });
    updateCard({ text: newText });
  };

  const remove = async () => {
    if (!isHiddenRef.current) return;

    const textBackup = card.data.text;

    await card.ref.delete();
    await cardsActions.removeCardAction({
      memberCreator: userDoc.ref,
      data: {
        board: currentBoard.ref,
        list: getList(listId).ref,
        text: textBackup,
        title: card.data.title || '',
      },
    });
  };

  const undo = () => {
    isHiddenRef.current = false;
    forceRenderer(s => !s);
  };

  const deleteCard = async () => {
    isHiddenRef.current = true;
    toast(<ToastUndo title='Card removed' id={card.id} undo={undo} />, {
      onClose: remove,
    });
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
    <DraggableElement id={card.id} index={index} draggable={draggable}>
      <>
        <div
          ref={cardRef}
          className={cn(
            'card relative text-sm select-none cursor-pointer rounded my-2 mx-0 text-gray-900 break-words',
            isHiddenRef.current && 'hidden'
          )}
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
            onUpdate={updateCard}
            onRemove={deleteCard}
          />
        )}
      </>
    </DraggableElement>
  );
};

export default observer(Card);
