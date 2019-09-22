import React from 'react';
import { observer } from 'mobx-react-lite';

import CardDocument from '../../documents/card.doc';
import BadgeTags from './BadgeTags';
import Assignee from '../Card/Assignee';
import BadgeDueDate from './BadgeDueDate';
import BadgeTaskProgress from './BadgeTaskProgress';
import './CardBadges.scss';

interface CardBadgesProps {
  card: CardDocument;
  checkboxes: { total: number; checked: number };
}

const CardBadges = ({ card, checkboxes }: CardBadgesProps) => {
  const handleTagClick = (tag: string) => card.removeTag(tag);

  return (
    <div className='card-badges'>
      <div className='first-row'>
        <BadgeDueDate date={card.data.date} />
        <Assignee card={card} />
      </div>
      <BadgeTags tags={card.data.tags} onTagClick={handleTagClick} />
      <div>
        <BadgeTaskProgress
          total={checkboxes.total}
          checked={checkboxes.checked}
        />
      </div>
    </div>
  );
};

export default observer(CardBadges);
