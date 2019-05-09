import React from 'react';
import firebase from '../firebase.service';

export const useBoards = () => {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [boards, setBoards] = React.useState([]);

  React.useEffect(() => {
    const unsubscribe = firebase.listenToBoards(boards => {
        setBoards(boards);
        setLoading(false);
      },
      err => {
        setError(err);
        setLoading(false);
      }
    )
    return () => unsubscribe();
  }, []);

  return {
    error,
    loading,
    boards,
  };
};