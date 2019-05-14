import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import { Document } from 'firestorter';
import { observer } from 'mobx-react';

import Card from './Card';

interface CardProps {
  list: Document;
  cards: Document[];
}

export default observer(
  class Cards extends Component<CardProps, {}> {
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
            <>
              <div className='cards' ref={provided.innerRef}>
                {cards.map((card, index) => (
                  <Card
                    isDraggingOver={isDraggingOver}
                    key={card.id}
                    card={card}
                    index={index}
                  />
                ))}
                {provided.placeholder}
                <div
                  style={{ float: 'left', clear: 'both' }}
                  ref={el => {
                    this.listEnd = el;
                  }}
                />
              </div>
            </>
          )}
        </Droppable>
      );
    }
  }
);
