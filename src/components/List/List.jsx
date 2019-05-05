import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Draggable } from 'react-beautiful-dnd';
import ListHeader from './ListHeader';
// import Cards from './Cards';
import CardAdder from '../CardAdder/CardAdder';
import './List.scss';

class List extends Component {
  static propTypes = {
    boardId: PropTypes.string.isRequired,
    index: PropTypes.number.isRequired,
    list: PropTypes.shape({ uid: PropTypes.string.isRequired }).isRequired,
  };

  render = () => {
    const { list, boardId, index } = this.props;
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
              <div
                className={`list ${snapshot.isDragging ? 'list--drag' : ''}`}
              >
                <ListHeader
                  dragHandleProps={provided.dragHandleProps}
                  listTitle={list.title}
                  listId={list.uid}
                  cards={[]}
                  boardId={boardId}
                  dispatch={a => console.log(a)}
                />
                <div className="cards-wrapper">
                  {/* <Cards listId={list._id} /> */}
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
}

export default List;
