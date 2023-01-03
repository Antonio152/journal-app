// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore/lite";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAnHlg4nbeWLxMqq-OausxRSDFwZVz27u4",
  authDomain: "react-course-153e7.firebaseapp.com",
  projectId: "react-course-153e7",
  storageBucket: "react-course-153e7.appspot.com",
  messagingSenderId: "962830443980",
  appId: "1:962830443980:web:c10f30b032ccdcc99ae969"
};

// Initialize Firebase
export const FirebaseApp = initializeApp(firebaseConfig);
export const FirebaseAuth = getAuth(FirebaseApp);
export const FirebaseDB = getFirestore(FirebaseApp);