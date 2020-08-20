import React, { useMemo, useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import CardDocument from 'documents/card.doc';
import { findCheckboxes } from 'helpers/find-check-boxes';
import CardBadges from 'components/CardBadges';
import { Card as CardModel } from 'documents/card.doc';
import CardMarkdown from 'components/shared/Cards/CardMarkdown';
import { useCardAssignees } from 'hooks/use-card-assignees';
import { User } from 'store/users';
import { useUndo } from 'hooks/use-undo';
import { CardModalProps } from 'components/CardModal/CardModalFull';

interface CardContainerProps {
  card: CardDocument;
  listId: string;
  previewMode: boolean;
  onUpdate: (card: CardDocument, data: Partial<CardModel>) => void;
  onRemove: (card: CardDocument) => void;
  onHideModal: () => void;
  onShowModal: (props: CardModalProps) => void;
}

const isLink = (tagName: string) => tagName.toLowerCase() === 'a';
const isTextArea = (tagName: string) => tagName.toLowerCase() === 'textarea';

const CardContainer = ({
  card,
  listId,
  previewMode,
  onUpdate,
  onRemove,
  onHideModal,
  onShowModal,
}: CardContainerProps) => {
  const { assignees } = useCardAssignees(card);

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
    onAction: onHideModal,
    toastId: card.id,
    toastTitle: 'Card removed',
  });

  const handleClick = useCallback(
    () =>
      onShowModal({
        card,
        listId,
        onUpdate: updateCard,
        onRemove: action,
        onClose: onHideModal,
      }),
    [card, listId, updateCard, action, onHideModal]
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
        previewMode={previewMode}
        assignees={assignees}
        isHidden={isHidden}
        onUpdate={updateCard}
        onClick={handleClick}
        onKeyDown={handleKeyDown}
      />
    </>
  );
};

interface CardProps {
  card: CardModel;
  previewMode: boolean;
  assignees: User[];
  isHidden: boolean;
  onUpdate: (data: Partial<CardModel>) => void;
  onComplete?: (state: boolean) => void;
  onTagClick?: (tag: string) => void;
  onClick?: (cardId: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

const Card = observer(
  ({
    card,
    previewMode,
    assignees,
    isHidden,
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

    const cardProps = previewMode ? {} : { onClick: handleClick, onKeyDown };

    return (
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
    );
  }
);

export default observer(CardContainer);
