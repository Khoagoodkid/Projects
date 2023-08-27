import { initializeApp } from "firebase/app";
import {onValue,push,ref,getDatabase} from 'firebase/database'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAqfZoSDivHlfAyrBHChs_3-F65pQWQnas",
  authDomain: "backend-demo-2a49f.firebaseapp.com",
  projectId: "backend-demo-2a49f",
  storageBucket: "backend-demo-2a49f.appspot.com",
  messagingSenderId: "472023518098",
  appId: "1:472023518098:web:0855edbe4bf6fecf588f4b",
  measurementId: "G-WKF7ZE4758"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase(app)
export {database,onValue,push,ref}