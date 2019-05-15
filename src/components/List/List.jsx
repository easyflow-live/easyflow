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

    componentWillReceiveProps(newProps) {
      if (newProps.list !== this.props.list) {
        this.cards.path = `${newProps.list.path}/cards`;
      }
    }

    onDragEnd(result) {
      // dropped outside the list
      const { lastDragResult} = this.state;
      const { list } = this.props;
      
      if (!result.destination || lastDragResult === result) {
        return;
      }

      console.log('moved card child', result.source.droppableId);


      if ( (!lastDragResult || lastDragResult !== result)) {

        const sameList = result.source.droppableId === result.destination.droppableId;

        if (sameList) {
          const [removed] = this.cards.splice(result.source.index, 1);
          this.cards.splice(result.destination.index, 0, removed);

          this.cards.forEach((doc, index) => doc.update({...doc.data, index}) );

        } else {
          // const { lists } = onDragEndResult;

          // const isSourceList = lists.source.id === list.id;
          // if (isSourceList) {
          //   console.log('source list')
          //   console.log(onDragEndResult.lists.source)
          //   this.cards.splice(result.source.index, 1);
          //   return;
          // }

          // const isDestinationList = lists.destination.id === list.id;
          // if (isDestinationList) {
          //   console.log('destination list')
          //   console.log(onDragEndResult.lists.destination)
          //   console.log(cards.length);
          //   // cards.splice(result.destination.index, 0, removed);
          //   return;
          // }
        }

        this.setState({ lastDragResult: result });
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
                    <DragEndContext.Consumer>
                      {value => this.onDragEnd(value)}
                    </DragEndContext.Consumer>
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
