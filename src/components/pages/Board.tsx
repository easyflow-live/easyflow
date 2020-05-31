import React from 'react';
import { observer } from 'mobx-react-lite';

import { useSession } from '../../hooks/use-session';
import { useBoard } from '../../hooks/use-board';
import BoardComponent from '../Board/Board';
import AuthenticatedPage from '../shared/AuthenticatedPage';
import { useInterface } from '../providers/InterfaceProvider';
import Loader from '../shared/Loader';

interface BoardPageProps {
  query: { uid: string; previewmode: boolean };
  children: React.ReactChildren;
}

const error404 = {
  statusCode: 404,
  title: 'Board not found',
};

const Board = ({ query }: BoardPageProps) => {
  const { userDoc, isLogged } = useSession();
  const [board, isBoardLoading] = useBoard(query.uid);
  const { setPreviewMode } = useInterface();

  const isLoading = userDoc ? userDoc.boards.isLoading : true;

  if (!board && isLoading) return <Loader />;

  const redirect = !userDoc && !isBoardLoading;

  const previewMode =
    !!query.previewmode || !isLogged || !board.isAMember(userDoc);
  setPreviewMode(previewMode);

  return (
    <AuthenticatedPage
      isAnonymous={!isLogged}
      redirect={redirect}
      error={!board && error404}
    >
      <BoardComponent board={board} previewMode={previewMode} />
    </AuthenticatedPage>
  );
};

Board.getInitialProps = ({ query }) => ({ query });

export default observer(Board);
