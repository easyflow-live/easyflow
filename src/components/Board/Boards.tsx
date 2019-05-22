import { observer } from 'mobx-react-lite';

import { useSession } from '../../hooks/useSession';
import BoardAdder from './BoardAdder';
import BoardLink from './BoardLink';

export const Boards = observer(() => {
  const { userDoc, user } = useSession();

  if (!userDoc || !user) return null;

  const { boards } = userDoc;

  return (
    <div className='inline-flex flex-wrap w-full'>
      {boards.docs &&
        boards.docs.map(board => (
          <BoardLink
            board={board.data}
            key={board.id}
            href={`/board?uid=${board.id}`}
          />
        ))}
      <BoardAdder />
    </div>
  );
});
