import { observer } from 'mobx-react-lite';
import { Collection } from 'firestorter';

import BoardDocument from 'modules/Board/data/board.doc';
import { AnimatedOpacity } from 'components/shared/Animated/AnimatedOpacity';
import { StartProjectEmpty } from 'components/shared/Empty/StartBoardEmpty';
import { BoardAdder } from './components/BoardAdder';
import { Box } from '@chakra-ui/react';
import { BoardCard } from './components/BoardCard';
import { UsersStoreProvider } from 'store';

interface BoardsProps {
  boards: Collection<BoardDocument>;
}

const Dashboard = ({ boards }: BoardsProps) => {
  const showEmpty = !boards?.docs.length && !boards?.isLoading;

  if (showEmpty) {
    return (
      <AnimatedOpacity show={showEmpty}>
        <StartProjectEmpty />
      </AnimatedOpacity>
    );
  }

  return (
    <UsersStoreProvider>
      <Box mt={5} display='inline-flex' flexWrap='wrap' w='full'>
        <BoardAdder />

        {boards.docs.map((board) => (
          <BoardCard key={board.id} board={board} />
        ))}
      </Box>
    </UsersStoreProvider>
  );
};

export default observer(Dashboard);
