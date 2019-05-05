import BoardComp from '../src/components/Board/Board';
import { useBoard } from '../src/hooks/useBoard';
import { useLists } from '../src/hooks/useLists';
import { BoardProvider } from '../src/hooks/useBoardContext';

const Board = props => {
  const { loading, board } = useBoard(props.query.uid);

  if (loading) return 'Loading...';
  console.log(board);
  return (
    <BoardProvider value={board}>
      <div>
        <h1>Board {board && board.title}</h1>
        <BoardComp
          boardId={board.uid}
          boardTitle={board.title}
          boardColor={'red'}
          lists={board.lists}
          dispatch={a => console.log(a)}
        />
      </div>
    </BoardProvider>
  );
};

Board.getInitialProps = ({ query }) => {
  return { query };
};

export default Board;
