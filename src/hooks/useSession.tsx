import { useContext, createContext } from 'react';
import UserDocument from 'src/stores/user.doc';

interface SessionContextProps {
  user: null;
  initializing: boolean;
  userDoc: UserDocument;
}

const SessionContext = createContext<SessionContextProps>({
  user: null,
  initializing: true,
  userDoc: null,
});

export const SessionProvider = props => {
  return <SessionContext.Provider {...props} />;
};

export const useSession = () => {
  return useContext(SessionContext);
};
