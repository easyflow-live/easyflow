import { useCallback } from 'react';

import firebase from '../services/firebase.service';

export const useGoogleLogin = () => {
  const login = useCallback(
    (cb: (user?: firebase.User) => Promise<void>) =>
      firebase.doSignInWithGoogle(cb),
    []
  );
  const logout = useCallback(() => firebase.doSignOut(), []);

  return { login, logout };
};
