// import firebase from "firebase/compat/app";
import { getAuth } from 'firebase/auth'
import {initializeApp} from 'firebase/app'
import {getFirestore} from 'firebase/firestore'

// import 'firbase/compat/firestore'
// import 'firebase/compat/auth'
// import 'firebase/compat/storage'


// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCmSnK6_ZrtvQXTAYPtgFpl84EfGATnMSw",
  authDomain: "clone-3e007.firebaseapp.com",
  projectId: "clone-3e007",
  storageBucket: "clone-3e007.firebasestorage.app",
  messagingSenderId: "977619482118",
  appId: "1:977619482118:web:1db0407d69947c4b28b587",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

