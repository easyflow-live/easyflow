import firebase from 'firebase';
import { useAuth } from './useAuth';
import { useMemo } from 'react';

const provider = new firebase.auth.GoogleAuthProvider();
provider.addScope('profile');
provider.addScope('email');

export const useGoogleLogin = () => {
  const { updateCurrentUser } = useAuth();

  const login = async () => {
    const { user } = await firebase.auth().signInWithPopup(provider);

    if (user) {
      updateCurrentUser(user);
      await firebase
        .database()
        .ref(`users/${user.uid}`)
        .set({
          username: user.displayName,
          email: user.email,
          photo: user.photoURL,
          roles: {},
        });
    }
  };

  const logout = () => firebase.auth().signOut();

  return { login, logout };
};
