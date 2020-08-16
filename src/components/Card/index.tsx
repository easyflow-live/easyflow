import React, { useState, useRef, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';
import cn from 'classnames';

import { cards as cardsActions } from 'core/actions';
import CardDocument from 'documents/card.doc';
import { useMarkdownCheckbox } from 'hooks/use-markdown-checkbox';
import { findCheckboxes } from 'helpers/find-check-boxes';
import CardBadges from 'components/CardBadges';
import DraggableElement from 'components/shared/DraggableElement';
import MarkdownText from 'components/shared/MarkdownText';
import { Card as CardModel } from 'documents/card.doc';
import { ToastUndo } from 'components/shared';
import { useBoardsStore } from 'store/boards';
import { useSession } from 'components/providers/SessionProvider';
import { useCardFullModal } from 'components/CardModal/CardModalFull';

interface CardProps {
  card: CardDocument;
  isDraggingOver: boolean;
  index: number;
  listId: string;
  previewMode: boolean;
}

const isLink = (tagName: string) => tagName.toLowerCase() === 'a';
const isInput = (tagName: string) => tagName.toLowerCase() === 'input';
const isTextArea = (tagName: string) => tagName.toLowerCase() === 'textarea';

const Card = ({ card, index, listId, previewMode }: CardProps) => {
  const { currentBoard, getList } = useBoardsStore();
  const { userDoc } = useSession();
  const toggleCheckbox = useMarkdownCheckbox(card.data.text);
  const { Modal, isShow, hide, show } = useCardFullModal();
  const isHiddenRef = useRef(false);
  const [, forceRenderer] = useState(false);
  const cardRef = useRef(null);
  const checkboxes = useMemo(() => findCheckboxes(card.data.text), [
    card.data.text,
  ]);

  const updateCard = (data: Partial<CardModel>) => card.ref.update(data);

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
    hide();
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
      show();
    }
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { tagName } = event.target as HTMLElement;
    // Only open card on enter since spacebar is used by react-beautiful-dnd for keyboard dragging
    if (event.keyCode === 13 && !isLink(tagName) && !isTextArea(tagName)) {
      event.preventDefault();
      show();
    }
  };

  const showBadges =
    card.data.assignee ||
    card.data.date ||
    card.data.tags ||
    checkboxes.total > 0;

  const cardProps = previewMode ? {} : { onClick: handleClick };

  return (
    <DraggableElement
      id={card.id}
      index={index}
      draggable={!previewMode && !isShow}
      onKeyDown={handleKeyDown}
    >
      <div>
        <div
          ref={cardRef}
          className={cn(
            'card relative text-sm select-none rounded my-2 mx-0 text-gray-900 break-words',
            isHiddenRef.current && 'hidden',
            !previewMode && 'cursor-pointer'
          )}
          style={{ backgroundColor: card.data.color, minHeight: '60px' }}
          {...cardProps}
        >
          <div className='p-2'>
            <MarkdownText source={card.data.text} />
          </div>

          {showBadges && (
            <CardBadges checkboxes={checkboxes} card={card} listId={listId} />
          )}
        </div>

        <Modal
          card={card}
          listId={listId}
          onUpdate={updateCard}
          onRemove={deleteCard}
        />
      </div>
    </DraggableElement>
  );
};

export default observer(Card);
