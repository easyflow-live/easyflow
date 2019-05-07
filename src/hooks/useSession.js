import { useContext } from 'react';

const UserContext = React.createContext({
  user: null,
  userRef: null
});

export const UserProvider = props => {
  return <UserContext.Provider {...props} />;
};

export const useSession = () => {
  return useContext(UserContext);
};
