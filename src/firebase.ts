import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGE_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_SENDER_ID,
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const firedb = firebase.firestore();
export {firebase, auth, firedb};

/* Schema */

export const TMP_RESERVE = 'tmpReserve';
export interface DocTmpReserve {
  owner: string;
  date: string;
  createdAt: firebase.firestore.Timestamp;
};
