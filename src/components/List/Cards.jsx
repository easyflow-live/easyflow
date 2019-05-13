import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Droppable } from 'react-beautiful-dnd';
import Card from '../Card/Card';

class Cards extends Component {
  static propTypes = {
    listId: PropTypes.string.isRequired,
    cards: PropTypes.arrayOf(
      PropTypes.shape({ text: PropTypes.string, color: PropTypes.string })
    ).isRequired,
  };

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
    const { listId, cards } = this.props;

    return (
      <Droppable droppableId={listId} type="CARD" direction="vertical">
        {(provided, { isDraggingOver }) => (
          <>
            <div className="cards" ref={provided.innerRef}>
              {cards &&
                cards.map((card, index) => (
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

export default Cards;
