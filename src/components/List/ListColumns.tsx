import React from 'react';
import { observer } from 'mobx-react';
import { Collection } from 'firestorter';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import ListDocument from '../../documents/list.doc';
import BoardDocument from '../../documents/board.doc';
import List from './List';

interface ListsProps {
  board: BoardDocument;
  kioskMode: boolean;
}

interface State {
  dragEndResult: object;
  dragEndLists: object;
}

export default observer(
  class ListColumns extends React.Component<ListsProps, State> {
    lists: Collection<ListDocument>;

    constructor(props) {
      super(props);

      this.state = {
        dragEndResult: {},
        dragEndLists: {},
      };
    }

    componentWillReceiveProps(newProps) {
      if (newProps.board !== this.props.board) {
        this.props.board.lists.path = `${newProps.board.path}/lists`;
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
          const [removed] = this.props.board.lists.docs.splice(source.index, 1);
          this.props.board.lists.docs.splice(destination.index, 0, removed);

          this.props.board.lists.docs.forEach((doc, index) =>
            doc.update({ ...doc.data, index })
          );
        }
        return;
      }

      // otherwise, is moving a card

      const sourceListDocument = this.props.board.lists.docs.find(
        l => l.id === source.droppableId
      );

      const isMovingToAnotherList =
        source.droppableId !== destination.droppableId;

      if (isMovingToAnotherList) {
        const destListDocument = this.props.board.lists.docs.find(
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
      const { isLoading, docs } = board.lists;

      return (
        <DragDropContext onDragEnd={this.handleDragEnd}>
          <Droppable
            droppableId={board.id}
            type='COLUMN'
            direction='horizontal'
          >
            {provided => (
              <div className='lists flex justify-start' ref={provided.innerRef}>
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
              </div>
            )}
          </Droppable>
        </DragDropContext>
      );
    }
  }
);
