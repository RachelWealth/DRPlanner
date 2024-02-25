// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {GoogleAuthProvider, getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRuZ2XEl8XtwTTrlvd3LiiWM8fyHQa4Zo",
  authDomain: "rdplanner-e9882.firebaseapp.com",
  projectId: "rdplanner-e9882",
  storageBucket: "rdplanner-e9882.appspot.com",
  messagingSenderId: "235300130819",
  appId: "1:235300130819:web:7eae9acb251cf4f223fe36",
  measurementId: "G-1P5NRH6M9J"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const auth = getAuth()
export const provider = new GoogleAuthProvider();
export default app;