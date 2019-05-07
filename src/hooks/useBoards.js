import React from 'react';
import firebase from 'firebase';
import { useSession } from './useSession';

export const useBoards = () => {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [boards, setBoards] = React.useState([]);
  const { user, userRef } = useSession();  

  React.useEffect(() => {

    const userDocRef = firebase
    .firestore()
    .collection(`users`)
    .doc(user.email)

    const unsubscribe = firebase
      .firestore()
      .collection('boards')
      //.where("owner", "==", userDocRef)
      .where("users", "array-contains", userDocRef)
      .onSnapshot(
        snapshot => {
          const boards = [];
          snapshot.forEach(doc => {
            
            boards.push({ ...doc.data(), uid: doc.id });
          });
          setBoards(boards);
          setLoading(false);
        },
        err => {
          setError(err);
          setLoading(false);
        }
      );

    return () => unsubscribe();
  }, []);

  return {
    error,
    loading,
    boards,
  };
};
