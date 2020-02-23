import React from 'react';
import { observer } from 'mobx-react-lite';

import { useSession } from '../hooks/use-session';
import { useBoard } from '../hooks/use-board';
import { useInterface } from '../components/providers/InterfaceProvider';
import BoardComponent from '../components/Board/Board';
import AuthenticatedPage from '../components/shared/AuthenticatedPage';
import Loader from '../components/shared/Loader';

interface BoardPageProps {
  query: { uid: string; kiosk: boolean };
  children: React.ReactChildren;
}

const error404 = {
  statusCode: 404,
  title: 'Board not found',
};

const Board = ({ query }: BoardPageProps) => {
  const { userDoc } = useSession();
  const [board, isBoardLoading] = useBoard(query.uid);
  const { setIsEditable, setIsKioskMode } = useInterface();

  const isKioskMode = Boolean(query.kiosk);

  setIsKioskMode(isKioskMode);
  // if there is not user logged, editable must be false
  setIsEditable(!!userDoc);

  const isLoading = userDoc ? userDoc.boards.isLoading : true;

  if (!board && isLoading) return <Loader />;

  const redirect = !userDoc && !query.kiosk && !isBoardLoading;

  return (
    <AuthenticatedPage
      isAnonymous={isKioskMode}
      redirect={redirect}
      error={!board && error404}
    >
      <BoardComponent board={board} />
    </AuthenticatedPage>
  );
};

Board.getInitialProps = ({ query }) => ({ query });

export default observer(Board);
