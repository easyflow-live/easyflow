import { observer } from 'mobx-react-lite';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import { Collection } from 'firestorter';

import BoardDocument from 'documents/board.doc';
import { AnimatedOpacity } from 'components/shared/Animated/AnimatedOpacity';
import { StartProjectEmpty } from 'components/shared/Empty/StartBoardEmpty';
import BoardAdder from './components/BoardAdder';
import BoardLink from './components/BoardLink';

interface BoardsProps {
  boards: Collection<BoardDocument>;
}

const Boards = ({ boards }: BoardsProps) => {
  const showEmpty = !boards.docs.length && !boards.isLoading;

  return (
    <div className='mt-5'>
      <TransitionGroup className={`inline-flex flex-wrap w-full`}>
        {boards.docs.length > 0 && <BoardAdder />}

        {boards.docs
          .filter(({ data }) => !data.archived)
          .map(board => (
            <CSSTransition key={board.id} timeout={200} classNames='item'>
              <BoardLink title={board.data.title} id={board.id} />
            </CSSTransition>
          ))}
      </TransitionGroup>

      <AnimatedOpacity show={showEmpty}>
        <StartProjectEmpty />
      </AnimatedOpacity>
    </div>
  );
};

export default observer(Boards);
