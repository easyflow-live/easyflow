import { useContext, createContext } from 'react';
import { Document } from 'firestorter';

interface SessionContextProps {
  user: null;
  initializing: boolean;
  currentBoard: Document;
  setCurrentBoard(boardUid: string): void;
}

const SessionContext = createContext<SessionContextProps>({
  user: null,
  initializing: true,
  currentBoard: null,
  setCurrentBoard: (boardUid: string) => {},
});

export const SessionProvider = props => {
  return <SessionContext.Provider {...props} />;
};

export const useSession = () => {
  return useContext(SessionContext);
};
