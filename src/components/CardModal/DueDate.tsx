import { observer } from 'mobx-react-lite';

import { useDueDate } from '../../hooks/use-due-date';

interface DueDateProps {
  date: any;
  completed?: boolean;
}

const DueDate = ({ date, completed }: DueDateProps) => {
  const { dueTitle, dueDateString } = useDueDate(date, completed);

  return date ? (
    <span className='text-white' title={dueTitle}>
      {dueDateString}
    </span>
  ) : (
    <span>No date</span>
  );
};

export default observer(DueDate);
