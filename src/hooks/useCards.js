import React from 'react';
import firebase from '../firebase.service';

export const useCards = (boardUid, listUid) => {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [cards, setCards] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = firebase.listenToCards(
      { boardUid, listUid },
      cards => {
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
