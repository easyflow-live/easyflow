import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { initFirestorter, Collection, Document } from 'firestorter';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};

interface Cards {
  [path: string]: Collection;
}

class FireService {
  app: any;
  auth: firebase.auth.Auth;
  googleProvider: firebase.auth.GoogleAuthProvider;
  boards: Collection = null;
  lists: Collection = null;
  cards: Cards = {};

  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    try {
      initFirestorter({ firebase: firebase });
    } catch (error) {}

    /* Firebase APIs */
    this.auth = firebase.auth();

    /* Social Sign In Method Provider */
    this.googleProvider = new firebase.auth.GoogleAuthProvider();

    this.boards = new Collection('boards');
  }

  getBoards(userUid: string) {
    if (!userUid) return [];
    // const user = new Document(`users/${userUid}`);

    // if (!this.boards) {
    //   this.boards = new Collection('boards');
    //   this.boards.query = ref => ref.where('users', 'array-contains', user.ref);
    // }
    return this.boards.docs;
  }

  getBoard(boardUid: string) {
    if (!boardUid) return null;

    const board = new Document(`boards/${boardUid}`);
    return board.data;

    // let boards = [];

    // if (!this.boards) {
    //   boards = this.getBoards(userUid);
    // }

    // return boards.find(b => b.id === boardUid);
  }

  getLists(boardUid: string) {
    if (!boardUid) return null;

    if (!this.lists) {
      this.lists = new Collection(`boards/${boardUid}/lists`);
    }

    return this.lists.docs;
  }

  getCards(listPath: string) {
    if (!listPath) return null;

    if (!this.cards[listPath]) {
      this.cards[listPath] = new Collection(`${listPath}/cards`);
    }

    return this.cards[listPath].docs;
  }

  // *** Auth API ***
  //   doSignInWithGoogle = async onLoggin => {
  //     const { user } = await this.auth.signInWithPopup(this.googleProvider);

  //     if (user) {
  //       const token = await user.getIdToken(true);
  //       this.getUser(user.email).set({
  //         username: user.displayName,
  //         email: user.email,
  //         photo: user.photoURL,
  //         roles: {},
  //         token,
  //       });

  //       onLoggin && onLoggin(user);
  //     }
  //   };

  doSignOut = () => this.auth.signOut();
  // *** Merge Auth and DB User API *** //

  onAuthUserListener = onAuthChange =>
    this.auth.onAuthStateChanged(
      authUser => onAuthChange && onAuthChange(authUser)
    );
}

export default new FireService();
