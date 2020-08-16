import React, { useEffect } from 'react';
import { observer } from 'mobx-react-lite';

import { useSession } from 'hooks/use-session';
import { useBoard } from 'hooks/use-board';
import Board from 'modules/Board';
import AuthenticatedPage from 'components/shared/AuthenticatedPage';
import { useInterface } from 'components/providers/InterfaceProvider';
import Loader from 'components/shared/Loader';
import { BoardsStoreProvider, UsersStoreProvider } from 'store';

interface BoardPageProps {
  query: { uid: string; previewmode: boolean };
  children: React.ReactChildren;
}

const error404 = {
  statusCode: 404,
  title: 'Board not found',
};

const BoardPage = ({ query }: BoardPageProps) => {
  const { user } = useSession();
  const [board] = useBoard(query.uid);
  const { setPreviewMode } = useInterface();

  const isAnonymous = !user;
  const isABoardMember = !isAnonymous && board && board.hasMember(user.email);

  const previewMode = !!query.previewmode || isAnonymous || !isABoardMember;

  useEffect(() => {
    setPreviewMode(previewMode);
  }, [previewMode, setPreviewMode]);

  if (!board || board.isLoading) return <Loader />;

  return (
    <AuthenticatedPage
      isAnonymous={isAnonymous}
      error={!board.exists && error404}
    >
      <UsersStoreProvider>
        <BoardsStoreProvider>
          <Board board={board} previewMode={previewMode} />
        </BoardsStoreProvider>
      </UsersStoreProvider>
    </AuthenticatedPage>
  );
};

BoardPage.getInitialProps = ({ query }) => ({ query });

export default observer(BoardPage);
