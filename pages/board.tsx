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
    board: Document;

    static getInitialProps = ({ query }) => ({ query });

    constructor(props) {
      super(props);

      const { query } = this.props;
      this.board = new Document(`boards/${query.uid}`);
    }

    render() {
      const { query } = this.props;

      return (
        <div>
          <BoardComponent board={this.board} kioskMode={query.kiosk} />
        </div>
      );
    }
  }
);
