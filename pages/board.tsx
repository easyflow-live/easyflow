import React from 'react';
import BoardComponent from '../src/components/Board/Board';
import { useSession } from '../src/hooks/useSession';
import { useBoardContext } from '../src/components/Board/BoardProvider';
import { observer } from 'mobx-react-lite';
import fireService from '../src/fire.service';

type BoardPageProps = {
  query: any;
};

const BoardPage = observer(({ query }: BoardPageProps) => {
  const { uid, kiosk, user } = query;

  const { currentBoard } = useSession();
  const { boards } = useBoardContext();

  const board = boards.find(b => b.id === uid);
  const lists = React.useMemo(() => fireService.getLists(uid), [uid]);

  if (!board) return <div>'Loading...'</div>;

  return (
    <div>
      <BoardComponent
        board={board}
        kioskMode={kiosk}
        lists={lists}
        dispatch={(a: any) => console.log(a)}
      />
    </div>
  );
});

BoardPage.getInitialProps = ({ query }) => ({ query });

export default BoardPage;
