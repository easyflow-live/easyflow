import { observer } from 'mobx-react-lite';
import { CSSTransition, TransitionGroup } from 'react-transition-group';

import { useSession } from '../../hooks/useSession';
import { StartProjectEmpty } from '../Empty/StartBoardEmpty';
import { AnimatedOpacity } from '../Animated/AnimatedOpacity';
import BoardAdder from './BoardAdder';
import BoardLink from './BoardLink';

interface BoardsProps {
  className: string;
}

export const Boards = observer(({ className }: BoardsProps) => {
  const { userDoc, user } = useSession();

  if (!userDoc || !user) return null;

  const { boards, isLoading } = userDoc;

  const showEmpty = !boards.docs.length && !isLoading;

  return (
    <>
      <TransitionGroup className={`inline-flex flex-wrap w-full ${className}`}>
        {boards.docs.length > 0 && (
          <BoardAdder style={{ minHeight: '140px', marginLeft: 0 }} />
        )}
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
      <AnimatedOpacity show={showEmpty}>
        <StartProjectEmpty />
      </AnimatedOpacity>
    </>
  );
});
