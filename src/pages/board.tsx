import React from 'react';
import { observer } from 'mobx-react-lite';
import Error from 'next/error';
import Router from 'next/router';

import BoardComponent from '../components/Board/Board';
import { useSession } from '../hooks/use-session';
import { useInterface } from '../components/providers/InterfaceProvider';
import { useBoard } from '../hooks/use-board';

interface BoardPageProps {
  query: { uid: string; kiosk: boolean };
  children: React.ReactChildren;
}

const Board = ({ query }: BoardPageProps) => {
  const { userDoc, initializing } = useSession();
  const [board, isBoardLoading] = useBoard(query.uid);
  const { setIsEditable, setIsKioskMode } = useInterface();

  if (initializing) return null;

  const isKioskMode = Boolean(query.kiosk);

  setIsKioskMode(isKioskMode);
  // if there is not user logged, editable must be false
  setIsEditable(!!userDoc);

  const isLoading = userDoc ? userDoc.boards.isLoading : true;

  if (!board && isLoading) return null;
  if (!board) return <Error statusCode={404} />;
  if (!userDoc && !query.kiosk && !isBoardLoading) Router.push('/');

  return <BoardComponent board={board} />;
};

Board.getInitialProps = ({ query }) => ({ query });

export default observer(Board);
