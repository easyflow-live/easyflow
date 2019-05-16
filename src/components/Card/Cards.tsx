import React, { Component } from 'react';
import { Droppable } from 'react-beautiful-dnd';
import { Observer } from 'mobx-react';

import Card from './Card';
import ListDocument from '../../documents/list.doc';
import CardDocument from '../../documents/card.doc';

interface CardProps {
  list: ListDocument;
  cards: CardDocument[];
}

export default class Cards extends Component<CardProps, {}> {
  listEnd: any;

  componentDidUpdate = prevProps => {
    // Scroll to bottom of list if a new card has been added
    if (
      this.props.cards[this.props.cards.length - 2] ===
      prevProps.cards[prevProps.cards.length - 1]
    ) {
      this.scrollToBottom();
    }
  };

  scrollToBottom = () => {
    this.listEnd.scrollIntoView();
  };

  render() {
    const { list, cards } = this.props;

    return (
      <Droppable droppableId={list.id} direction='vertical' isCombineEnabled>
        {(provided, { isDraggingOver }) => (
          <div className='cards' ref={provided.innerRef}>
            <Observer>
              {() =>
                cards.map((card, index) => (
                  <Card
                    isDraggingOver={isDraggingOver}
                    key={card.id}
                    card={card}
                    index={index}
                  />
                ))
              }
            </Observer>
            {provided.placeholder}
            <div
              style={{ float: 'left', clear: 'both' }}
              ref={el => {
                this.listEnd = el;
              }}
            />
          </div>
        )}
      </Droppable>
    );
  }
}
