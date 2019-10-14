import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DayPicker from 'react-day-picker';
import './ReactDayPicker.scss';
import { MdClose } from 'react-icons/md';

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

  handleRemove = () => {
    const { card, toggleCalendar } = this.props;

    card.update({ date: '' });

    toggleCalendar();
  };

  render() {
    const { selectedDay } = this.state;
    const { toggleCalendar } = this.props;
    return (
      <div className='calendar bg-gray-700'>
        <div className='flex justify-end mt-3 mr-3'>
          <button title='Close modal' onClick={toggleCalendar}>
            <MdClose color='white' />
          </button>
        </div>
        <DayPicker
          onDayClick={this.handleDayClick}
          selectedDays={selectedDay}
          disabledDays={{ before: new Date() }}
        />
        <div className='flex justify-around mb-3 calendar-buttons'>
          <button
            onClick={this.handleSave}
            className='bg-pink-500 text-white hover:bg-pink-700'
          >
            Save
          </button>
          <button
            className='bg-transparent text-red-500 hover:bg-red-500 hover:text-white'
            onClick={this.handleRemove}
          >
            Remove
          </button>
        </div>
      </div>
    );
  }
}

export default Calendar;
