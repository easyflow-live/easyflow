import React from 'react';
import { observer } from 'mobx-react-lite';

import BoardComponent from '../src/components/Board/Board';
import { useSession } from '../src/hooks/useSession';
import BoardDocument from '../src/documents/board.doc';

interface BoardPageProps {
  query: { uid: string; kiosk: boolean };
  children: React.ReactChildren;
}

const Board = ({ query }: BoardPageProps) => {
  const { userDoc } = useSession();
  const boards = userDoc ? userDoc.boards.docs : [];

  if (!boards.length) return null;

  const board: BoardDocument = boards.find(d => d.id === query.uid);
  return (
    <div>
      <BoardComponent board={board} kioskMode={query.kiosk} />
    </div>
  );
};

Board.getInitialProps = ({ query }) => ({ query });

export default observer(Board);
