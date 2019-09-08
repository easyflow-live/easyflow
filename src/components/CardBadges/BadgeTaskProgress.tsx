import { observer } from 'mobx-react-lite';
import { MdDoneAll } from 'react-icons/md';

interface BadgeTaskProgressProps {
  total: number;
  checked: number;
}

const BadgeTaskProgress = ({ total, checked }: BadgeTaskProgressProps) => {
  if (total === 0) {
    return null;
  }

  const bgColor = checked === total ? 'bg-green-600' : 'bg-gray-600';

  return (
    <div className={`badge badge-tasks ${bgColor}`}>
      <MdDoneAll className='badge-icon' />
      &nbsp;
      {checked}/{total}
    </div>
  );
};

export default observer(BadgeTaskProgress);
