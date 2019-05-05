import { useContext } from 'react';

const BoardContext = React.createContext({
  board: null,
});

export const BoardProvider = props => {
  return <BoardContext.Provider {...props} />;
};

export const BoardConsumer = props => {
  return <BoardContext.Consumer {...props} />;
};

export const useBoardContext = () => {
  return useContext(BoardContext);
};
