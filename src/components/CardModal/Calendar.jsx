import React, { Component } from 'react';
import firebase from 'firebase';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import './ReactDayPicker.scss';

class Calendar extends Component {
  static propTypes = {
    listId: PropTypes.string.isRequired,
    boardId: PropTypes.string.isRequired,
    cardId: PropTypes.string.isRequired,
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    toggleCalendar: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedDay: props.date ? new Date(props.date) : undefined,
    };
  }

  handleDayClick = (selectedDay, { selected, disabled }) => {
    if (disabled) {
      return;
    }
    if (selected) {
      // Unselect the day if already selected
      this.setState({ selectedDay: undefined });
      return;
    }
    this.setState({ selectedDay });
  };

  handleSave = () => {
    const { selectedDay } = this.state;
    const { cardId, boardId, listId, toggleCalendar } = this.props;

    firebase
      .firestore()
      .collection('boards')
      .doc(boardId)
      .collection('lists')
      .doc(listId)
      .collection('cards')
      .doc(cardId)
      .update({ date: selectedDay });

    toggleCalendar();
  };

  render() {
    const { selectedDay } = this.state;
    const { toggleCalendar } = this.props;
    return (
      <div className="calendar">
        <DayPicker
          onDayClick={this.handleDayClick}
          selectedDays={selectedDay}
          disabledDays={{ before: new Date() }}
        />
        <div className="calendar-buttons">
          <button onClick={this.handleSave} className="calendar-save-button">
            Save
          </button>
          <button onClick={toggleCalendar}>Cancel</button>
        </div>
      </div>
    );
  }
}

export default Calendar;
