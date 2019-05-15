import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Collection } from 'firestorter';
import { observer } from 'mobx-react';
import shortid from 'shortid';

import CardAdder from '../CardAdder/CardAdder';
import ListHeader from './ListHeader';
import Cards from '../Card/Cards';
import DragEndContext from '../context/DragEndContext';
import './List.scss';

export default observer(class List extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        lastDragResult: null
      }
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
                    listTitle={list.data.title}
                    list={list}
                  />
                  <div className="cards-wrapper">
                    {/* Consumer will receive dragEnd result object from Parent */}
                    <Cards list={list} cards={list.cards.docs} />
                  </div>
                </div>
                {!kioskMode && <CardAdder cards={list.cards} />}
              </div>
              {provided.placeholder}
            </>
          )}
        </Draggable>
      );
    }
  });
