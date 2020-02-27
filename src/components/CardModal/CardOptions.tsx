import React, { useState, useRef } from 'react';
import { FaTrash } from 'react-icons/fa';
import { MdAlarm, MdColorize } from 'react-icons/md';
import { toast } from 'react-toastify';
import { observer } from 'mobx-react-lite';

import { cards } from '../../core/actions';
import { useBoardsStore } from '../../store';
import CardDocument from '../../documents/card.doc';
import AddTagsWithAutocomplete from '../TagList/AddTagsWithAutocomplete';
import ClickOutside from '../shared/ClickOutside';
import Modal from '../shared/Modal';
import Divider from '../shared/Divider';
import { useSession } from '../providers/SessionProvider';
import Calendar from './Calendar';
import CardOptionAssignToMe from './CardOptionAssignToMe';
import './CardOptions.scss';
import CardOptionButton from './CardOptionButton';
import CardOptionColors from './CardOptionColors';

interface CardOptionsProps {
  isColorPickerOpen: boolean;
  card: CardDocument;
  isCardNearRightBorder: boolean;
  listId: string;
  toggleColorPicker: () => void;
}

const CardOptions = ({
  card,
  isColorPickerOpen,
  isCardNearRightBorder,
  listId,
  toggleColorPicker,
}: CardOptionsProps) => {
  const { currentBoard, getList } = useBoardsStore();
  const { userDoc } = useSession();

  const calendaButtonRef = useRef<HTMLButtonElement>();
  const colorPickerButton = useRef<HTMLButtonElement>();

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  const deleteCard = async () => {
    const textBackup = card.data.text;

    await card.ref.delete().then(() =>
      cards.removeCardAction({
        memberCreator: userDoc.ref,
        data: {
          board: currentBoard.ref,
          list: getList(listId).ref,
          text: textBackup,
          title: card.data.title || '',
        },
      })
    );
    toast('Card was removed.');
  };

  const changeColor = color => {
    if (card.data.color !== color.code) {
      card.ref.update({ colorRef: color.ref, color: color.code });
    }

    toggleColorPicker();
    colorPickerButton.current.focus();
  };

  const handleKeyDown = event => {
    if (event.keyCode === 27) {
      toggleColorPicker();
      colorPickerButton.current.focus();
    }
  };

  const handleClickOutside = () => {
    toggleColorPicker();
    colorPickerButton.current.focus();
  };

  const toggleCalendar = () => {
    setIsCalendarOpen(!isCalendarOpen);
  };

  const saveCardCalendar = (date: Date) => card.update({ date });

  const removeCardCalendar = () => card.update({ date: '' });

  return (
    <>
      <div
        className='flex flex-col flex-shrink-0 text-white bg-gray-700 px-0 py-2 my-0 mx-auto sm:mx-2 w-95 sm:w-auto shadow-lg rounded'
        style={{
          alignItems: isCardNearRightBorder ? 'flex-end' : 'flex-start',
        }}
      >
        <div className='mb-2 min-w-full px-2'>
          <AddTagsWithAutocomplete card={card} />
        </div>

        <CardOptionButton
          onClick={toggleColorPicker}
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
              handleClickOutside={handleClickOutside}
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

        <CardOptionButton onClick={deleteCard} className='text-red-400'>
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
