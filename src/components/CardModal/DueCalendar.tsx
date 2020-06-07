import { useRef } from 'react';
import { observer } from 'mobx-react-lite';
import usePortal from 'react-cool-portal';
import { useSpring, animated } from 'react-spring';

import { useRect } from '../../hooks/use-rect';
import { Card } from '../../documents/card.doc';
import DueDate from './DueDate';
import Calendar from './Calendar';
import { Checkbox } from '../shared';
import styled from 'styled-components';

const TOP_PADDING = 10;

const Container = styled.div`
  & span.done {
    transition: transform 0.3s, opacity 0.3s;
    transform: translateX(-50%);
    opacity: 0;
  }

  &:hover span.done {
    transform: translateX(0);
    opacity: 1;
  }
`;

interface DueCalendarProps {
  date: any;
  completed: boolean;
  onUpdate: (data: Partial<Card>) => Promise<void>;
}

export const DueCalendar = observer(
  ({ date, completed, onUpdate }: DueCalendarProps) => {
    const calendaButtonRef = useRef<HTMLButtonElement>();
    const [buttonRect] = useRect(calendaButtonRef);

    const saveCardCalendar = (date: Date) => onUpdate({ date });
    const removeCardCalendar = () => onUpdate({ date: '' });

    const toggleDueStatus = (e: React.ChangeEvent<HTMLInputElement>) =>
      onUpdate({ completed: e.target.checked });

    const { Portal, toggle, isShow } = usePortal({ defaultShow: false });
    const style = useSpring({ opacity: isShow ? 1 : 0 });

    const toDate = date ? new Date(date.toDate()) : new Date();

    return (
      <Container className='relative'>
        <div className='-ml-2 inline-flex hover:bg-gray-800 rounded transition duration-300'>
          <button
            className='p-2 text-white text-sm'
            onClick={toggle}
            ref={calendaButtonRef}
          >
            <DueDate date={date} completed={completed} />
          </button>
        </div>

        <span className='done ml-2 inline-flex items-center'>
          <Checkbox checked={completed} onChange={toggleDueStatus} />
          <span className='text-xs text-white ml-2'>Done?</span>
        </span>

        <Portal>
          <animated.div
            className='absolute z-10'
            style={{
              ...style,
              top: buttonRect.top + TOP_PADDING,
              left: buttonRect.left,
            }}
          >
            <Calendar
              initialDate={toDate}
              toggleCalendar={toggle}
              onSave={saveCardCalendar}
              onRemove={removeCardCalendar}
            />
          </animated.div>
        </Portal>
      </Container>
    );
  }
);
