import firebase from 'firebase/app';
import 'firebase/auth';
import {
  useContext,
  createContext,
  PropsWithChildren,
  useState,
  useEffect,
} from 'react';
import { useRouter } from 'next/router';
import cookies from 'js-cookie';

import UserDocument from 'documents/user.doc';

export interface CookieUser {
  displayName: string;
  email: string;
  photoURL: string;
  id: string;
  token: string;
  emailVerified: string;
  isAnonymous: boolean;
  createdAt: number;
  lastLoginAt: number;
}

export const normalizeCookieUser = (user: firebase.User): CookieUser => {
  const rawUser: any = user.toJSON();

  const {
    displayName,
    email,
    emailVerified,
    isAnonymous,
    photoURL,
    stsTokenManager,
    uid,
    createdAt,
    lastLoginAt,
  } = rawUser;

  return {
    displayName,
    email,
    photoURL,
    id: uid,
    token: stsTokenManager.accessToken,
    emailVerified,
    isAnonymous,
    createdAt,
    lastLoginAt,
  };
};

interface SessionContextProps {
  user: CookieUser;
  initializing: boolean;
  userDoc: UserDocument;
  isLogged: boolean;
  logout: () => Promise<void>;
}

const SessionContext = createContext<SessionContextProps>({
  user: null,
  initializing: true,
  userDoc: null,
  isLogged: false,
  logout: null,
});

const useProvideSession = () => {
  const router = useRouter();

  const [user, setUser] = useState<CookieUser>();
  const [userDoc, setUserDoc] = useState<UserDocument>(null);
  const [initializing, setInitializing] = useState<boolean>(true);

  const logout = async () => {
    return firebase
      .auth()
      .signOut()
      .then(() => {
        cookies.remove('auth');
        router.push('/');
        setUser(null);
      })
      .catch(console.log);
  };

  useEffect(() => {
    const unsubscribe = firebase
      .auth()
      .onAuthStateChanged(
        (authUser: firebase.User) =>
          authUser && setUser(normalizeCookieUser(authUser))
      );

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const cookie = cookies.get('auth');
    if (!cookie) {
      setInitializing(false);
      return;
    }

    const u = JSON.parse(cookie);
    setUser(u);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (user) {
      const userDoc = new UserDocument(`users/${user.email}`);
      setUserDoc(userDoc);

      firebase
        .firestore()
        .collection('users')
        .doc(user.email)
        .set({
          username: user.displayName,
          email: user.email,
          photo: user.photoURL,
          roles: {},
          token: user.token,
        })
        .then(() => setInitializing(false));
    }
  }, [user]);

  return { user, initializing, userDoc, isLogged: !!user, logout };
};

export const SessionProvider = ({ children }: PropsWithChildren<any>) => {
  const session = useProvideSession();
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
};

export const useSession = () => {
  return useContext(SessionContext);
};
