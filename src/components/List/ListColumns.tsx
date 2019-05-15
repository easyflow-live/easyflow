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

      if (type !== 'COLUMN') {
        const sourceList = this.lists.docs.find(
          l => l.id === source.droppableId
        );

        // from one list to another
        if (source.droppableId !== destination.droppableId) {
          const destList = this.lists.docs.find(
            l => l.id === destination.droppableId
          );

          const [removed] = sourceList.cards.docs.splice(
            result.source.index,
            1
          );
          destList.cards.docs.splice(result.destination.index, 0, removed);

          removed.delete();

          sourceList.cards.docs.forEach((doc, index) =>
            doc.update({ ...doc.data, index })
          );

          destList.cards.docs.forEach((doc, index) => {
            doc.id === removed.id
              ? destList.cards.add({
                  ...doc.data,
                  index,
                })
              : doc.update({ ...doc.data, index });
          });
        } else {
          // same list
          const [removed] = sourceList.cards.docs.splice(
            result.source.index,
            1
          );
          sourceList.cards.docs.splice(result.destination.index, 0, removed);

          sourceList.cards.docs.forEach((doc, index) =>
            doc.update({ ...doc.data, index })
          );
        }
        return;
      }

      if (source.index !== destination.index) {
        const [removed] = this.lists.docs.splice(source.index, 1);
        this.lists.docs.splice(destination.index, 0, removed);

        this.lists.docs.forEach((doc, index) =>
          doc.update({ ...doc.data, index })
        );
      }

      // Move card
      // if (
      //   source.index !== destination.index ||
      //   source.droppableId !== destination.droppableId
      // ) {
      //   console.log('moved card parent');
      //   this.setState({ dragEndResult: result });
      // const sourceList = lists.find(l => l.id === source.droppableId);
      // const destList = lists.find(l => l.id === destination.droppableId);

      // const card = new Document(`${sourceList.path}/cards/${draggableId}`);
      // const cardData = (await card.fetch()).data;

      // const cardCollection = new Collection(`${destList.path}/cards/`, {
      //   mode: 'off',
      // });
      // const cardsCount = (await cardCollection.fetch()).docs.length;

      // cardCollection.add({ ...cardData, index: cardsCount });

      // card.delete();
      // }
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
