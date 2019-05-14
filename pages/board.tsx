import React from 'react';

import BoardComponent from '../src/components/Board/Board';

interface BoardPageProps {
  query: { uid: string; kiosk: boolean };
  children: React.ReactChildren;
}

export default class Board extends React.Component<BoardPageProps, {}> {
  static getInitialProps = ({ query }) => ({ query });

  render() {
    const { query } = this.props;

    return (
      <div>
        <BoardComponent uid={query.uid} kioskMode={query.kiosk} />
      </div>
    );
  }
}
