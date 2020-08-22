import React, { useMemo } from 'react';
import { observer } from 'mobx-react-lite';

import { findCheckboxes } from 'helpers/find-check-boxes';
import CardBadges from 'modules/Card/components/CardBadges';
import { Card as CardModel } from 'documents/card.doc';
import CardMarkdown from 'modules/Card/components/CardMarkdown';
import { User } from 'store/users';

interface CardProps {
  card: CardModel;
  previewMode: boolean;
  assignees: User[];
  isHidden: boolean;
  onUpdate: (data: Partial<CardModel>) => void;
  onComplete?: (state: boolean) => void;
  onTagClick?: (tag: string) => void;
  onClick?: (cardId: string) => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLDivElement>) => void;
}

const Card = ({
  card,
  previewMode,
  assignees,
  isHidden,
  onUpdate,
  onComplete,
  onTagClick,
  onClick,
  onKeyDown,
}: CardProps) => {
  const checkboxes = useMemo(() => findCheckboxes(card.text), [card.text]);

  const showBadges =
    card.assignee || card.date || card.tags || checkboxes.total > 0;

  const handleClick = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
    e.preventDefault();
    onClick && onClick(card.id);
  };

  const cardProps = previewMode ? {} : { onClick: handleClick, onKeyDown };

  return (
    <CardMarkdown
      onChangeCheckbox={text => onUpdate({ text })}
      text={card.text}
      isHidden={isHidden}
      previewMode={previewMode}
      bgColor={card.color}
      renderBadges={() =>
        showBadges && (
          <CardBadges
            tags={card.tags}
            date={card.date}
            completed={card.completed}
            cardId={card.id}
            color={card.color}
            assignees={assignees}
            checkboxes={checkboxes}
            onComplete={onComplete}
            onTagClick={onTagClick}
          />
        )
      }
      {...cardProps}
    />
  );
};

export default observer(Card);
