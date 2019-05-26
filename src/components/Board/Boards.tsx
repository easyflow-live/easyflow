import { observer } from 'mobx-react-lite';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useSession } from '../../hooks/useSession';
import BoardAdder from './BoardAdder';
import BoardLink from './BoardLink';

export const Boards = observer(() => {
  const { userDoc, user } = useSession();

  if (!userDoc || !user) return null;

  const { boards } = userDoc;

  return (
    <TransitionGroup className='inline-flex flex-wrap w-full'>
      <BoardAdder style={{ minHeight: '140px', marginLeft: 0 }} />
      {boards.docs &&
        boards.docs.map(board => (
          <CSSTransition key={board.id} timeout={200} classNames='item'>
            <BoardLink
              board={board.data}
              key={board.id}
              href={`/board?uid=${board.id}`}
            />
          </CSSTransition>
        ))}
    </TransitionGroup>
  );
});
