import { observer } from 'mobx-react-lite';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Collection } from 'firestorter';

import BoardDocument from '../../documents/board.doc';
import { AnimatedOpacity } from '../Animated/AnimatedOpacity';
import { StartProjectEmpty } from '../Empty/StartBoardEmpty';
import BoardAdder from './BoardAdder';
import BoardLink from './BoardLink';

interface BoardsProps {
  boards: Collection<BoardDocument>;
}

export const Boards = observer(({ boards }: BoardsProps) => {
  const showEmpty = !boards.docs.length && !boards.isLoading;

  return (
    <div className='mt-5'>
      <TransitionGroup className={`inline-flex flex-wrap w-full`}>
        {boards.docs.length > 0 && <BoardAdder />}

        {boards.docs.map(board => (
          <CSSTransition key={board.id} timeout={200} classNames='item'>
            <BoardLink
              title={board.data.title}
              key={board.id}
              href={`/board?uid=${board.id}`}
            />
          </CSSTransition>
        ))}
      </TransitionGroup>

      <AnimatedOpacity show={showEmpty}>
        <StartProjectEmpty />
      </AnimatedOpacity>
    </div>
  );
});
