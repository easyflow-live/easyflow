import * as firebase from 'firebase/app';
import {
  useContext,
  createContext,
  PropsWithChildren,
  useState,
  useEffect,
} from 'react';
import { observer } from 'mobx-react-lite';

import UserDocument from '../../documents/user.doc';

interface SessionContextProps {
  user: firebase.User;
  initializing: boolean;
  userDoc: UserDocument;
  isLogged: boolean;
}

const SessionContext = createContext<SessionContextProps>({
  user: null,
  initializing: true,
  userDoc: null,
  isLogged: false,
});

export const useAuth = () => {
  const [state, setState] = useState(() => {
    const user = firebase.auth().currentUser;
    return { initializing: !user, user };
  });

  useEffect(() => {
    function onChange(user: firebase.User) {
      setState({ initializing: false, user });
    }

    const unsubscribe = firebase.auth().onAuthStateChanged(onChange);

    return () => unsubscribe();
  }, []);

  return state;
};

export const SessionProvider = observer(
  ({ children }: PropsWithChildren<{}>) => {
    const { user, initializing } = useAuth();
    const [userDoc, setUserDoc] = useState<UserDocument>(null);

    useEffect(() => {
      if (user) {
        const userDoc = new UserDocument(`users/${user.email}`);
        setUserDoc(userDoc);
      }
    }, [user]);

    const value = { user, initializing, userDoc, isLogged: !!user };

    return (
      <SessionContext.Provider value={value}>
        {children}
      </SessionContext.Provider>
    );
  }
);

export const useSession = () => {
  return useContext(SessionContext);
};
