import * as firebase from 'firebase/app';
import 'firebase/firestore';
import { initFirestorter } from 'firestorter';

import { IAction } from '../core/actions/types';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};

class FirebaseService {
  app: firebase.app.App;
  db: firebase.firestore.Firestore;

  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    try {
      initFirestorter({ firebase });
    } catch (error) {
      // do nothing
    }

    /* Firebase APIs */
    this.db = firebase.firestore();
  }

  getUsers = () => this.db.collection('users');

  getBoards = () => this.db.collection('boards');

  getBoardInvites = () => this.db.collection('board_invites');

  getUser = (email: string) => this.getUsers().doc(email);

  getBoard = (id: string) => this.getBoards().doc(id);

  getBoardInvite = (id: string) => this.getBoardInvites().doc(id);

  createAction = (action: IAction) => {
    return this.db.collection('actions').add(action);
  };
}

export default new FirebaseService();
