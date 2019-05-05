import React from 'react';
import firebase from 'firebase';

const createModel = rawObj =>
  Object.keys(rawObj).map(k => ({
    uid: k,
    ...rawObj[k],
  }));

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
            const listsSet = createModel(data.lists).map(
              l => (l.cards = createModel(l.cards)[0])
            );
            setBoard({
              ...data,
              uid: boardUid,
              lists: listsSet,
            });
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
