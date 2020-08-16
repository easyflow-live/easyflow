import React from 'react';
import { observer } from 'mobx-react-lite';

import { cards } from 'core/actions';
import { useBoardsStore } from 'store';
import CardDocument from 'documents/card.doc';
import BadgeTags from 'components/shared/BadgeTags';
import Assignee from 'components/shared/Assignee';
import { useSession } from 'components/providers/SessionProvider';
import BadgeTaskProgress from 'components/shared/BadgeTaskProgress';
import BadgeDueDate from 'components/shared/BadgeDueDate';

interface CardBadgesProps {
  card: CardDocument;
  listId: string;
  checkboxes: { total: number; checked: number };
  isModal?: boolean;
}

const CardBadges = ({ card, listId, checkboxes, isModal }: CardBadgesProps) => {
  const { currentBoard, getList } = useBoardsStore();
  const { userDoc } = useSession();

  const handleTagClick = (tag: string) => card.removeTag(tag);

  const handleComplete = (state: boolean) => {
    if (card.data.completed !== state) {
      card.ref.update({ completed: state });
      cards.completeCardAction({
        memberCreator: userDoc && userDoc.ref,
        data: {
          card: card.ref,
          board: currentBoard.ref,
          list: getList(listId).ref,
          title: card.data.title || '',
          completed: state,
        },
      });
    }
  };

  return (
    <div className='flex flex-col px-2 pb-2'>
      <div>
        <BadgeTags
          tags={card.data.tags}
          onTagClick={handleTagClick}
          removable={isModal}
        />
      </div>

      <div className='flex justify-between items-center mt-2'>
        <div>
          <Assignee card={card} />
        </div>

        <div className='flex items-center'>
          <BadgeTaskProgress
            className='mr-1'
            total={checkboxes.total}
            checked={checkboxes.checked}
          />

          <BadgeDueDate
            date={card.data.date}
            completed={card.data.completed}
            id={card.id}
            onComplete={handleComplete}
            showCheckbox={isModal}
          />
        </div>
      </div>
    </div>
  );
};

export default observer(CardBadges);
