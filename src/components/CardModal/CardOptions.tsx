import React, { useState, useRef } from 'react';
import { FaTrash } from 'react-icons/fa';
import { MdAlarm, MdColorize } from 'react-icons/md';
import { observer } from 'mobx-react-lite';

import CardDocument, { Card } from 'documents/card.doc';
import ClickOutside from 'components/shared/ClickOutside';
import { Divider, Modal } from 'components/shared';
import Calendar from 'components/shared/Calendar';
import CardOptionAssignToMe from './CardOptionAssignToMe';
import './CardOptions.scss';
import CardOptionButton from './CardOptionButton';
import CardOptionColors from './CardOptionColors';

interface CardOptionsProps {
  card: CardDocument;
  isCardNearRightBorder: boolean;
  listId: string;
  onRemove: () => Promise<void>;
  onUpdate: (data: Partial<Card>) => Promise<void>;
}

const CardOptions = ({
  card,
  isCardNearRightBorder,
  listId,
  onRemove,
  onUpdate,
}: CardOptionsProps) => {
  const calendaButtonRef = useRef<HTMLButtonElement>();
  const colorPickerButton = useRef<HTMLButtonElement>();

  const [isColorPickerOpen, setIsColorPickerOpen] = useState(false);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const toggleColorPicker = () => setIsColorPickerOpen(!isColorPickerOpen);

  const changeColor = color => {
    if (card.data.color !== color.code) {
      onUpdate({ colorRef: color.ref, color: color.code });
    }

    toggleColorPicker();
    colorPickerButton.current.blur();
  };

  const handleKeyDown = event => {
    if (event.keyCode === 27) {
      toggleColorPicker();
      colorPickerButton.current.focus();
    }
  };

  const toggleCalendar = () => setIsCalendarOpen(!isCalendarOpen);

  const saveCardCalendar = (date: Date) => onUpdate({ date });

  const removeCardCalendar = () => onUpdate({ date: '' });

  const onColorPickerClick = () => {
    colorPickerButton.current.focus();
    toggleColorPicker();
  };

  return (
    <>
      <div
        className='flex flex-col flex-shrink-0 text-white bg-gray-700 px-0 py-2 my-0 mx-auto sm:mx-2 w-95 sm:w-auto shadow-lg rounded'
        style={{
          alignItems: isCardNearRightBorder ? 'flex-end' : 'flex-start',
        }}
      >
        <div className='mb-2 min-w-full px-2'></div>

        <CardOptionButton
          onClick={onColorPickerClick}
          onKeyDown={handleKeyDown}
          ref={colorPickerButton}
          aria-haspopup
          aria-expanded={isColorPickerOpen}
        >
          <div className='modal-icon'>
            <MdColorize />
          </div>
          &nbsp;Color
          {isColorPickerOpen && (
            <ClickOutside
              eventTypes='click'
              handleClickOutside={toggleColorPicker}
            >
              <CardOptionColors
                onKeyDown={handleKeyDown}
                onClick={changeColor}
              />
            </ClickOutside>
          )}
        </CardOptionButton>

        <CardOptionButton onClick={toggleCalendar} ref={calendaButtonRef}>
          <div className='modal-icon'>
            <MdAlarm />
          </div>
          &nbsp;Due date
        </CardOptionButton>

        <CardOptionAssignToMe card={card} listId={listId} />

        <Divider />

        <CardOptionButton onClick={onRemove} className='text-red-400'>
          <div className='modal-icon'>
            <FaTrash />
          </div>
          &nbsp;Delete
        </CardOptionButton>
      </div>

      <Modal
        targetElement={calendaButtonRef}
        isOpen={isCalendarOpen}
        toggleIsOpen={toggleCalendar}
      >
        <Calendar
          initialDate={new Date(card.data.date || '')}
          toggleCalendar={toggleCalendar}
          onSave={saveCardCalendar}
          onRemove={removeCardCalendar}
        />
      </Modal>
    </>
  );
};

export default observer(CardOptions);
