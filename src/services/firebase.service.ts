import { getApp, getApps, initializeApp } from 'firebase/app'
import { getAuth, signOut } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// import { initFirestorter } from 'firestorter'

const config = {
  apiKey: process.env.NEXT_PUBLIC_APP_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_APP_AUTH_DOMAIN,
  databaseURL: process.env.NEXT_PUBLIC_APP_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_APP_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_APP_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
}

const app = !getApps().length ? initializeApp(config) : getApp()

// Initialize Firebase services
const firestore = getFirestore(app)
const auth = getAuth(app)

// @ts-ignore
// initFirestorter({ app, firestore })

export { app, firestore, auth }

// class FirebaseService {
//   app: firebase.app.App
//   db: firebase.firestore.Firestore

//   constructor() {
//     /* Firebase APIs */
//     this.db = firebase.firestore()
//   }

//   getUsers = () => this.db.collection('users')

//   getBoards = () => this.db.collection('boards')

//   getBoardInvites = () => this.db.collection('board_invites')

//   getUser = (email: string) => this.getUsers().doc(email)

//   getBoard = (id: string) => this.getBoards().doc(id)

//   getBoardInvite = (id: string) => this.getBoardInvites().doc(id)

//   createActivity = (activity: Activity) => {
//     return this.db.collection('actions').add(activity)
//   }
// }

// export default new FirebaseService()
