import React from 'react';
import firebase from 'firebase';

export const useLists = boardUid => {
  console.log(boardUid);
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [lists, setLists] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('boards')
      .doc(boardUid)
      .collection('lists')
      .onSnapshot( snapshot => {
          const lists = [];
          snapshot.forEach(doc => {            
            lists.push({ ...doc.data(), uid: doc.id });
          });
          setLists(lists);
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
