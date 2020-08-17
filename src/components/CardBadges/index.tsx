import React from 'react';
import { observer } from 'mobx-react-lite';

import BadgeTags from 'components/shared/BadgeTags';
import Assignee from 'components/shared/Assignee';
import BadgeTaskProgress from 'components/shared/BadgeTaskProgress';
import BadgeDueDate from 'components/shared/BadgeDueDate';
import { User } from 'store/users';

interface CardBadgesProps {
  tags: string[];
  date: string | Date;
  completed: boolean;
  cardId: string;
  color: string;
  assignees: User[];
  checkboxes: { total: number; checked: number };
  isModal?: boolean;
  onComplete: (state: boolean) => void;
  onTagClick: (tag: string) => Promise<void>;
}

const CardBadges = ({
  tags,
  date,
  completed,
  cardId,
  color,
  assignees,
  checkboxes,
  isModal,
  onComplete,
  onTagClick,
}: CardBadgesProps) => {
  return (
    <div className='flex flex-col px-2 pb-2'>
      <div>
        <BadgeTags tags={tags} onTagClick={onTagClick} removable={isModal} />
      </div>

      <div className='flex justify-between items-center mt-2'>
        <div>
          <Assignee assignees={assignees} avatarColor={color} />
        </div>

        <div className='flex items-center'>
          <BadgeTaskProgress
            className='mr-1'
            total={checkboxes.total}
            checked={checkboxes.checked}
          />

          <BadgeDueDate
            date={date}
            completed={completed}
            id={cardId}
            onComplete={onComplete}
            showCheckbox={isModal}
          />
        </div>
      </div>
    </div>
  );
};

export default observer(CardBadges);
