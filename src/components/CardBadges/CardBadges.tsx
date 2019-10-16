import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import CardDocument from '../../documents/card.doc';
import BadgeTags from './BadgeTags';
import Assignee from '../Card/Assignee';
import BadgeDueDate from './BadgeDueDate';
import BadgeTaskProgress from './BadgeTaskProgress';

interface CardBadgesProps {
  card: CardDocument;
  checkboxes: { total: number; checked: number };
}

const CardBadges = ({ card, checkboxes }: CardBadgesProps) => {
  const handleTagClick = (tag: string) => card.removeTag(tag);

  return (
    <Container>
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
    </Container>
  );
};

export default observer(CardBadges);

const Container = styled.div`
  padding: 0px 8px 6px 8px;

  & > div {
    align-items: center;
    display: flex;
    flex-wrap: wrap;
    margin-bottom: 5px;
  }

  & > .first-row {
    justify-content: space-between;
  }
`;
