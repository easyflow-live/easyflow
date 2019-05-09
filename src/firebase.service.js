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
    this.auth = app.auth();
    this.db = app.firestore();

    /* Social Sign In Method Provider */

    this.googleProvider = new app.auth.GoogleAuthProvider();
  }

  // *** Auth API ***
  doSignInWithGoogle = async (onLoggin) => {
    const {
      user
    } = this.auth.signInWithPopup(this.googleProvider);

    if (user) {
      onLoggin && onLoggin(user);
      this.user(user.email)
        .set({
          username: user.displayName,
          email: user.email,
          photo: user.photoURL,
          roles: {},
        });
    }
  }

  doSignOut = () => this.auth.signOut();

  getCurrentUser = () => this.auth.currentUser

  // *** Merge Auth and DB User API *** //

  onAuthUserListener = (onAuthChange) =>
    this.auth.onAuthStateChanged(authUser =>
      onAuthChange && onAuthChange(authUser)
    );

  // *** User API ***

  getUsers = () => this.db.collection('users');

  getUser = email => this.getUsers().doc(email);

  // *** Board API ***

  getBoards = () => {
    const u = this.getCurrentUser();

    if (u) {
      return this.db.collection('boards').where("users", "array-contains", this.getUser(u.email));
    }

    return null;
  }

  getBoard = uid => this.getBoards().doc(uid);

  // *** Lists API ***

  getLists = (boardUid) => this.getBoard(boardUid).collection('lists');

  getList = (boardUid, uid) => this.getLists(boardUid).doc(uid);

  // *** Cards API ***

  getCards = (boardUid, listUid) => this.getList(boardUid, listUid).collection('cards');

  getCard = (boardUid, listUid, uid) => this.getCards(boardUid, listUid).doc(uid);

  // *** Listeners API ***

  __generateList = (snapshot) => {
    const list = [];
    snapshot.forEach(doc => {
      list.push({
        ...doc.data(),
        uid: doc.id
      });
    });
    return list;
  }

  listenToBoards = (onUpdate, onError) => {
    const boardsRef = this.getBoards();

    if(boardsRef) {
      return boardsRef.onSnapshot(snapshot => onUpdate(this.__generateList(snapshot)), err => onError(err));
    }

    return () => {};
  }

}

export default new Firebase();