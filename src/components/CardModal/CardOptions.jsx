import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import { FaTrash } from 'react-icons/fa';
import { MdAlarm } from 'react-icons/md';
import firebase from 'firebase';

import Calendar from './Calendar';
import ClickOutside from '../ClickOutside/ClickOutside';
import CardOptionAssignToMe from './CardOptionAssignToMe';
import './CardOptions.scss';

class CardOptions extends Component {
  static propTypes = {
    isColorPickerOpen: PropTypes.bool.isRequired,
    card: PropTypes.shape({ id: PropTypes.string.isRequired }).isRequired,
    isCardNearRightBorder: PropTypes.bool.isRequired,
    isThinDisplay: PropTypes.bool.isRequired,
    boundingRect: PropTypes.object.isRequired,
    toggleColorPicker: PropTypes.func.isRequired
  };

  constructor() {
    super();
    this.state = { isCalendarOpen: false };
  }

  deleteCard = () => {
    const { card } = this.props;
    card.ref.delete();
  };

  changeColor = color => {
    const { card, toggleColorPicker } = this.props;
    if (card.data.color !== color) {
      card.ref.update({ color });
    }
    toggleColorPicker();
    this.colorPickerButton.focus();
  };

  handleKeyDown = event => {
    if (event.keyCode === 27) {
      this.props.toggleColorPicker();
      this.colorPickerButton.focus();
    }
  };

  handleClickOutside = () => {
    const { toggleColorPicker } = this.props;
    toggleColorPicker();
    this.colorPickerButton.focus();
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
      isThinDisplay,
      boundingRect
    } = this.props;
    const { isCalendarOpen } = this.state;

    const calendarStyle = {
      content: {
        top: Math.min(boundingRect.bottom + 10, window.innerHeight - 300),
        left: boundingRect.left
      }
    };

    const calendarMobileStyle = {
      content: {
        top: 110,
        left: '50%',
        transform: 'translateX(-50%)'
      }
    };
    return (
      <div
        className='options-list'
        style={{
          alignItems: isCardNearRightBorder ? 'flex-end' : 'flex-start'
        }}
      >
        <div>
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
            ref={ref => {
              this.colorPickerButton = ref;
            }}
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
                {/* eslint-enable */}
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
          <button onClick={this.toggleCalendar} className='options-list-button'>
            <div className='modal-icon'>
              <MdAlarm />
            </div>
            &nbsp;Due date
          </button>
        </div>
        <CardOptionAssignToMe card={card} />
        <Modal
          isOpen={isCalendarOpen}
          onRequestClose={this.toggleCalendar}
          overlayClassName='calendar-underlay'
          className='calendar-modal'
          style={isThinDisplay ? calendarMobileStyle : calendarStyle}
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
