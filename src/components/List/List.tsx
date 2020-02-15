import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { observer } from 'mobx-react-lite';
import styled from 'styled-components';
import cn from 'classnames';

import ListDocument from '../../documents/list.doc';
import CardAdder from '../CardAdder/CardAdder';
import ListHeader from './ListHeader';
import Cards from '../Card/Cards';
import { useInterface } from '../providers/InterfaceProvider';

interface ListProps {
  index: number;
  list: ListDocument;
}

const List = ({ index, list }: ListProps) => {
  const { isEditable } = useInterface();
  const { isLoading } = list;

  if (isLoading) return null;

  return (
    <Draggable
      draggableId={list.id}
      index={index}
      disableInteractiveElementBlocking
    >
      {(provided, snapshot) => (
        <>
          <div ref={provided.innerRef} {...provided.draggableProps}>
            <StyledList
              tabIndex={0}
              className={cn(
                'flex flex-col relative max-h-full min-h-0 bg-gray-750 rounded-lg p-1 mx-2',
                snapshot.isDragging && 'shadow-lg'
              )}
            >
              <ListHeader
                dragHandleProps={provided.dragHandleProps}
                listTitle={list.data.title}
                list={list}
                isDragging={snapshot.isDragging}
              />
              <div className='mt-3 overflow-y-auto overflow-x-hidden'>
                <Cards cards={list.cards} listId={list.id} />
              </div>

              {isEditable && (
                <CardAdder
                  limit={list.data.cardsLimit}
                  cards={list.cards}
                  list={list}
                />
              )}
            </StyledList>
          </div>
          {provided.placeholder}
        </>
      )}
    </Draggable>
  );
};

export default observer(List);

const StyledList = styled.div`
  width: 300px;
  height: calc(100vh - 188px);

  &:first-child {
    margin-left: 0.2rem;
  }

  &:hover .add-card-button,
  &:focus .add-card-button,
  .add-card-button:focus {
    opacity: 1;
  }
`;
