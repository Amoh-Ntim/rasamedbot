// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDRXCB-b65HnA2GmeHjJSgIk8EX7Aqit5w",
  authDomain: "medbot-2aa2d.firebaseapp.com",
  projectId: "medbot-2aa2d",
  storageBucket: "medbot-2aa2d.appspot.com",
  messagingSenderId: "869627873464",
  appId: "1:869627873464:web:7dfcd5a2c3cb09c3ef0c4d",
  measurementId: "G-0D00QCNKKZ"
};

// if (!firebase.apps.length) {
//     firebase.initializeApp(firebaseConfig);
//   }

// export default firebase;
// Initialize Firebase
export const FIREBASE_APP = initializeApp(firebaseConfig);
// export const analytics = getAnalytics(app);

// const FIREBASE_APP = initializeApp(firebaseConfig);
export const FIREBASE_AUTH = getAuth(FIREBASE_APP);