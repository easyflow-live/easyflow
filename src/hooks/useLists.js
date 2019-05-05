import React from 'react';
import firebase from 'firebase';

export const useLists = boardUid => {
  console.log(boardUid);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [lists, setLists] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = firebase
      .database()
      .ref(`boards/${boardUid}/lists`)
      .on(
        'value',
        snapshot => {
          const data = snapshot.val();
          console.log(snapshot);
          if (data) {
            const lists = Object.keys(data).map(k => ({
              uid: k,
              ...data[k],
            }));
            setLists(lists);
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
    lists,
  };
};
