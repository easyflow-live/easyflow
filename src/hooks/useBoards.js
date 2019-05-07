import React from 'react';
import firebase from 'firebase';

export const useBoards = () => {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [boards, setBoards] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('boards')
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
