// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyArzte7vwg3pV9T8BO2fUKBdNSraYRsgSM",
  authDomain: "quiz-app-5d547.firebaseapp.com",
  projectId: "quiz-app-5d547",
  storageBucket: "quiz-app-5d547.firebasestorage.app",
  messagingSenderId: "199724179376",
  appId: "1:199724179376:web:31969fd1290ed843c18075",
  measurementId: "G-G2B7RBDJRW",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
