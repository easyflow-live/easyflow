import firebase from 'firebase';
import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};

class Firebase {
  constructor() {
    if (!firebase.apps.length) {
      app.initializeApp(config);
    }

    /* Firebase APIs */
    this.app = app;
    this.auth = app.auth();
    this.db = app.firestore();

    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();
  }

  // *** Auth API ***
  doSignInWithGoogle = async onLoggin => {
    const {
      user
    } = await this.auth.signInWithPopup(this.googleProvider);

    if (user) {
      const token = await user.getIdToken(true);
      this.getUser(user.email).set({
        username: user.displayName,
        email: user.email,
        photo: user.photoURL,
        roles: {},
        token,
      });

      onLoggin && onLoggin(user);
    }
  };

  doSignOut = () => this.auth.signOut();

  getCurrentUser = () => this.auth.currentUser;

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = onAuthChange =>
    this.auth.onAuthStateChanged(
      authUser => onAuthChange && onAuthChange(authUser)
    );

  // *** User API ***

  getUsers = () => this.db.collection('users');

  getUser = email => this.getUsers().doc(email);

  // *** Board API ***

  getBoards = () => {
    const u = this.getCurrentUser();

    if (u) {
      return this.db
        .collection('boards')
        .where('users', 'array-contains', this.getUser(u.email));
    }

    return null;
  };

  getBoard = uid => this.db.collection('boards').doc(uid);

  // *** Lists API ***

  getLists = boardUid => this.getBoard(boardUid).collection('lists');

  getList = (boardUid, uid) => this.getLists(boardUid).doc(uid);

  // *** Cards API ***

  getCards = (boardUid, listUid) =>
    this.getList(boardUid, listUid).collection('cards');

  getOrderedCards = (boardUid, listUid) =>
    this.getList(boardUid, listUid)
    .collection('cards')
    .orderBy('index');

  getCard = (boardUid, listUid, uid) =>
    this.getCards(boardUid, listUid).doc(uid);

  updateCardIndex = async (boardId, listId, cardId, newCardIndex) => {
    const cardRef = this.getCard(boardId, listId, cardId);
    cardRef.update({
      index: newCardIndex
    }).then(() => {
      this.getList(boardId, listId)
        .collection('cards')
        .where("index", ">=", newCardIndex)
        .orderBy("index", 'asc')
        .get()
        .then(function (querySnapshot) {
          querySnapshot.forEach(function (doc) {
            if (cardRef.id != doc.id) {
              newCardIndex++;
              doc.ref.update({
                index: newCardIndex
              });
            }
          });
        })
        .catch(function (error) {
          console.log("Error getting documents: ", error);
        });

    });
  }

  // *** Listeners API ***

  __generateList = snapshot => {
    const list = [];
    snapshot.forEach(doc => {
      list.push({
        ...doc.data(),
        uid: doc.id,
      });
    });
    return list;
  };

  listenToBoards = (onUpdate, onError) => {
    const boardsRef = this.getBoards();

    if (boardsRef) {
      return boardsRef.onSnapshot(
        snapshot => onUpdate(this.__generateList(snapshot)),
        err => onError(err)
      );
    }

    return () => {};
  };

  listenToCards = ({
    boardUid,
    listUid
  }, onUpdate, onError) => {
    const cardsRef = this.getOrderedCards(boardUid, listUid);

    if (cardsRef) {
      return cardsRef.onSnapshot(
        async snapshot => {
            const cards = this.__generateList(snapshot);
            await Promise.all(
              cards.map(async c => {
                if (c.date) {
                  c.date = c.date.toDate();
                }
                if (c.assignee) {
                  c.assignee = (await c.assignee.get()).data();
                }
                Promise.resolve(c);
              })
            );
            return onUpdate(cards);
          },
          err => onError(err)
      );
    }

    return () => {};
  };
}

export default new Firebase();