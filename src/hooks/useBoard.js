import React from 'react';
import firebase from 'firebase';

export const useBoard = boardUid => {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [board, setBoard] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('boards')
      .doc(boardUid)
      .onSnapshot(
        snapshot => {
          const data = snapshot.data();
          if (data) {
            setBoard({
              ...data,
              uid: snapshot.id,
            });
          }
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
    board,
  };
};
