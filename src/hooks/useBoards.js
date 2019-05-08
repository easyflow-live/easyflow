import React from 'react';
import firebase from 'firebase';
import { useSession } from './useSession';

export const useBoards = () => {
  const [error, setError] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [boards, setBoards] = React.useState([]);
  const { user, userRef } = useSession();

  React.useEffect(() => {
    const db = firebase.firestore();
    const userDocRef = db.collection(`users`).doc(user.email)
    const unsubscribe = db.collection('boards')
      .where("users", "array-contains", userDocRef)
      .onSnapshot(snapshot => {
        const boards = [];
        snapshot.forEach(boardDoc => {
          
          db.collection('boards')
            .doc(boardDoc.id)
            .collection('lists')
            .get().then(listDocs => {

              const  lists = [];
              listDocs.forEach(listDoc => {                  

                db.collection('boards')
                .doc(boardDoc.id)
                .collection('lists')
                .doc(listDoc.id)
                .collection('cards')
                .get().then(cardDocs => {
                  debugger;
                  const cards = [];
                  cardDocs.forEach(cardDoc => {
                    cards.push({ ...cardDoc.data(), uid: cardDoc.id });               
                  });
                  lists.push({ ...listDoc.data(), uid: listDoc.id, cards }); 
                  
                  boards.push({ ...boardDoc.data(), uid: boardDoc.id, lists });
                  setBoards(boards);
                  setLoading(false);
                  
                }); 
                              
              });
              
            });  

        });        
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
