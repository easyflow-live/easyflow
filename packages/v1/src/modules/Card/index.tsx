import React, { useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import CardDocument from 'modules/Card/data/card.doc';
import { Card as CardModel } from 'modules/Card/data/card.doc';
import { useCardAssignees } from 'modules/Card/hooks/use-card-assignees';
import { useUndo } from 'hooks/use-undo';
import { CardModalProps } from 'modules/Card/components/CardModal/CardModalFull';
import Card from 'modules/Card/components/Card';

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
  }, [card, onRemove]);

  const updateCard = useCallback(
    (data: Partial<CardModel>) => {
      onUpdate(card, data);
    },
    [card, onUpdate]
  );

  const { action, isHidden } = useUndo({
    onCloseComplete: onClose,
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
    [card, listId, updateCard, action, onHideModal, onShowModal]
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

export default observer(CardContainer);
