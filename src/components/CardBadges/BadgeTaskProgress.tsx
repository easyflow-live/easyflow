import React from 'react';
import { observer } from 'mobx-react-lite';
import { MdDoneAll } from 'react-icons/md';
import cn from 'classnames';

import Badge from '../shared/Badge';

interface BadgeTaskProgressProps {
  total: number;
  checked: number;
  className?: string;
}

const BadgeTaskProgress: React.FC<BadgeTaskProgressProps> = props => {
  const { total, checked, className } = props;
  if (total === 0) {
    return null;
  }

  const bgColor = checked === total ? 'bg-green-500' : 'bg-gray-500';

  return (
    <Badge className={cn('max-w-full', bgColor, className)}>
      <MdDoneAll className='badge-icon' />
      &nbsp;
      {checked}/{total}
    </Badge>
  );
};

export default observer(BadgeTaskProgress);
