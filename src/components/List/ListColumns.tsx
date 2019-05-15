import React from 'react';
import { observer } from 'mobx-react';
import { Collection, Document } from 'firestorter';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import List from './List';
import ListAdder from '../ListAdder/ListAdder';
import DragEndContext from '../context/DragEndContext';
import ListDocument from '../../stores/list.doc';

interface ListsProps {
  board: Document;
  kioskMode: boolean;
  children: React.ReactChildren;
}

interface State {
  dragEndResult: object;
  dragEndLists: object;
}

export default observer(
  class ListColumns extends React.Component<ListsProps, State> {
    lists: Collection;

    constructor(props) {
      super(props);

      this.state = {
        dragEndResult: {},
        dragEndLists: {},
      };

      this.lists = new Collection(`${this.props.board.path}/lists`, {
        createDocument: (source, options) => new ListDocument(source, options),
        query: ref => ref.orderBy('index'),
      });
    }

    componentWillReceiveProps(newProps) {
      if (newProps.board !== this.props.board) {
        this.lists.path = `${newProps.board.path}/lists`;
      }
    }

    handleDragEnd = result => {
      const { source, destination, type } = result;
      // dropped outside the list
      if (!destination) {
        return;
      }

      const isMovingAList = type === 'COLUMN';

      if (isMovingAList) {
        if (source.index !== destination.index) {
          const [removed] = this.lists.docs.splice(source.index, 1);
          this.lists.docs.splice(destination.index, 0, removed);

          this.lists.docs.forEach((doc, index) =>
            doc.update({ ...doc.data, index })
          );
        }
        return;
      }

      // otherwise, is moving a card

      const sourceListDocument = this.lists.docs.find(
        l => l.id === source.droppableId
      );

      const isMovingToAnotherList =
        source.droppableId !== destination.droppableId;

      if (isMovingToAnotherList) {
        const destListDocument = this.lists.docs.find(
          l => l.id === destination.droppableId
        );

        const [removedCard] = sourceListDocument.cards.docs.splice(
          source.index,
          1
        );
        removedCard.delete();

        // Add the removed item to the new list
        destListDocument.cards.docs.splice(destination.index, 0, removedCard);
        destListDocument.cards.docs.forEach((doc, index) => {
          doc.id === removedCard.id
            ? destListDocument.cards.add({
                ...doc.data,
                index,
              })
            : doc.update({ ...doc.data, index });
        });
      } else {
        // same list
        // change item position
        const [removedCard] = sourceListDocument.cards.docs.splice(
          source.index,
          1
        );
        sourceListDocument.cards.docs.splice(destination.index, 0, removedCard);
      }

      // update source list with the new indexes
      sourceListDocument.cards.docs.forEach((doc, index) =>
        doc.update({ ...doc.data, index })
      );
      return;
    };

    render() {
      const { board, kioskMode } = this.props;
      const { isLoading, docs } = this.lists;

      return (
        <DragDropContext onDragEnd={this.handleDragEnd}>
          <Droppable
            droppableId={board.id}
            type='COLUMN'
            direction='horizontal'
          >
            {provided => (
              <div className='lists' ref={provided.innerRef}>
                {/*Context Provider will update all droppable childs */}
                {docs.map((list, index) => (
                  <List
                    key={list.id}
                    list={list}
                    index={index}
                    kioskMode={kioskMode}
                  />
                ))}
                {provided.placeholder}
                {!kioskMode && <ListAdder boardId={board.id} />}
              </div>
            )}
          </Droppable>
        </DragDropContext>
      );
    }
  }
);
