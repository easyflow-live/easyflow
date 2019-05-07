import React from 'react';
import firebase from 'firebase';

export const useCards = (boardUid, listUid) => {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = firebase
      .firestore()
      .collection('boards')
      .doc(boardUid)
      .collection('lists')
      .doc(listUid)
      .collection('cards')
      .onSnapshot(
        snapshot => {
          const cards = [];
          snapshot.forEach(doc => {
            cards.push({ ...doc.data(), uid: doc.id });
          });
          setCards(cards);
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
    cards,
  };
};
