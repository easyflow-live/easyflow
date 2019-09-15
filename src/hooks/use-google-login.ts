import { useCallback } from 'react';

import firebase from '../services/firebase.service';

const noop = () => null;

export const useGoogleLogin = () => {
  const login = useCallback((cb = noop) => firebase.doSignInWithGoogle(cb), []);
  const logout = useCallback(() => firebase.doSignOut(), []);

  return { login, logout };
};
