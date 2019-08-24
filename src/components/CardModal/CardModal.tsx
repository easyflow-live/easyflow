import React, { useState, useMemo, MutableRefObject } from 'react';
import Textarea from 'react-textarea-autosize';

import CardDocument from '../../documents/card.doc';
import { findCheckboxes } from '../../helpers/find-check-boxes';
import { useThinDisplay } from '../../hooks/use-thin-display';
import { useKeySubmit } from '../../hooks/use-key-submit';
import CardBadges from '../CardBadges/CardBadges';
import Modal from '../Modal/Modal';
import CardOptions from './CardOptions';
import './CardModal.scss';

interface CardModalProps {
  card: CardDocument;
  cardElement: MutableRefObject<HTMLDivElement>;
  cardRect: any;
  isOpen: boolean;
  toggleCardModal: () => void;
}
const CardModal = ({
  card,
  cardElement,
  cardRect,
  isOpen,
  toggleCardModal,
}: CardModalProps) => {
  const [newText, setNewText] = useState(card.data.text);
  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isTextareaFocused, setIsTextareaFocused] = useState(true);
  const isThinDisplay = useThinDisplay();

  const checkboxes = useMemo(() => findCheckboxes(newText), [newText]);

  const submitCard = () => {
    if (newText !== card.data.text) {
      card.ref.update({ text: newText });
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
            minHeight: isThinDisplay ? 'none' : cardRect.height,
            width: isThinDisplay ? '100%' : cardRect.width,
            outlineColor: isTextareaFocused ? '#ed64a6' : null,
            outlineWidth: isTextareaFocused ? '5px' : null,
            background: card.data.color,
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
              date={
                card.data.date ? new Date(card.data.date.seconds * 1000) : ''
              }
              checkboxes={checkboxes}
              card={card}
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
        />
      </>
    </Modal>
  );
};

export default CardModal;
