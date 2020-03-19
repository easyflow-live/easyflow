import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import Router from 'next/router';
import { toast } from 'react-toastify';

import { cards } from '../../core/actions';
import { useBoardsStore } from '../../store';
import BoardDocument, { Board as BoardModel } from '../../documents/board.doc';
import CardDocument from '../../documents/card.doc';
import ListDocument from '../../documents/list.doc';
import ListColumns from '../List/ListColumns';
import BoardHeader from '../BoardHeader/BoardHeader';
import { CreateContentEmpty } from '../Empty/CreateContentEmpty';
import { AnimatedOpacity } from '../Animated/AnimatedOpacity';
import { useSession } from '../providers/SessionProvider';
import BoardMenu from './BoardMenu';
import { ToastUndo } from '../shared';

interface BoardProps {
  board: BoardDocument;
  previewMode?: boolean;
}

const Board = ({ board, previewMode }: BoardProps) => {
  const { setBoard } = useBoardsStore();
  const { userDoc } = useSession();

  const archivedRef = useRef(false);

  useEffect(() => {
    if (board) {
      setBoard(board);
    }
  }, [board, setBoard]);

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
      memberCreator: userDoc.ref,
      data: {
        card,
        listBefore,
        listAfter,
        board: board.ref,
        title: cardTitle || '',
      },
    });
  };

  const updateBoard = (data: Partial<BoardModel>) => board.update(data);

  const archiveBoard = async () => {
    if (!archivedRef.current) return;

    await updateBoard({ archived: true });
    Router.push('/');
  };

  const undo = () => (archivedRef.current = false);

  const removeBoard = async () => {
    archivedRef.current = true;

    toast(
      <ToastUndo
        title={`This board will be archived...`}
        id={board.id}
        undo={undo}
      />,
      {
        onClose: archiveBoard,
      }
    );
  };

  if (!board) return null;

  const { lists, isLoading: isLoadingBoard } = board;
  const { isLoading, docs } = lists;

  const showEmpty = !docs.length && !isLoading && !isLoadingBoard;

  return (
    <div className='relative overflow-hidden'>
      <div className='relative m-6 mt-4'>
        <BoardHeader
          board={board}
          onRemove={removeBoard}
          previewMode={previewMode}
        />

        <div
          className='inline-flex mt-4 overflow-x-auto overflow-y-hidden'
          style={{
            width: 'calc(100vw - 3rem)',
          }}
        >
          <ListColumns
            lists={lists}
            onCardMove={handeCardMoveAction}
            previewMode={previewMode}
          />
        </div>

        {!previewMode && (
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
