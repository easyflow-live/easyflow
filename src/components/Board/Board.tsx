import React, { useEffect, useContext } from 'react';
import { observer } from 'mobx-react-lite';
import classNames from 'classnames';

import { cards } from '../../core/actions';
import { useBoardsStore } from '../../store/boards';
import usersStore from '../../store/users';
import BoardDocument from '../../documents/board.doc';
import CardDocument from '../../documents/card.doc';
import ListDocument from '../../documents/list.doc';
import ListColumns from '../List/ListColumns';
import BoardHeader from '../BoardHeader/BoardHeader';
import { CreateContentEmpty } from '../Empty/CreateContentEmpty';
import { AnimatedOpacity } from '../Animated/AnimatedOpacity';
import { InterfaceContext } from '../providers/InterfaceProvider';
import BoardMenu from './BoardMenu';

interface BoardProps {
  board: BoardDocument;
}

const Board = ({ board }: BoardProps) => {
  const { setBoard, setColors } = useBoardsStore();
  const { isKioskMode, isEditable } = useContext(InterfaceContext);

  useEffect(() => {
    if (board) {
      setBoard(board);
      setColors(board.colors.docs);
    }
  }, [board, setBoard, setColors]);

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
          className='inline-flex mt-4 overflow-x-auto overflow-y-hidden'
          style={{
            width: 'calc(100vw - 3rem)',
          }}
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
