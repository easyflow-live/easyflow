import React, { useState, useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';
import { Collection } from 'firestorter';

import { cards } from '../../core/actions';
import boardsStore from '../../store/boards';
import usersStore from '../../store/users';
import BoardDocument from '../../documents/board.doc';
import CardDocument from '../../documents/card.doc';
import ListDocument from '../../documents/list.doc';
import ColorDocument from '../../documents/color.doc';
import ListColumns from '../List/ListColumns';
import BoardHeader from '../BoardHeader/BoardHeader';
import { CreateContentEmpty } from '../Empty/CreateContentEmpty';
import { AnimatedOpacity } from '../Animated/AnimatedOpacity';
import { InterfaceContext } from '../providers/InterfaceProvider';
import './Board.css';
import BoardMenu from './BoardMenu';

interface BoardProps {
  board: BoardDocument;
}

const Board = ({ board }: BoardProps) => {
  const [startX, setStartX] = useState(null);
  const [startScrollX, setStartScrollX] = useState(null);

  const { isKioskMode, isEditable } = useContext(InterfaceContext);

  useEffect(() => {
    if (board) {
      boardsStore.setCurrentBoard(board);
      boardsStore.setListsFromCurrentBoard(board.lists.docs);

      if (!boardsStore.colors.length) {
        const colors = new Collection<ColorDocument>('colors', {
          createDocument: (src, opts) => new ColorDocument(src, opts),
        }).docs;

        boardsStore.setColors(colors);
      }
    }
  }, [board]);

  useEffect(() => {
    if (board && board.data.title) {
      window.document.title = `${board.data.title} | Easy Flow`;
    }
  });

  const handeCardMoveAction = (
    card: CardDocument['ref'],
    listBefore: ListDocument['ref'],
    listAfter: ListDocument['ref'],
    cardTitle: string
  ) => {
    cards.moveCardAction({
      memberCreator: usersStore.currentUser.ref,
      data: {
        card,
        listBefore,
        listAfter,
        board: board.ref,
        title: cardTitle || '',
      },
    });
  };

  // The following three methods implement dragging of the board by holding down the mouse
  const handleMouseDown = ({ target, clientX }) => {
    if (target.className !== 'list-wrapper' && target.className !== 'lists') {
      return;
    }
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    setStartX(clientX);
    setStartScrollX(window.scrollX);
  };

  // Go to new scroll position every time the mouse moves while dragging is activated
  const handleMouseMove = ({ clientX }) => {
    const scrollX = startScrollX - clientX + startX;
    window.scrollTo(scrollX, 0);
    const windowScrollX = window.scrollX;

    if (scrollX !== windowScrollX) {
      setStartX(clientX + windowScrollX - startScrollX);
    }
  };

  // Remove drag event listeners
  const handleMouseUp = () => {
    if (startX) {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('mouseup', handleMouseUp);
      setStartX(null);
      setStartScrollX(null);
    }
  };

  const handleWheel = ({ target, deltaY }) => {
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

  if (!board) return null;

  const { lists, isLoading: isLoadingBoard } = board;
  const { isLoading, docs } = lists;

  const showEmpty = !docs.length && !isLoading && !isLoadingBoard;

  return (
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
          onMouseDown={handleMouseDown}
          onWheel={handleWheel}
        >
          <ListColumns lists={lists} onCardMove={handeCardMoveAction} />
        </div>

        {isEditable && (
          <AnimatedOpacity show={showEmpty}>
            <CreateContentEmpty board={board} />
          </AnimatedOpacity>
        )}
      </div>
      <BoardMenu board={board} />
    </div>
  );
};

export default observer(Board);
