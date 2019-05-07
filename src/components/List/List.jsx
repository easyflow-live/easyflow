import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import ListHeader from './ListHeader';
import Cards from './Cards';
import CardAdder from '../CardAdder/CardAdder';
import './List.scss';
import { useCards } from '../../hooks/useCards';

const List = ({ boardId, index, list }) => {
  const { cards } = useCards(boardId, list.uid);

  return (
    <Draggable
      draggableId={list.uid}
      index={index}
      disableInteractiveElementBlocking
    >
      {(provided, snapshot) => (
        <>
          <div
            ref={provided.innerRef}
            {...provided.draggableProps}
            className="list-wrapper"
          >
            <div className={`list ${snapshot.isDragging ? 'list--drag' : ''}`}>
              <ListHeader
                dragHandleProps={provided.dragHandleProps}
                listTitle={list.title}
                listId={list.uid}
                cards={cards}
                boardId={boardId}
                dispatch={a => console.log(a)}
              />
              <div className="cards-wrapper">
                <Cards listId={list.uid} cards={cards} />
              </div>
            </div>
            <CardAdder listId={list.uid} boardId={boardId} />
          </div>
          {provided.placeholder}
        </>
      )}
    </Draggable>
  );
};

export default List;
