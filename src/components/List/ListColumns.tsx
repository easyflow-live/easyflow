import React from 'react';
import { observer } from 'mobx-react';
import { Collection, Document } from 'firestorter';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import List from './List';
import ListAdder from '../ListAdder/ListAdder';
import DragEndContext from '../context/DragEndContext';

interface ListsProps {
  board: Document;
  kioskMode: boolean;
  children: React.ReactChildren;
}

interface State {
  dragEndResult: object;
}

export default observer(
  class ListColumns extends React.Component<ListsProps, State> {
    lists: Collection;

    constructor(props) {
      super(props);

      this.state = {
        dragEndResult: {},
      };

      this.lists = new Collection(`${this.props.board.path}/lists`);
      this.lists.query = ref => ref.orderBy('index');
    }

    handleDragEnd = result => {
      const { draggableId, source, destination, type } = result;
      // dropped outside the list
      if (!destination) {
        return;
      }

      if (type !== 'COLUMN') {
        this.setState({ dragEndResult: { result } });
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
                  <DragEndContext.Provider
                    value={this.state.dragEndResult}
                    key={list.id}
                  >
                    <List list={list} index={index} kioskMode={kioskMode} />
                  </DragEndContext.Provider>
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
