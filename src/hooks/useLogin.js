import { useCallback } from 'react';

import firebase from '../firebase.service';

export const useGoogleLogin = () => {
  const login = useCallback(() => firebase.doSignInWithGoogle())
  const logout = useCallback(() => firebase.doSignOut());

  return { login, logout };
};
