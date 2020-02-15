import React, { useState, useMemo, MutableRefObject } from 'react';
import Textarea from 'react-textarea-autosize';

import { cards as cardsActions } from '../../core/actions';
import boardsStore from '../../store/boards';
import userStore from '../../store/users';
import CardDocument from '../../documents/card.doc';
import { findCheckboxes } from '../../helpers/find-check-boxes';
import { useThinDisplay } from '../../hooks/use-thin-display';
import { useKeySubmit } from '../../hooks/use-key-submit';
import CardBadges from '../CardBadges/CardBadges';
import Modal from '../shared/Modal';
import CardOptions from './CardOptions';
import './CardModal.scss';

interface CardModalProps {
  card: CardDocument;
  cardElement: MutableRefObject<HTMLDivElement>;
  cardRect: any;
  isOpen: boolean;
  listId: string;
  toggleCardModal: () => void;
}
const CardModal = ({
  card,
  cardElement,
  cardRect,
  isOpen,
  listId,
  toggleCardModal,
}: CardModalProps) => {
  const [newText, setNewText] = useState(card.data.text);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isTextareaFocused, setIsTextareaFocused] = useState(true);
  const isThinDisplay = useThinDisplay();

  const checkboxes = useMemo(() => findCheckboxes(newText), [newText]);

  const submitCard = () => {
    const oldText = card.data.text;
    if (newText !== oldText) {
      card.ref.update({ text: newText }).then(() =>
        cardsActions.editCardAction({
          memberCreator: userStore.currentUser.ref,
          data: {
            card: card.ref,
            list: boardsStore.getList(listId).ref,
            board: boardsStore.currentBoard.ref,
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

  const toggleColorPicker = () => {
    setIsColorPickerOpen(!isColorPickerOpen);
  };

  return (
    <Modal
      isOpen={isOpen}
      targetElement={cardElement}
      toggleIsOpen={toggleCardModal}
    >
      <>
        <div
          className='modal-textarea-wrapper'
          style={{
            height: isThinDisplay ? 'none' : cardRect.height,
            width: isThinDisplay ? '100%' : cardRect.width,
            outlineColor: isTextareaFocused ? '#ed64a6' : null,
            outlineWidth: isTextareaFocused ? '5px' : null,
            background: card.data.color,
            maxHeight: '95vh',
          }}
        >
          <Textarea
            autoFocus
            useCacheForDOMMeasurements
            value={newText}
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            className='modal-textarea'
            spellCheck={false}
            onFocus={() => setIsTextareaFocused(true)}
            onBlur={() => setIsTextareaFocused(false)}
          />
          {(card.data.assignee ||
            card.data.date ||
            card.data.tags ||
            checkboxes.total > 0) && (
            <CardBadges
              checkboxes={checkboxes}
              card={card}
              listId={listId}
              isModal
            />
          )}
        </div>
        <CardOptions
          isColorPickerOpen={isColorPickerOpen}
          card={card}
          boundingRect={cardRect}
          isCardNearRightBorder={
            window.innerWidth - cardRect.right < cardRect.left
          }
          isThinDisplay={isThinDisplay}
          toggleColorPicker={toggleColorPicker}
          listId={listId}
        />
      </>
    </Modal>
  );
};

export default CardModal;
