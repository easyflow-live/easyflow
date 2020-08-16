import React from 'react';
import { observer } from 'mobx-react-lite';
import { MdAlarm } from 'react-icons/md';

import { Badge, Checkbox } from 'components/shared';
import { useDueDate } from 'hooks/use-due-date';

interface BadgeDueDateProps {
  date: any;
  completed?: boolean;
  id: string;
  showCheckbox?: boolean;
  onComplete: (completed: boolean) => void;
}

const BadgeDueDate: React.FC<BadgeDueDateProps> = props => {
  const { date, completed, id, showCheckbox, onComplete } = props;
  const { dueDateColor, dueTitle, dueDateString } = useDueDate(date, completed);

  return (
    date && (
      <Badge className={dueDateColor} title={dueTitle}>
        <MdAlarm className='badge-icon' />
        &nbsp;
        {dueDateString}
        &nbsp;
        {showCheckbox && (
          <Checkbox
            id={`due-complete-${id}`}
            checked={completed}
            onChange={e => onComplete(e.target.checked)}
          />
        )}
      </Badge>
    )
  );
};

export default observer(BadgeDueDate);
