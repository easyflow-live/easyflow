import React from 'react';
import { observer } from 'mobx-react';
import { Collection, Document } from 'firestorter';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

import List from './List';
import ListAdder from '../ListAdder/ListAdder';
import { CardsProvider } from '../Card/CardsProvider';

interface ListsProps {
  board: Document;
  kioskMode: boolean;
  children: React.ReactChildren;
}

export default observer(
  class ListColumns extends React.Component<ListsProps, {}> {
    lists: Collection;

    constructor(props) {
      super(props);

      this.lists = new Collection(`${this.props.board.path}/lists`);
    }

    handleDragEnd = async ({ draggableId, source, destination, type }) => {
      // dropped outside the list
      if (!destination) {
        return;
      }
      const { dispatch, board } = this.props;
      const lists = this.lists.docs;

      // Move list
      if (type === 'COLUMN') {
        // Prevent update if nothing has changed
        if (source.index !== destination.index) {
          console.log('moved list', draggableId);
          // dispatch({
          //   type: 'MOVE_LIST',
          //   payload: {
          //     oldListIndex: source.index,
          //     newListIndex: destination.index,
          //     boardId: source.droppableId,
          //   },
          // });
        }
        return;
      }
      // Move card
      if (
        source.index !== destination.index ||
        source.droppableId !== destination.droppableId
      ) {
        const sourceList = lists.find(l => l.id === source.droppableId);
        const destList = lists.find(l => l.id === destination.droppableId);

        const card = new Document(`${sourceList.path}/cards/${draggableId}`);
        const cardData = (await card.fetch()).data;

        const cardCollection = new Collection(`${destList.path}/cards/`, {
          mode: 'off',
        });
        const cardsCount = (await cardCollection.fetch()).docs.length;

        cardCollection.add({ ...cardData, index: cardsCount });

        card.delete();
      }
    };

    render() {
      const { board, kioskMode } = this.props;
      const { isLoading, docs } = this.lists;

      return (
        <CardsProvider>
          <DragDropContext onDragEnd={this.handleDragEnd}>
            <Droppable
              droppableId={board.id}
              type='COLUMN'
              direction='horizontal'
            >
              {provided => (
                <div className='lists' ref={provided.innerRef}>
                  {docs.map((list, index) => (
                    <List
                      list={list}
                      index={index}
                      key={list.id}
                      kioskMode={kioskMode}
                    />
                  ))}
                  {provided.placeholder}
                  {!kioskMode && <ListAdder boardId={board.id} />}
                </div>
              )}
            </Droppable>
          </DragDropContext>
        </CardsProvider>
      );
    }
  }
);
