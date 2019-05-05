import React from 'react';
import firebase from 'firebase';

export const useBoard = boardUid => {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [board, setBoard] = React.useState(null);

  React.useEffect(() => {
    const unsubscribe = firebase
      .database()
      .ref('boards')
      .child(boardUid)
      .on(
        'value',
        snapshot => {
          const data = snapshot.val();
          if (data) {
            console.log(data);
            const board = Object.keys(data).map(k => ({
              uid: k,
              ...data[k],
            }));
            setBoard(board);
          }
          setLoading(false);
        },
        err => {
          setError(err);
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
