import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Collection } from 'firestorter';
import { observer } from 'mobx-react';
import shortid from 'shortid';

import CardAdder from '../CardAdder/CardAdder';
import ListHeader from './ListHeader';
import Cards from '../Card/Cards';
import DragEndContext from '../context/DragEndContext';
import './List.css';

export default observer(
  class List extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        lastDragResult: null
      };
    }

    render() {
      const { index, kioskMode, list } = this.props;
      const { isLoading, cards } = list;

      return (
        <Draggable
          draggableId={list.id}
          index={index}
          disableInteractiveElementBlocking
        >
          {(provided, snapshot) => (
            <>
              <div ref={provided.innerRef} {...provided.draggableProps}>
                <div
                  tabIndex={0}
                  className={`list relative bg-gray-700 shadow-lg rounded-lg m-2 cursor-pointer ${
                    snapshot.isDragging ? 'list--drag' : ''
                  }`}
                >
                  <ListHeader
                    dragHandleProps={provided.dragHandleProps}
                    listTitle={list.data.title}
                    list={list}
                  />
                  <div className='px-3 mt-3 overflow-y-auto overflow-x-hidden'>
                    <Cards list={list} cards={list.cards.docs} />
                  </div>
                  {!kioskMode && (
                    <CardAdder
                      limit={list.data.cardsLimit}
                      cards={list.cards}
                    />
                  )}
                </div>
              </div>
              {provided.placeholder}
            </>
          )}
        </Draggable>
      );
    }
  }
);
