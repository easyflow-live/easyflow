import React from 'react';
import firebase from 'firebase';

export const useBoards = () => {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [boards, setBoards] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = firebase
      .database()
      .ref('boards')
      .on(
        'value',
        snapshot => {
          const data = snapshot.val();
          if (data) {
            const boards = Object.keys(data).map(k => ({
              uid: k,
              ...data[k],
            }));
            setBoards(boards);
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
    boards,
  };
};
