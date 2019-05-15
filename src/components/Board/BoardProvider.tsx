import { createContext, useContext } from 'react';
import { Document } from 'firestorter';

interface BoardContextProp {
  boards: Document[];
}

const BoardContext = createContext<BoardContextProp>({
  boards: null,
});

export const BoardProvider = props => {
  return <BoardContext.Provider {...props} />;
};

export const useBoardContext = () => {
  return useContext(BoardContext);
};
