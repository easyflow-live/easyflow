import React from 'react';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';

import { cards } from '../../core/actions';
import boardsStore from '../../store/boards';
import userStore from '../../store/users';
import CardDocument from '../../documents/card.doc';
import BadgeTags from './BadgeTags';
import Assignee from '../Card/Assignee';
import BadgeDueDate from './BadgeDueDate';
import BadgeTaskProgress from './BadgeTaskProgress';
import DueComplete from './DueComplete';

interface CardBadgesProps {
  card: CardDocument;
  listId: string;
  checkboxes: { total: number; checked: number };
}

const CardBadges = ({ card, listId, checkboxes }: CardBadgesProps) => {
  const handleTagClick = (tag: string) => card.removeTag(tag);

  const handleComplete = (state: boolean) => {
    if (card.data.completed !== state) {
      card.ref.update({ completed: state });
      cards.completeCardAction({
        memberCreator: userStore.currentUser.ref,
        data: {
          card: card.ref,
          board: boardsStore.currentBoard.ref,
          list: boardsStore.getList(listId).ref,
          title: card.data.title || '',
          completed: state,
        },
      });
    }
  };

  return (
    <Container>
      <div className='first-row'>
        <div className='flex'>
          <BadgeDueDate date={card.data.date} completed={card.data.completed} />
          {card.data.date && (
            <DueComplete
              id={card.id}
              completed={card.data.completed}
              onComplete={handleComplete}
            />
          )}
        </div>
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
