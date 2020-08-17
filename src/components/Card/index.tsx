import React, { useState, useRef, useMemo } from 'react';
import { observer } from 'mobx-react-lite';
import { toast } from 'react-toastify';

import { cards as cardsActions } from 'core/actions';
import CardDocument from 'documents/card.doc';
import { useMarkdownCheckbox } from 'hooks/use-markdown-checkbox';
import { findCheckboxes } from 'helpers/find-check-boxes';
import CardBadges from 'components/CardBadges';
import DraggableElement from 'components/shared/DraggableElement';
import { Card as CardModel } from 'documents/card.doc';
import { ToastUndo } from 'components/shared';
import { useBoardsStore } from 'store/boards';
import { useSession } from 'components/providers/SessionProvider';
import { useCardFullModal } from 'components/CardModal/CardModalFull';
import CardMarkdown from 'components/shared/Cards/CardMarkdown';

interface CardContainerProps {
  card: CardDocument;
  index: number;
  listId: string;
  previewMode: boolean;
}

const isLink = (tagName: string) => tagName.toLowerCase() === 'a';
const isInput = (tagName: string) => tagName.toLowerCase() === 'input';
const isTextArea = (tagName: string) => tagName.toLowerCase() === 'textarea';

const CardContainer = ({
  card,
  index,
  listId,
  previewMode,
}: CardContainerProps) => {
  const { currentBoard, getList } = useBoardsStore();
  const { userDoc } = useSession();
  const toggleCheckbox = useMarkdownCheckbox(card.data.text);

  const remove = async ({ card: removedCard }: { card: CardModel }) => {
    await card.ref.delete();
    await cardsActions.removeCardAction({
      memberCreator: userDoc.ref,
      data: {
        board: currentBoard.ref,
        list: getList(listId).ref,
        text: removedCard.text,
        title: removedCard.title || '',
      },
    });
  };

  const updateCard = (data: Partial<CardModel>) => card.ref.update(data);

  return (
    <Card
      card={{ ...card.data, id: card.id }}
      index={index}
      listId={listId}
      previewMode={previewMode}
      onRemove={remove}
      onUpdate={updateCard}
      onToggleCheckbox={toggleCheckbox}
    />
  );
};

interface CardProps {
  card: CardModel;
  index: number;
  listId: string;
  previewMode: boolean;
  onRemove: ({ card: CardModel }) => Promise<void>;
  onUpdate: (data: Partial<CardModel>) => Promise<void>;
  onToggleCheckbox: ({ checked: boolean, index: number }) => string;
}

const Card = observer(
  ({
    card,
    index,
    listId,
    previewMode,
    onRemove,
    onUpdate,
    onToggleCheckbox,
  }: CardProps) => {
    // @ts-ignore
    card.data = card;

    const { Modal, isShow, hide, show } = useCardFullModal();
    const isHiddenRef = useRef(false);
    const [, forceRenderer] = useState(false);
    const checkboxes = useMemo(() => findCheckboxes(card.text), [card.text]);

    const changeCheckbox = (checked: boolean, index: number) => {
      const newText = onToggleCheckbox({
        checked,
        index,
      });
      onUpdate({ text: newText });
    };

    const remove = async () => {
      if (!isHiddenRef.current) return;

      onRemove({ card });
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
      card.assignee || card.date || card.tags || checkboxes.total > 0;

    const cardProps = previewMode ? {} : { onClick: handleClick };

    return (
      <DraggableElement
        id={card.id}
        index={index}
        draggable={!previewMode && !isShow}
        onKeyDown={handleKeyDown}
      >
        <div>
          <CardMarkdown
            text={card.text}
            isHidden={isHiddenRef.current}
            previewMode={previewMode}
            bgColor={card.color}
            renderBadges={() =>
              showBadges && (
                <CardBadges
                  checkboxes={checkboxes}
                  card={card}
                  listId={listId}
                />
              )
            }
            {...cardProps}
          />

          <Modal
            card={card}
            listId={listId}
            onUpdate={onUpdate}
            onRemove={deleteCard}
          />
        </div>
      </DraggableElement>
    );
  }
);

export default observer(CardContainer);
