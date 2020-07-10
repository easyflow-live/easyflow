import React, { useEffect } from 'react';
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
      <BoardComponent board={board} previewMode={previewMode} />
    </AuthenticatedPage>
  );
};

Board.getInitialProps = ({ query }) => ({ query });

export default observer(Board);
