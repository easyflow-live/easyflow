import React, { useMemo, useCallback, useRef } from 'react';
import { observer } from 'mobx-react-lite';

import CardDocument from 'documents/card.doc';
import { findCheckboxes } from 'helpers/find-check-boxes';
import CardBadges from 'components/CardBadges';
import DraggableElement from 'components/shared/DraggableElement';
import { Card as CardModel } from 'documents/card.doc';
import { useCardFullModal } from 'components/CardModal/CardModalFull';
import CardMarkdown from 'components/shared/Cards/CardMarkdown';
import { useCardAssignees } from 'hooks/use-card-assignees';
import { User } from 'store/users';
import { useUndo } from 'hooks/use-undo';
import { emitter } from 'libs/emitter';

interface CardContainerProps {
  card: CardDocument;
  index: number;
  listId: string;
  previewMode: boolean;
}

const isLink = (tagName: string) => tagName.toLowerCase() === 'a';
const isTextArea = (tagName: string) => tagName.toLowerCase() === 'textarea';

const CardContainer = ({
  card,
  index,
  listId,
  previewMode,
}: CardContainerProps) => {
  const { assignees } = useCardAssignees(card);

  const { Modal, isShow, hide, show } = useCardFullModal();

  const remove = async ({ card: removedCard }: { card: CardModel }) => {
    await card.ref.delete();

    emitter.emit('REMOVE_CARD', {
      text: removedCard.text,
      title: removedCard.title || '',
      listId,
    });
  };

  const onClose = useCallback(async () => {
    await remove({ card: card.data });
  }, [card]);

  const onAction = useCallback(() => {
    hide();
  }, [hide]);

  const { action, isHidden } = useUndo({
    onClose,
    onAction,
    toastId: card.id,
    toastTitle: 'Card removed',
  });

  const updateCard = (data: Partial<CardModel>) => card.ref.update(data);

  return (
    <>
      <Card
        card={{ ...card.data, id: card.id }}
        index={index}
        previewMode={previewMode}
        assignees={assignees}
        isHidden={isHidden}
        isModalOpen={isShow}
        onUpdate={updateCard}
        onClick={show}
      />

      <Modal
        card={card}
        listId={listId}
        onUpdate={updateCard}
        onRemove={action}
      />
    </>
  );
};

interface CardProps {
  card: CardModel;
  index: number;
  previewMode: boolean;
  assignees: User[];
  isHidden: boolean;
  isModalOpen: boolean;
  onUpdate: (data: Partial<CardModel>) => Promise<void>;
  onComplete?: (state: boolean) => void;
  onTagClick?: (tag: string) => Promise<void>;
  onClick?: () => void;
}

const Card = observer(
  ({
    card,
    index,
    previewMode,
    assignees,
    isHidden,
    isModalOpen,
    onUpdate,
    onComplete,
    onTagClick,
    onClick,
  }: CardProps) => {
    const checkboxes = useMemo(() => findCheckboxes(card.text), [card.text]);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
      const { tagName } = event.target as HTMLElement;
      // Only open card on enter since spacebar is used by react-beautiful-dnd for keyboard dragging
      if (event.keyCode === 13 && !isLink(tagName) && !isTextArea(tagName)) {
        event.preventDefault();
        onClick();
      }
    };

    const showBadges =
      card.assignee || card.date || card.tags || checkboxes.total > 0;

    const cardProps = previewMode ? {} : { onClick };

    return (
      <DraggableElement
        id={card.id}
        index={index}
        draggable={!previewMode && !isModalOpen}
        onKeyDown={handleKeyDown}
      >
        <CardMarkdown
          onChangeCheckbox={text => onUpdate({ text })}
          text={card.text}
          isHidden={isHidden}
          previewMode={previewMode}
          bgColor={card.color}
          renderBadges={() =>
            showBadges && (
              <CardBadges
                tags={card.tags}
                date={card.date}
                completed={card.completed}
                cardId={card.id}
                color={card.color}
                assignees={assignees}
                checkboxes={checkboxes}
                onComplete={onComplete}
                onTagClick={onTagClick}
              />
            )
          }
          {...cardProps}
        />
      </DraggableElement>
    );
  }
);

export default observer(CardContainer);
