import BoardComp from '../src/components/Board/Board';
import { useLists } from '../src/hooks/useLists';
import { BoardProvider } from '../src/hooks/useBoardContext';
import { useSession } from '../src/hooks/useSession';

const Board = props => {
  const { boards } = useSession();
  const { lists } = useLists(props.query.uid);
  
  if (!boards) return 'Loading...';

  const board = boards.find(b => b.uid === props.query.uid);

  return (
    <BoardProvider value={board}>
      <div>
        <BoardComp
          boardId={board.uid}
          boardTitle={board.title}
          boardColor={'red'}
          lists={lists}
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
