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

export default observer(
  class List extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        lastDragResult: null
      }

      // used to created a Droppable scope
      this.dropType = shortid.generate()

      this.cards = new Collection(`${this.props.list.path}/cards`);
      this.cards.query = ref => ref.orderBy('index')
    }

    componentWillReceiveProps(newProps) {
      if (newProps.list !== this.props.list) {
        this.cards.path = `${newProps.list.path}/cards`;
      }
    }

    onDragEnd(onDragEndResult) {
      // dropped outside the list
      const { result } = onDragEndResult;
      
      if (!result || !result.destination) {
        return;
      }

      console.log('moved card child', result.source.droppableId);

      if (result.type === this.dropType && (!this.state.lastDragResult || this.state.lastDragResult !== result)) {

        const sameList = result.source.droppableId === result.destination.droppableId;
        if (sameList) {
          const [removed] = this.cards.docs.splice(result.source.index, 1);
          this.cards.docs.splice(result.destination.index, 0, removed);

          this.cards.docs.forEach((doc, index) => doc.update({...doc.data, index}) );
        }

        this.setState({ lastDragResult: result });
      }
    }

    render() {
      const { index, kioskMode, list } = this.props;
      const { isLoading, docs } = this.cards;

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
                    <Cards type={this.dropType} listId={list.id} cards={docs} />
                  </div>
                </div>
                {!kioskMode && <CardAdder cards={this.cards} />}
              </div>
              {provided.placeholder}
            </>
          )}
        </Draggable>
      );
    }
  }
);
