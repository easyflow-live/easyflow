import * as firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import { initFirestorter } from 'firestorter';

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
  app: any;
  auth: firebase.auth.Auth;
  db: firebase.firestore.Firestore;
  googleProvider: firebase.auth.GoogleAuthProvider;

  constructor() {
    if (!firebase.apps.length) {
      firebase.initializeApp(config);
    }
    try {
      initFirestorter({ firebase });
    } catch (error) {}

    /* Firebase APIs */
    this.auth = firebase.auth();
    this.db = firebase.firestore();

    /* Social Sign In Method Provider */
    this.googleProvider = new firebase.auth.GoogleAuthProvider();
  }

  // *** Auth API ***
  doSignInWithGoogle = async onLoggin => {
    const { user } = await this.auth.signInWithPopup(this.googleProvider);

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

  getUsers = () => this.db.collection('users');

  getUser = email => this.getUsers().doc(email);

  doSignOut = () => this.auth.signOut();

  onAuthUserListener = onAuthChange =>
    this.auth.onAuthStateChanged(
      authUser => onAuthChange && onAuthChange(authUser)
    );
}

export default new FirebaseService();
