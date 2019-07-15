import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import './ReactDayPicker.scss';

class Calendar extends Component {
  static propTypes = {
    date: PropTypes.oneOfType([PropTypes.string, PropTypes.instanceOf(Date)]),
    toggleCalendar: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    this.state = {
      selectedDay: null
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
    const { card, toggleCalendar } = this.props;

    const newDate = selectedDay ? selectedDay : card.data.date;

    card.update({ date: new Date(newDate) });

    toggleCalendar();
  };

  render() {
    const { selectedDay } = this.state;
    const { toggleCalendar } = this.props;
    return (
      <div className='calendar'>
        <DayPicker
          onDayClick={this.handleDayClick}
          selectedDays={selectedDay}
          disabledDays={{ before: new Date() }}
        />
        <div className='calendar-buttons'>
          <button onClick={this.handleSave} className='calendar-save-button'>
            Save
          </button>
          <button onClick={toggleCalendar}>Cancel</button>
        </div>
      </div>
    );
  }
}

export default Calendar;
