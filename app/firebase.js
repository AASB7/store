// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// https://firebase.google.com/docs/web/setup#available-libraries
import { getAuth } from "firebase/auth";
import { getStorage } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBsJHbsfeIPnVmgsdFqA0s5M5NoaUXq1fU",
    authDomain: "huaduf-store.firebaseapp.com",
    projectId: "huaduf-store",
    storageBucket: "huaduf-store.appspot.com",
    messagingSenderId: "151275543917",
    appId: "1:151275543917:web:9ba9072ce445df15950e64",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);  
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
