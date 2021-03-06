import React, { useState, useMemo, MutableRefObject } from 'react';
import Textarea from 'react-textarea-autosize';
import { observer } from 'mobx-react-lite';

import * as cardsActivities from 'modules/Activity/data/card-activities';
import { useBoardsStore } from 'store';
import CardDocument from 'modules/Card/data/card.doc';
import { findCheckboxes } from 'helpers/find-check-boxes';
import { useThinDisplay } from 'hooks/use-thin-display';
import { useKeySubmit } from 'hooks/use-key-submit';
import { useSession } from 'modules/Auth/components/SessionProvider';
import CardBadges from 'modules/Card/components/CardBadges';
import { Modal } from 'components/shared';
import { Card } from 'modules/Card/data/card.doc';
import { useCardAssignees } from 'modules/Card/hooks/use-card-assignees';
import CardOptions from './CardOptions';
import './CardModal.scss';

interface CardModalProps {
  card: CardDocument;
  cardElement: MutableRefObject<HTMLDivElement>;
  cardRect: any;
  isOpen: boolean;
  listId: string;
  toggleCardModal: () => void;
  onRemove: () => Promise<void>;
  onUpdate: (data: Partial<Card>) => Promise<void>;
}
const CardModal = ({
  card,
  cardElement,
  cardRect,
  isOpen,
  listId,
  toggleCardModal,
  onRemove,
  onUpdate,
}: CardModalProps) => {
  const { currentBoard, getList } = useBoardsStore();
  const { userDoc } = useSession();
  const { assignees } = useCardAssignees(card);

  const [newText, setNewText] = useState(card.data.text);

  const isThinDisplay = useThinDisplay();

  const checkboxes = useMemo(() => findCheckboxes(newText), [newText]);

  const submitCard = () => {
    const oldText = card.data.text;

    if (newText !== oldText) {
      onUpdate({ text: newText });
    }
    toggleCardModal();
  };

  const handleKeyDown = useKeySubmit(submitCard, toggleCardModal);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewText(event.target.value);
  };

  const handleRemove = () => {
    toggleCardModal();
    return onRemove();
  };

  const handleComplete = (state: boolean) => {
    if (card.data.completed !== state) {
      card.ref.update({ completed: state });
      cardsActivities.trackCompleteActivity({
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

  const handleTagClick = (tag: string) => card.removeTag(tag);

  const showBadges =
    card.data.assignee ||
    card.data.date ||
    card.data.tags ||
    checkboxes.total > 0;

  return (
    <Modal
      isOpen={isOpen}
      targetElement={cardElement}
      toggleIsOpen={toggleCardModal}
    >
      <>
        <div
          className='modal-textarea-wrapper mx-auto'
          style={{
            marginTop: isThinDisplay && '2.5%',
            height: isThinDisplay ? 'none' : cardRect.height,
            width: isThinDisplay ? '95%' : cardRect.width,
            background: card.data.color,
            maxHeight: isThinDisplay ? '55vh' : '95vh',
          }}
        >
          <Textarea
            autoFocus
            value={newText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className='modal-textarea h-full'
            style={{ minHeight: '60px' }}
            spellCheck={false}
          />

          {showBadges && (
            <CardBadges
              tags={card.data.tags}
              date={card.data.date}
              completed={card.data.completed}
              cardId={card.data.id}
              color={card.data.color}
              assignees={assignees}
              checkboxes={checkboxes}
              onComplete={handleComplete}
              onTagClick={handleTagClick}
              isModal
            />
          )}
        </div>
        <CardOptions
          card={card}
          isCardNearRightBorder={
            window.innerWidth - cardRect.right < cardRect.left
          }
          listId={listId}
          onRemove={handleRemove}
          onUpdate={onUpdate}
        />
      </>
    </Modal>
  );
};

export default observer(CardModal);
