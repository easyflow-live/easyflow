import format from 'date-fns/format';
import { useMemo } from 'react';
import { differenceInCalendarDays } from 'date-fns';

export const useDueDate = (
  date: any,
  completed: boolean
): { dueDateString: string; dueDateColor: string; dueTitle: string } => {
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
          return format(new Date(date.toDate()), 'd MMM');
        }
    }
  }, [dueDateFromToday, date]);

  const dueDateColor = useMemo(() => {
    if (!date) return;
    if (completed) return 'bg-green-500';

    switch (dueDateFromToday) {
      case 0:
        return 'bg-orange-500';

      default:
        if (dueDateFromToday < 0) {
          return 'bg-red-500';
        } else {
          return 'bg-gray-500';
        }
    }
  }, [dueDateFromToday, completed, date]);

  const dueTitle = useMemo(() => {
    if (!date) return;
    if (completed) return 'This card is completed';

    switch (dueDateFromToday) {
      case 0:
        return 'This card is due today';
      case 1:
        return 'This card is due tomorrow';
      default:
        if (dueDateFromToday < 0) {
          return 'This card is past due.';
        } else {
          return 'This card is due later.';
        }
    }
  }, [dueDateFromToday, completed, date]);

  return { dueTitle, dueDateColor, dueDateString };
};
