import { useCallback } from 'react';

import firebase from '../services/firebase.service';

export const useGoogleLogin = () => {
  const login = useCallback(
    onLogin => firebase.doSignInWithGoogle(onLogin),
    []
  );
  const logout = useCallback(() => firebase.doSignOut(), []);

  return { login, logout };
};
