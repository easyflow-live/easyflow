import React, { useEffect, useRef } from 'react';
import { observer } from 'mobx-react-lite';
import Router from 'next/router';
import { toast } from 'react-toastify';

import { cards } from 'core/actions';
import { useBoardsStore } from 'store';
import BoardDocument from 'documents/board.doc';
import CardDocument from 'documents/card.doc';
import ListDocument from 'documents/list.doc';
import ListColumns from 'components/List/ListColumns';
import BoardHeader from 'modules/Board/components/BoardHeader';
import { CreateContentEmpty } from 'components/Empty/CreateContentEmpty';
import { AnimatedOpacity } from 'components/Animated/AnimatedOpacity';
import { useSession } from 'components/providers/SessionProvider';
import BoardMenu from './components/BoardMenu';
import { ToastUndo } from 'components/shared';

interface BoardProps {
  board: BoardDocument;
  previewMode?: boolean;
}

const Board = ({ board, previewMode }: BoardProps) => {
  const { setBoard } = useBoardsStore();
  const { userDoc } = useSession();

  const isOwner = board.isOwner(userDoc.id);

  const actionRef = useRef(false);

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

  const archiveOrLeaveBoard = async () => {
    if (!actionRef.current) return;

    isOwner ? await board.archive() : await board.removeMember(userDoc);

    Router.replace('/');
  };

  const undo = () => (actionRef.current = false);

  const removeBoard = async () => {
    actionRef.current = true;

    toast(
      <ToastUndo
        title={
          isOwner
            ? `This board will be archived...`
            : 'You will be removed from this board...'
        }
        id={board.id}
        undo={undo}
      />,
      {
        onClose: archiveOrLeaveBoard,
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
