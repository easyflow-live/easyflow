import { observer } from 'mobx-react-lite';
import { Collection } from 'firestorter';

import BoardDocument from 'modules/Board/data/board.doc';
import { AnimatedOpacity } from 'components/shared/Animated/AnimatedOpacity';
import { StartProjectEmpty } from 'components/shared/Empty/StartBoardEmpty';
import { BoardAdder } from './components/BoardAdder';
import { BoardLink } from './components/BoardLink';
import { Box } from '@chakra-ui/layout';

interface BoardsProps {
  boards: Collection<BoardDocument>;
}

const Boards = ({ boards }: BoardsProps) => {
  const showEmpty = !boards.docs.length && !boards.isLoading;

  if (showEmpty) {
    return (
      <AnimatedOpacity show={showEmpty}>
        <StartProjectEmpty />
      </AnimatedOpacity>
    );
  }

  return (
    <Box mt={5} display='inline-flex' flexWrap='wrap' w='full'>
      <BoardAdder />

      {boards.docs.map(({ id, data: { title } }) => (
        <BoardLink key={id} title={title} id={id} />
      ))}
    </Box>
  );
};

export default observer(Boards);
