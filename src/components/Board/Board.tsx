import React, { Component } from 'react';
import { Title } from 'react-head';
import { observer } from 'mobx-react';

import BoardDocument from '../../documents/board.doc';
import ListColumns from '../List/ListColumns';
import Header from '../Header/Header';
import BoardHeader from '../BoardHeader/BoardHeader';
import './Board.scss';

interface BoardProps {
  board: BoardDocument;
  kioskMode: boolean;
}

interface State {
  startX: number;
  startScrollX: number;
}

const Board = class BoardComponent extends Component<BoardProps, State> {
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

  render() {
    const { kioskMode, board } = this.props;

    if (!board) return null;
    const { isLoading, data } = board;

    return (
      <div className={`board ${kioskMode ? 'kiosk' : ''}`}>
        <Title>{data.title} | Easy Flow</Title>
        {!kioskMode && <Header />}
        <BoardHeader boardTitle={data.title} boardId={board.id} />

        <div
          className='lists-wrapper'
          onMouseDown={this.handleMouseDown}
          onWheel={this.handleWheel}
        >
          <ListColumns board={board} kioskMode={kioskMode} />
        </div>
        <div className='board-underlay' />
      </div>
    );
  }
};

export default observer(Board);
