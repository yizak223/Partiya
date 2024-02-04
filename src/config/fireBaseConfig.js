// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCbm8xpF11Xqm6dJCBqgBt1CzHQe7qprv4",
  authDomain: "partiya-183db.firebaseapp.com",
  projectId: "partiya-183db",
  storageBucket: "partiya-183db.appspot.com",
  messagingSenderId: "981838880922",
  appId: "1:981838880922:web:7d193d7b4b7d850541ff23",
  measurementId: "G-DB2K2L9H5G"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const dB = getFirestore(app);
const auth = getAuth(app)

export { dB, auth };