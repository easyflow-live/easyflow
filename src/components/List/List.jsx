import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import { Collection } from 'firestorter';
import { observer } from 'mobx-react';

import CardAdder from '../CardAdder/CardAdder';
import ListHeader from './ListHeader';
import Cards from '../Card/Cards';
import { CardsConsumer } from '../Card/CardsProvider';
import './List.scss';

export default observer(
  class List extends React.Component {
    constructor(props) {
      super(props);

      this.cards = new Collection(`${this.props.list.path}/cards`);
    }

    componentWillReceiveProps(newProps) {
      if (newProps.list !== this.props.list) {
        this.cards.path = `${newProps.list.path}/cards`;
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
                    <Cards listId={list.id} cards={docs} />
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
