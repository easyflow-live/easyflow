import { useMemo } from 'react';

import BoardComp from '../src/components/Board/Board';
import { useLists } from '../src/hooks/useLists';
import { useSession } from '../src/hooks/useSession';

const Board = props => {
  const { boards } = useSession();
  const { lists } = useLists(props.query.uid);
  const board = useMemo(() => boards && boards.find(b => b.uid === props.query.uid), [boards, props.query.uid]);
  
  if (!board) return 'Loading...';  
  
  return (
      <div>
        <BoardComp
        boardId={board.uid}
        boardTitle={board.title}
          boardColor={'red'}
          lists={lists}
          dispatch={a => console.log(a)}
        />
      </div>
  );
};

Board.getInitialProps = ({ query }) => {
  return { query };
};

export default Board;
