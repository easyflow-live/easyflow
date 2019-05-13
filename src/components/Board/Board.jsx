import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Title } from 'react-head';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { observer } from 'mobx-react';

import List from '../List/List';
import ListColumns from '../List/ListColumns';
import ListAdder from '../ListAdder/ListAdder';
import Header from '../Header/Header';
import BoardHeader from '../BoardHeader/BoardHeader';
import './Board.scss';
import { Document, Collection } from 'firestorter';

export default observer(class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      startX: null,
      startScrollX: null,
    };
  }

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
    const { board, kioskMode } = this.props;

    return (
        <div className="board">
          <Title>{board.title} | React Kanban</Title>
          {!kioskMode && <Header />}
          {!kioskMode && (
            <BoardHeader boardTitle={board.data && board.data.title} boardId={board.id} />
          )}

          <div
            className="lists-wrapper"
            onMouseDown={this.handleMouseDown}
            onWheel={this.handleWheel}
          >
            <ListColumns board={board} kioskMode={kioskMode} />
          </div>
          <div className="board-underlay" />
        </div>
    );
  };
});
