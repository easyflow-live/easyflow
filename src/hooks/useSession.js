import {
  useContext
} from 'react';

const UserContext = React.createContext({
  user: null,
});

export const UserProvider = props => {
  return <UserContext.Provider {
    ...props
  }
  />;
};

const BoardContext = React.createContext({
  boards: null,
  currentBoard: null
});

export const BoardProvider = props => {
  return <BoardContext.Provider {
    ...props
  }
  />;
};

export const useSession = () => {
  return {
    ...useContext(UserContext),
    ...useContext(BoardContext)
  };
};