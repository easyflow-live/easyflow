import firebase from 'firebase';
import app from 'firebase/app';
import 'firebase/firestore';
import { initFirestorter, Collection } from 'firestorter';
import SessionStore from './session.store';

const config = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_DATABASE_URL,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_ID,
};

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}
try {
  initFirestorter({ firebase: firebase });
} catch (error) {}

const boards = new Collection('boards');
const auth = app.auth().onAuthStateChanged;
const session = new SessionStore();

export { boards, auth, session };

// class FireService {
//   app: any;
//   auth: app.auth.Auth;
//   googleProvider: app.auth.GoogleAuthProvider;

//   constructor() {
//     /* Firebase APIs */
//     this.app = app;
//     this.auth = app.auth();

//     /* Social Sign In Method Provider */

//     this.googleProvider = new app.auth.GoogleAuthProvider();
//   }

//   // *** Auth API ***
//   //   doSignInWithGoogle = async onLoggin => {
//   //     const { user } = await this.auth.signInWithPopup(this.googleProvider);

//   //     if (user) {
//   //       const token = await user.getIdToken(true);
//   //       this.getUser(user.email).set({
//   //         username: user.displayName,
//   //         email: user.email,
//   //         photo: user.photoURL,
//   //         roles: {},
//   //         token,
//   //       });

//   //       onLoggin && onLoggin(user);
//   //     }
//   //   };

//   doSignOut = () => this.auth.signOut();
//   // *** Merge Auth and DB User API *** //

//   onAuthUserListener = onAuthChange =>
//     this.auth.onAuthStateChanged(
//       authUser => onAuthChange && onAuthChange(authUser)
//     );
// }

// export default new FireService();
