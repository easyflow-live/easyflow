import React, { useCallback } from 'react';
import firebase from 'firebase';

export const useAuth = () => {

  const [state, setState] = React.useState(() => {
    const user = firebase.auth().currentUser;
    return { initializing: !user, user };
  });

  React.useEffect(() => {

    const onChange = async user => {
      return setState({ initializing: false, user });
    };

    // listen for auth state changes
    const unsubscribe = firebase.auth().onAuthStateChanged(onChange);
    // unsubscribe to the listener when unmounting
    return () => unsubscribe();
  }, []);

  const updateCurrentUser = user => firebase.auth().updateCurrentUser(user);

  return { ...state, updateCurrentUser };
};
