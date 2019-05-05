const Board = props => {
  return (
    <div>
      <h1>Board {props.query.uid}</h1>
    </div>
  );
};

Board.getInitialProps = ({ query }) => {
  return { query };
};

export default Board;
