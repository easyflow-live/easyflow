import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Title } from 'react-head';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { observer } from 'mobx-react';

import List from '../List/List';
import ListAdder from '../ListAdder/ListAdder';
import Header from '../Header/Header';
import BoardHeader from '../BoardHeader/BoardHeader';
import './Board.scss';
import { Document, Collection } from 'firestorter';

class Board extends Component {
  static propTypes = {
    lists: PropTypes.arrayOf(
      PropTypes.shape({ id: PropTypes.string.isRequired })
    ).isRequired,
    dispatch: PropTypes.func.isRequired,
  };

  constructor(props) {
    super(props);
    this.state = {
      startX: null,
      startScrollX: null,
    };
  }

  handleDragEnd = async ({ draggableId, source, destination, type }) => {
    // dropped outside the list
    if (!destination) {
      return;
    }
    const { dispatch, board, lists } = this.props;

    // Move list
    if (type === 'COLUMN') {
      // Prevent update if nothing has changed
      if (source.index !== destination.index) {
        dispatch({
          type: 'MOVE_LIST',
          payload: {
            oldListIndex: source.index,
            newListIndex: destination.index,
            boardId: source.droppableId,
          },
        });
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

  // The following three methods implement dragging of the board by holding down the mouse
  handleMouseDown = ({ target, clientX }) => {
    if (target.className !== 'list-wrapper' && target.className !== 'lists') {
      return;
    }
    window.addEventListener('mousemove', this.handleMouseMove);
    window.addEventListener('mouseup', this.handleMouseUp);
    this.setState({
      startX: clientX,
      startScrollX: window.scrollX,
    });
  };

  // Go to new scroll position every time the mouse moves while dragging is activated
  handleMouseMove = ({ clientX }) => {
    const { startX, startScrollX } = this.state;
    const scrollX = startScrollX - clientX + startX;
    window.scrollTo(scrollX, 0);
    const windowScrollX = window.scrollX;
    if (scrollX !== windowScrollX) {
      this.setState({
        startX: clientX + windowScrollX - startScrollX,
      });
    }
  };

  // Remove drag event listeners
  handleMouseUp = () => {
    if (this.state.startX) {
      window.removeEventListener('mousemove', this.handleMouseMove);
      window.removeEventListener('mouseup', this.handleMouseUp);
      this.setState({ startX: null, startScrollX: null });
    }
  };

  handleWheel = ({ target, deltaY }) => {
    // Scroll page right or left as long as the mouse is not hovering a card-list (which could have vertical scroll)
    if (
      target.className !== 'list-wrapper' &&
      target.className !== 'lists' &&
      target.className !== 'open-composer-button' &&
      target.className !== 'list-title-button'
    ) {
      return;
    }
    // Move the board 80 pixes on every wheel event
    if (Math.sign(deltaY) === 1) {
      window.scrollTo(window.scrollX + 80, 0);
    } else if (Math.sign(deltaY) === -1) {
      window.scrollTo(window.scrollX - 80, 0);
    }
  };

  render = () => {
    const { lists, board, kioskMode } = this.props;

    return (
      <>
        <div className="board">
          <Title>{board.title} | React Kanban</Title>
          {!kioskMode && <Header />}
          {!kioskMode && (
            <BoardHeader boardTitle={board.data.title} boardId={board.id} />
          )}
          {/* eslint-disable jsx-a11y/no-static-element-interactions */}
          <div
            className="lists-wrapper"
            onMouseDown={this.handleMouseDown}
            onWheel={this.handleWheel}
          >
            {/* eslint-enable jsx-a11y/no-static-element-interactions */}
            <DragDropContext onDragEnd={this.handleDragEnd}>
              <Droppable
                droppableId={board.id}
                type="COLUMN"
                direction="horizontal"
              >
                {provided => (
                  <div className="lists" ref={provided.innerRef}>
                    {lists.map((list, index) => (
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
          </div>
          <div className="board-underlay" />
        </div>
      </>
    );
  };
}

export default observer(Board);
