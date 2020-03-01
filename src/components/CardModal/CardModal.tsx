import React, { useState, useMemo, MutableRefObject } from 'react';
import Textarea from 'react-textarea-autosize';
import { observer } from 'mobx-react-lite';

import { cards as cardsActions } from '../../core/actions';
import { useBoardsStore } from '../../store';
import CardDocument from '../../documents/card.doc';
import { findCheckboxes } from '../../helpers/find-check-boxes';
import { useThinDisplay } from '../../hooks/use-thin-display';
import { useKeySubmit } from '../../hooks/use-key-submit';
import { useSession } from '../providers/SessionProvider';
import CardBadges from '../CardBadges/CardBadges';
import { Modal } from '../shared';
import CardOptions from './CardOptions';
import './CardModal.scss';
import { Card } from '../../documents/card.doc';

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

  const [newText, setNewText] = useState(card.data.text);

  const isThinDisplay = useThinDisplay();

  const checkboxes = useMemo(() => findCheckboxes(newText), [newText]);

  const submitCard = () => {
    const oldText = card.data.text;

    if (newText !== oldText) {
      onUpdate({ text: newText }).then(() =>
        cardsActions.editCardAction({
          memberCreator: userDoc.ref,
          data: {
            card: card.ref,
            list: getList(listId).ref,
            board: currentBoard.ref,
            oldText,
            newText,
            title: card.data.title || '',
          },
        })
      );
    }
    toggleCardModal();
  };

  const handleKeyDown = useKeySubmit(submitCard, toggleCardModal);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewText(event.target.value);
  };

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
              checkboxes={checkboxes}
              card={card}
              listId={listId}
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
          onRemove={onRemove}
          onUpdate={onUpdate}
        />
      </>
    </Modal>
  );
};

export default observer(CardModal);
