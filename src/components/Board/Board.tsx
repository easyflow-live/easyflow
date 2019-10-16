import React, { Component } from 'react';
import { Title } from 'react-head';
import { observer } from 'mobx-react';
import classNames from 'classnames';

import { cards } from '../../core/actions';
import boardsStore from '../../store/boards';
import BoardDocument from '../../documents/board.doc';
import CardDocument from '../../documents/card.doc';
import ListDocument from '../../documents/list.doc';
import ListColumns from '../List/ListColumns';
import BoardHeader from '../BoardHeader/BoardHeader';
import { CreateContentEmpty } from '../Empty/CreateContentEmpty';
import { AnimatedOpacity } from '../Animated/AnimatedOpacity';
import { InterfaceContext } from '../providers/InterfaceProvider';
import './Board.scss';
import BoardMenu from './BoardMenu';

interface BoardProps {
  board: BoardDocument;
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

    this.handeCardMoveAction = this.handeCardMoveAction.bind(this);
  }

  componentDidMount() {
    if (this.props.board) {
      boardsStore.setCurrentBoard(this.props.board);
      boardsStore.setListsFromCurrentBoard(this.props.board.lists.docs);
    }
  }

  componentDidUpdate() {
    if (this.props.board.data.title) {
      window.document.title = `${this.props.board.data.title} | Easy Flow`;
    }
  }

  handeCardMoveAction(
    card: CardDocument['ref'],
    listBefore: ListDocument['ref'],
    listAfter: ListDocument['ref'],
    cardTitle: string
  ) {
    cards.moveCardAction({
      memberCreator: this.props.board.data.owner,
      data: {
        card,
        listBefore,
        listAfter,
        board: this.props.board.ref,
        title: cardTitle || '',
      },
    });
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
    const { board } = this.props;
    if (!board) return null;

    const { data, lists, isLoading: isLoadingBoard } = board;
    const { isLoading, docs } = lists;

    const showEmpty = !docs.length && !isLoading && !isLoadingBoard;

    return (
      <>
        <Title>{data.title} | Easy Flow</Title>
        <InterfaceContext.Consumer>
          {({ isKioskMode, isEditable }) => (
            <div className='relative overflow-hidden'>
              <div
                className={classNames('relative m-6 mt-4', {
                  kiosk: isKioskMode,
                })}
              >
                <BoardHeader board={board} />

                <div
                  className='inline-flex mt-4 overflow-x-auto'
                  style={{ width: 'calc(100vw - 3rem)' }}
                  onMouseDown={this.handleMouseDown}
                  onWheel={this.handleWheel}
                >
                  <ListColumns
                    lists={lists}
                    onCardMove={this.handeCardMoveAction}
                  />
                </div>

                {isEditable && (
                  <AnimatedOpacity show={showEmpty}>
                    <CreateContentEmpty boardId={board.id} />
                  </AnimatedOpacity>
                )}
                <div className='board-underlay' />
              </div>
              <BoardMenu board={board} />
            </div>
          )}
        </InterfaceContext.Consumer>
      </>
    );
  }
};

export default observer(Board);
