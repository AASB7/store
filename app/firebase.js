// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBsJHbsfeIPnVmgsdFqA0s5M5NoaUXq1fU",
    authDomain: "huaduf-store.firebaseapp.com",
    projectId: "huaduf-store",
    storageBucket: "huaduf-store.appspot.com",
    messagingSenderId: "151275543917",
    appId: "1:151275543917:web:9ba9072ce445df15950e64",
    measurementId: "G-LGVFN8KXK3"
  };

  
// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);