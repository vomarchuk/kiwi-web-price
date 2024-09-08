// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { FacebookAuthProvider, getAuth, GoogleAuthProvider } from 'firebase/auth'
import { getDatabase } from 'firebase/database'
import { getFirestore } from 'firebase/firestore'


// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBbKPkCtsM5ojaYAN6yJ7lliARD4vki_i8",
  authDomain: "kiwi-beauty-salon.firebaseapp.com",
  projectId: "kiwi-beauty-salon",
  storageBucket: "kiwi-beauty-salon.appspot.com",
  messagingSenderId: "174656953142",
  appId: "1:174656953142:web:78ce47fea27e51162af197",
  measurementId: "G-G3NPLF94KS"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const firestore = getFirestore(app)
export const auth = getAuth(app)
export const database = getDatabase(app)
export const googleProvider = new GoogleAuthProvider()
export const facebookProvider = new FacebookAuthProvider()
