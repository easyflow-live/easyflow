import React, { useMemo, useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import CardDocument from 'documents/card.doc';
import { findCheckboxes } from 'helpers/find-check-boxes';
import CardBadges from 'components/CardBadges';
import DraggableElement from 'components/shared/DraggableElement';
import { Card as CardModel } from 'documents/card.doc';
import { useCardFullModal } from 'modules/Board/components/CardModalProvider';
import CardMarkdown from 'components/shared/Cards/CardMarkdown';
import { useCardAssignees } from 'hooks/use-card-assignees';
import { User } from 'store/users';
import { useUndo } from 'hooks/use-undo';

interface CardContainerProps {
  card: CardDocument;
  index: number;
  listId: string;
  previewMode: boolean;
  onUpdate: (card: CardDocument, data: Partial<CardModel>) => void;
  onRemove: (card: CardDocument) => void;
}

const isLink = (tagName: string) => tagName.toLowerCase() === 'a';
const isTextArea = (tagName: string) => tagName.toLowerCase() === 'textarea';

const CardContainer = ({
  card,
  index,
  listId,
  previewMode,
  onUpdate,
  onRemove,
}: CardContainerProps) => {
  const { assignees } = useCardAssignees(card);

  const { isOpen, hideModal, showModal } = useCardFullModal();

  const onClose = useCallback(async () => {
    onRemove(card);
  }, [card]);

  const updateCard = useCallback(
    (data: Partial<CardModel>) => {
      onUpdate(card, data);
    },
    [card]
  );

  const { action, isHidden } = useUndo({
    onClose,
    onAction: hideModal,
    toastId: card.id,
    toastTitle: 'Card removed',
  });

  const handleClick = useCallback(
    () =>
      showModal({
        card,
        listId,
        onUpdate: updateCard,
        onRemove: action,
        onClose: hideModal,
      }),
    [card, listId, updateCard, action, hideModal]
  );

  const handleKeyDown = (event: React.KeyboardEvent<HTMLDivElement>) => {
    const { tagName } = event.target as HTMLElement;
    // Only open card on enter since spacebar is used by react-beautiful-dnd for keyboard dragging
    if (event.keyCode === 13 && !isLink(tagName) && !isTextArea(tagName)) {
      event.preventDefault();
      handleClick();
    }
  };

  return (
    <>
      <Card
        card={{ ...card.data, id: card.id }}
        index={index}
        previewMode={previewMode}
        assignees={assignees}
        isHidden={isHidden}
        isModalOpen={isOpen}
        onUpdate={updateCard}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
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
  onUpdate: (data: Partial<CardModel>) => void;
  onComplete?: (state: boolean) => void;
  onTagClick?: (tag: string) => void;
  onClick?: (cardId: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
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
    onKeyDown,
  }: CardProps) => {
    const checkboxes = useMemo(() => findCheckboxes(card.text), [card.text]);

    const showBadges =
      card.assignee || card.date || card.tags || checkboxes.total > 0;

    const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
      e.preventDefault();
      onClick && onClick(card.id);
    };

    const cardProps = previewMode ? {} : { onClick: handleClick };

    return (
      <DraggableElement
        id={card.id}
        index={index}
        draggable={!previewMode && !isModalOpen}
        onKeyDown={onKeyDown}
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
