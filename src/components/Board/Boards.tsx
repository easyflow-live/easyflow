import { observer } from 'mobx-react-lite';

import WithRouter from '../WithRouter';
import BoardAdder from './BoardAdder';
import { useBoardContext } from './BoardProvider';

const BoardLink = WithRouter(({ board, ...props }) => {
  return (
    <a className='board-link' {...props}>
      <span className='board-link-title'>{board.title}</span>
    </a>
  );
});

export const Boards = observer(() => {
  const { boards } = useBoardContext();

  return (
    <div className='boards'>
      {boards &&
        boards.map(board => (
          <BoardLink
            board={board.data}
            key={board.id}
            routeTo={`/board?uid=${board.id}`}
          />
        ))}
      <BoardAdder />
    </div>
  );
});
