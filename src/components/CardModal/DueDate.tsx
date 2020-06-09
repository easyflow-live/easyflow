import React from 'react';
import { observer } from 'mobx-react-lite';

import { useDueDate } from '../../hooks/use-due-date';

interface DueDateProps {
  date: any;
  completed?: boolean;
}

const DueDate: React.FC<DueDateProps> = props => {
  const { date, completed } = props;

  const { dueTitle, dueDateString, dueDateColor } = useDueDate(date, completed);

  return date ? (
    <span
      className={dueDateColor
        .replace('bg-', 'text-')
        .replace('text-gray-500', 'text-white')}
      title={dueTitle}
    >
      {dueDateString}
    </span>
  ) : (
    <span>No date</span>
  );
};

export default observer(DueDate);
