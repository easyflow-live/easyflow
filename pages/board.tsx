import React from 'react';
import { observer } from 'mobx-react';
import { Collection, Document } from 'firestorter';

import BoardComponent from '../src/components/Board/Board';

interface BoardPageProps {
  query: { uid: string; kiosk: boolean };
  children: React.ReactChildren;
}

export default observer(
  class Board extends React.Component<BoardPageProps, {}> {
    lists: Collection;
    board: Document;

    static getInitialProps = ({ query }) => ({ query });

    constructor(props) {
      super(props);

      const { query } = this.props;
      this.lists = new Collection(`boards/${query.uid}/lists`);
      this.board = new Document(`boards/${query.uid}`);
    }

    render() {
      const { query } = this.props;
      const { docs } = this.lists;

      return (
        <div>
          <BoardComponent
            board={this.board}
            kioskMode={query.kiosk}
            lists={docs}
            dispatch={(a: any) => console.log(a)}
          />
        </div>
      );
    }
  }
);
