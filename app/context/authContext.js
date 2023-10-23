
"use client";

import { useContext, createContext, useState, useEffect } from "react";
import {
  signOut,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../firebase";
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const delay = ms => new Promise(
    resolve => setTimeout(resolve, ms)
  );

   function showError(txt) {
    toast.error(txt, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    
  };

   function showMsg (txt) {
    toast.success(txt, {
      position: "top-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
    
  };

  
  const logOut = () => {
    signOut(auth);
  };


  const signup = async (email, password) => {

    try {
      const user2 = await createUserWithEmailAndPassword(auth, email, password);
      setUser(user2.user);
      showMsg("Created Successfully");
      await delay(3000);
    //  window.location.href = "/home"

    } catch (error) {
      if (error.code === "auth/email-already-in-use") {
        showError("email already in use");
      } else {
        alert(error.message);
      }
    }};

  const login = async (email, password) => {
    try {
      const user2 = await signInWithEmailAndPassword(auth, email, password);
      setUser(user2.user);
      showMsg("Login Successful!");
      await delay(3000);
     // window.location.href = "/home"
    } catch (error) {
      //auth/invalid-login-credentials
      showError("Incorrect email or password");
    }
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });
    return () => unsubscribe();
  }, [user]);

  return (
    <AuthContext.Provider value={{ user,  logOut, signup, login }}>
      {children}
    </AuthContext.Provider>
  );
};

export const UserAuth = () => {
  return useContext(AuthContext);
};