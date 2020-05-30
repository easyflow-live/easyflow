import React, { useState, CSSProperties } from 'react';
import DayPicker, { DayModifiers } from 'react-day-picker';
import { MdClose } from 'react-icons/md';
import cn from 'classnames';

import './ReactDayPicker.scss';
import { Button } from '../shared';

interface CalendarProps {
  initialDate: Date;
  toggleCalendar: () => void;
  className?: string;
  style?: CSSProperties;
  onSave?: (date: Date) => void;
  onRemove?: () => void;
}

const Calendar = ({
  initialDate,
  toggleCalendar,
  className,
  style,
  onSave = () => {},
  onRemove = () => {},
}: CalendarProps) => {
  const [selectedDay, setSelectedDay] = useState(initialDate);

  const handleDayClick = (
    selectedDay: Date,
    { selected, disabled }: DayModifiers
  ) => {
    if (disabled) {
      return;
    }
    if (selected) {
      // Unselect the day if already selected
      setSelectedDay(undefined);
      return;
    }
    setSelectedDay(selectedDay);
  };

  const handleSave = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    const newDate = selectedDay || initialDate;
    onSave(newDate);

    toggleCalendar();
  };

  const handleRemove = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    event.preventDefault();
    onRemove();

    toggleCalendar();
  };

  return (
    <div
      className={cn('calendar bg-gray-600 rounded', className)}
      style={style}
    >
      <div className='flex justify-end mt-3 mr-3'>
        <button title='Close modal' onClick={toggleCalendar}>
          <MdClose color='white' />
        </button>
      </div>
      <DayPicker
        onDayClick={handleDayClick}
        selectedDays={selectedDay}
        disabledDays={{ before: new Date() }}
      />
      <div className='flex justify-around mb-3'>
        <Button onClick={handleSave} className='w-24'>
          Save
        </Button>
        <Button variant='ghost-danger' className='w-24' onClick={handleRemove}>
          Remove
        </Button>
      </div>
    </div>
  );
};

export default Calendar;
