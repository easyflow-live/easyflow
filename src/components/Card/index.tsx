import React, { useMemo, useCallback } from 'react';
import { observer } from 'mobx-react-lite';

import { cards as cardsActions } from 'core/actions';
import CardDocument from 'documents/card.doc';
import { useMarkdownCheckbox } from 'hooks/use-markdown-checkbox';
import { findCheckboxes } from 'helpers/find-check-boxes';
import CardBadges from 'components/CardBadges';
import DraggableElement from 'components/shared/DraggableElement';
import { Card as CardModel } from 'documents/card.doc';
import { useBoardsStore } from 'store/boards';
import { useSession } from 'components/providers/SessionProvider';
import { useCardFullModal } from 'components/CardModal/CardModalFull';
import CardMarkdown from 'components/shared/Cards/CardMarkdown';
import { useCardAssignees } from 'hooks/use-card-assignees';
import { User } from 'store/users';
import { useUndo } from 'hooks/use-undo';

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
  const { assignees } = useCardAssignees(card);

  const { Modal, isShow, hide, show } = useCardFullModal();

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

  const onClose = useCallback(() => {
    remove({ card: card.data });
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

  const handleTagClick = (tag: string) => card.removeTag(tag);

  const handleComplete = (state: boolean) => {
    if (card.data.completed !== state) {
      updateCard({ completed: state });

      cardsActions.completeCardAction({
        memberCreator: userDoc && userDoc.ref,
        data: {
          card: card.ref,
          board: currentBoard.ref,
          list: getList(listId).ref,
          title: card.data.title || '',
          completed: state,
        },
      });
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
        isModalOpen={isShow}
        onUpdate={updateCard}
        onToggleCheckbox={toggleCheckbox}
        onComplete={handleComplete}
        onTagClick={handleTagClick}
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
  onToggleCheckbox: ({ checked: boolean, index: number }) => string;
  onComplete: (state: boolean) => void;
  onTagClick: (tag: string) => Promise<void>;
  onClick: () => void;
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
    onToggleCheckbox,
    onComplete,
    onTagClick,
    onClick,
  }: CardProps) => {
    const checkboxes = useMemo(() => findCheckboxes(card.text), [card.text]);

    const changeCheckbox = (checked: boolean, index: number) => {
      const newText = onToggleCheckbox({
        checked,
        index,
      });
      onUpdate({ text: newText });
    };

    const handleClick = event => {
      const { tagName, checked, id } = event.target;

      if (isInput(tagName)) {
        changeCheckbox(checked, parseInt(id));
      } else if (!isLink(tagName)) {
        onClick();
      }
    };

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

    const cardProps = previewMode ? {} : { onClick: handleClick };

    return (
      <DraggableElement
        id={card.id}
        index={index}
        draggable={!previewMode && !isModalOpen}
        onKeyDown={handleKeyDown}
      >
        <CardMarkdown
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
