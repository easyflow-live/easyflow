import React, { Component, createRef, RefObject } from 'react';
import { FaTrash } from 'react-icons/fa';
import { MdAlarm } from 'react-icons/md';
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
    if (card.data.color !== color) {
      card.ref.update({ color });
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
          <button onClick={this.deleteCard} className='options-list-button'>
            <div className='modal-icon'>
              <FaTrash />
            </div>
            &nbsp;Delete
          </button>
        </div>
        <div className='modal-color-picker-wrapper'>
          <button
            className='options-list-button'
            onClick={toggleColorPicker}
            onKeyDown={this.handleKeyDown}
            ref={this.colorPickerButton}
            aria-haspopup
            aria-expanded={isColorPickerOpen}
          >
            <img
              src={'/static/images/color-icon.png'}
              alt='colorwheel'
              className='modal-icon'
            />
            &nbsp;Color
          </button>
          {isColorPickerOpen && (
            <ClickOutside
              eventTypes='click'
              handleClickOutside={this.handleClickOutside}
            >
              {/* eslint-disable */}
              <div
                className='modal-color-picker'
                onKeyDown={this.handleKeyDown}
              >
                {['white', '#6df', '#6f6', '#ff6', '#fa4', '#f66'].map(
                  color => (
                    <button
                      key={color}
                      style={{ background: color }}
                      className='color-picker-color'
                      onClick={() => this.changeColor(color)}
                    />
                  )
                )}
              </div>
            </ClickOutside>
          )}
        </div>
        <div>
          <button
            onClick={this.toggleCalendar}
            className='options-list-button'
            ref={this.calendaButtonRef}
          >
            <div className='modal-icon'>
              <MdAlarm />
            </div>
            &nbsp;Due date
          </button>
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

export default CardOptions;
