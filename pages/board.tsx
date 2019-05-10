import * as React from 'react';
import BoardComponent from '../src/components/Board/Board';
import { useLists } from '../src/hooks/useLists';
import { useSession } from '../src/hooks/useSession';

type BoardPageProps = {
  query: any;
};

const BoardPage: React.FunctionComponent = (props: BoardPageProps) => {
  const { boards } = useSession();
  const { uid, kiosk } = props.query;
  const { lists } = useLists(props.query.uid);
  const board = React.useMemo(
    () => boards && boards.find((b: { uid: any }) => b.uid === props.query.uid),
    [boards, props.query.uid]
  );

  if (!board) return 'Loading...';

  return (
    <div>
      <BoardComponent
        boardId={board.uid}
        boardTitle={board.title}
        boardColor={'red'}
        kioskMode={kiosk}
        lists={lists}
        dispatch={(a: any) => console.log(a)}
      />
    </div>
  );
};

BoardPage.getInitialProps = ({ query }) => ({ query });

export default BoardPage;
