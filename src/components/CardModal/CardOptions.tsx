import React, { Component, createRef, RefObject } from 'react';
import { FaTrash } from 'react-icons/fa';
import { MdAlarm, MdColorize } from 'react-icons/md';
import { toast } from 'react-toastify';

import { cards } from '../../core/actions';
import boardsStore from '../../store/boards';
import usersStore from '../../store/users';
import CardDocument from '../../documents/card.doc';
import AddTagsWithAutocomplete from '../Tag/AddTagsWithAutocomplete';
import ClickOutside from '../ClickOutside/ClickOutside';
import Modal from '../Modal/Modal';
import Calendar from './Calendar';
import CardOptionAssignToMe from './CardOptionAssignToMe';
import './CardOptions.scss';
import CardOptionButton from './CardOptionButton';
import CardOptionColors from './CardOptionColors';
import { observer } from 'mobx-react';

interface CardOptionsProps {
  isColorPickerOpen: boolean;
  card: CardDocument;
  isCardNearRightBorder: boolean;
  isThinDisplay: boolean;
  boundingRect: object;
  listId: string;
  toggleColorPicker: () => void;
}

interface State {
  isCalendarOpen: boolean;
}

class CardOptions extends Component<CardOptionsProps, State> {
  calendaButtonRef: RefObject<HTMLButtonElement>;
  colorPickerButton: RefObject<HTMLButtonElement>;

  constructor(props) {
    super(props);
    this.state = { isCalendarOpen: false };

    this.calendaButtonRef = createRef();
    this.colorPickerButton = createRef();
  }

  deleteCard = async () => {
    const { card } = this.props;
    const textBackup = card.data.text;

    await card.ref.delete().then(() =>
      cards.removeCardAction({
        memberCreator: usersStore.currentUser.ref,
        data: {
          board: boardsStore.currentBoard.ref,
          list: boardsStore.getList(this.props.listId).ref,
          text: textBackup,
          title: card.data.title || '',
        },
      })
    );
    toast('Card was removed.');
  };

  changeColor = color => {
    const { card, toggleColorPicker } = this.props;

    if (card.data.color !== color.code) {
      card.ref.update({ colorRef: color.ref, color: color.code });
    }

    toggleColorPicker();
    this.colorPickerButton.current.focus();
  };

  handleKeyDown = event => {
    if (event.keyCode === 27) {
      this.props.toggleColorPicker();
      this.colorPickerButton.current.focus();
    }
  };

  handleClickOutside = () => {
    const { toggleColorPicker } = this.props;
    toggleColorPicker();
    this.colorPickerButton.current.focus();
  };

  toggleCalendar = () => {
    this.setState({ isCalendarOpen: !this.state.isCalendarOpen });
  };

  render() {
    const {
      isCardNearRightBorder,
      isColorPickerOpen,
      toggleColorPicker,
      card,
    } = this.props;
    const { isCalendarOpen } = this.state;

    return (
      <div
        className='options-list'
        style={{
          alignItems: isCardNearRightBorder ? 'flex-end' : 'flex-start',
        }}
      >
        <div className='mb-1'>
          <AddTagsWithAutocomplete card={card} />
        </div>
        <div className='mt-xs'>
          <CardOptionButton
            onClick={this.deleteCard}
            className='hover:text-red-500'
          >
            <div className='modal-icon'>
              <FaTrash />
            </div>
            &nbsp;Delete
          </CardOptionButton>
        </div>
        <div className='modal-color-picker-wrapper'>
          <CardOptionButton
            onClick={toggleColorPicker}
            onKeyDown={this.handleKeyDown}
            ref={this.colorPickerButton}
            aria-haspopup
            aria-expanded={isColorPickerOpen}
          >
            <MdColorize />
            &nbsp;Color
          </CardOptionButton>
          {isColorPickerOpen && (
            <ClickOutside
              eventTypes='click'
              handleClickOutside={this.handleClickOutside}
            >
              <CardOptionColors
                onKeyDown={this.handleKeyDown}
                onClick={this.changeColor}
              />
            </ClickOutside>
          )}
        </div>
        <div>
          <CardOptionButton
            onClick={this.toggleCalendar}
            ref={this.calendaButtonRef}
          >
            <div className='modal-icon'>
              <MdAlarm />
            </div>
            &nbsp;Due date
          </CardOptionButton>
        </div>
        <CardOptionAssignToMe card={card} listId={this.props.listId} />
        <Modal
          targetElement={this.calendaButtonRef}
          isOpen={isCalendarOpen}
          toggleIsOpen={this.toggleCalendar}
        >
          <Calendar
            card={card}
            date={new Date(card.data.date)}
            toggleCalendar={this.toggleCalendar}
          />
        </Modal>
      </div>
    );
  }
}

export default observer(CardOptions);
