// Initialize Firebase

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: "codeverse-6cf8e.firebaseapp.com",
  projectId: "codeverse-6cf8e",
  storageBucket: "codeverse-6cf8e.appspot.com",
  messagingSenderId: "767983785548",
  appId: "1:767983785548:web:5dff0e9ac3459bded0c6e9",
  measurementId: "G-TF4VY20EZ4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
export const storage = getStorage(app);
