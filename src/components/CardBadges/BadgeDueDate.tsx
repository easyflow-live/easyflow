import { observer } from 'mobx-react-lite';
import { MdAlarm } from 'react-icons/md';
import format from 'date-fns/format';
import { useMemo } from 'react';
import { differenceInCalendarDays } from 'date-fns';

interface BadgeDueDateProps {
  date: any;
}
const BadgeDueDate = ({ date }: BadgeDueDateProps) => {
  const dueDateFromToday = useMemo(
    () => date && differenceInCalendarDays(new Date(date.toDate()), new Date()),
    [date]
  );

  const dueDateString = useMemo(() => {
    if (!date) return;

    switch (dueDateFromToday) {
      case -1:
        return 'Yesterday';
      case 0:
        return 'Today';
      case 1:
        return 'Tomorrow';
      default:
        if (dueDateFromToday < -1) {
          return `${Math.abs(dueDateFromToday)} days ago`;
        } else {
          return format(new Date(date.toDate()), 'D MMM');
        }
    }
  }, [dueDateFromToday]);

  const dueDateColor = useMemo(() => {
    if (!date) return;

    switch (dueDateFromToday) {
      case 0:
        return 'bg-orange-500';

      default:
        if (dueDateFromToday < 0) {
          return 'bg-red-500';
        } else {
          return 'bg-green-500';
        }
    }
  }, [dueDateFromToday]);

  return (
    <div className={`badge ${dueDateColor}`}>
      <MdAlarm className='badge-icon' />
      &nbsp;
      {dueDateString}
    </div>
  );
};

export default observer(BadgeDueDate);
