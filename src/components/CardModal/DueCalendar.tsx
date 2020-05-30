import { useRef, useState } from 'react';
import ReactDOM from 'react-dom';
import { observer } from 'mobx-react-lite';

import { Card } from '../../documents/card.doc';
import { useRect } from '../../hooks/use-rect';
import DueDate from './DueDate';
import Calendar from './Calendar';

const TOP_PADDING = 10;

interface DueCalendarProps {
  date: any;
  completed: boolean;
  onUpdate: (data: Partial<Card>) => Promise<void>;
}

export const DueCalendar = observer(
  ({ date, completed, onUpdate }: DueCalendarProps) => {
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);
    const calendaButtonRef = useRef<HTMLButtonElement>();

    const [buttonRect] = useRect(calendaButtonRef);

    const toggleCalendar = () => setIsCalendarOpen(s => !s);
    const saveCardCalendar = (date: Date) => onUpdate({ date });
    const removeCardCalendar = () => onUpdate({ date: '' });

    return (
      <div className='relative'>
        <div className='-ml-2 inline-flex hover:bg-gray-800 rounded transition duration-300'>
          <button
            className='p-2 text-white text-sm'
            onClick={toggleCalendar}
            ref={calendaButtonRef}
          >
            <DueDate date={date} completed={completed} />
          </button>
        </div>

        {isCalendarOpen &&
          ReactDOM.createPortal(
            <Calendar
              style={{
                zIndex: 40,
                top: buttonRect.top + TOP_PADDING,
                left: buttonRect.left,
              }}
              className='absolute z-10 shadow'
              initialDate={new Date(date.toDate() || '')}
              toggleCalendar={toggleCalendar}
              onSave={saveCardCalendar}
              onRemove={removeCardCalendar}
            />,
            document.getElementById('__next')
          )}
      </div>
    );
  }
);
