"use client";
import  { useState } from "react";
import { UserAuth } from "../../context/authContext";
import { ToastContainer } from 'react-toastify';
import { auth } from "../../firebase";
import { sendEmailVerification } from 'firebase/auth';

// 

function Signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null);
  const  { signup }  = UserAuth();

  function isValidEmail(email) {
    return /\S+@\S+\.\S+/.test(email);
}
  const handleSignup = async (e) => {
    e.preventDefault();
    if (!isValidEmail(email)) {
        setError("Email is invalid");
    } else if (password.length < 6) {
        setError("Password length should be greater than 6 characters");
    } else {
        try {
            await signup(email, password);
            sendEmailVerification(auth.currentUser)
            .then(() => {
              // Email verification sent!
              console.log('Email verification sent!');
             
            })
            .catch((error) => {
              // Handle the error
              console.error('Error sending email verification:', error.message);
            });
            

        } catch (error) {
               
                alert(error.message);
              
        }
    }
};
  return(

    <div class="Pt-20 grid place-items-center mx-2 my-20 sm:my-auto h-screen">

      <div class="w-11/12 p-12 sm:w-8/12 md:w-6/12 lg:w-5/12 2xl:w-4/12 
    px-6 py-10 sm:px-10 sm:py-6 
    bg-white rounded-lg shadow-md lg:shadow-lg">

        <h2 class="text-center font-semibold text-3xl lg:text-4xl text-gray-800">
          Signup
        </h2>

        <form class="mt-10" onSubmit={handleSignup} >
          
          <label for="email" class="block text-xs font-semibold text-gray-600 uppercase">E-mail</label>
          <input id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email" name="email" placeholder="e-mail address" autocomplete="email"
            class="block w-full py-3 px-1 mt-2 
            text-gray-800 appearance-none 
            border-b-2 border-gray-100
            focus:text-gray-500 focus:outline-none focus:border-gray-200"
            required />
          
          <label for="password" class="block mt-2 text-xs font-semibold text-gray-600 uppercase">Password</label>
          <input id="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password" name="password" placeholder="password" autocomplete="current-password"
            class="block w-full py-3 px-1 mt-2 mb-4
            text-gray-800 appearance-none 
            border-b-2 border-gray-100
            focus:text-gray-500 focus:outline-none focus:border-gray-200"
            required />
           <label class="block mt-2 text-xs font-semibold text-red-600 uppercase"> {error} </label>
          <button type="submit"
            class="w-full py-3 mt-10 bg-purple-500 rounded-lg 
            font-medium text-white uppercase
            border-2 border-purple-500
            focus:outline-none hover:bg-transparent hover:shadow-none hover:text-purple-500">
            Signup
          </button>
        
        </form>

        <div className="grid justify-items-center pt-4 ">
                  <h4 className="flex flex-inline">Have an account <span className="text-purple-900 pl-4"><a href="/login">Login</a></span></h4>
                </div>
      </div>
      <ToastContainer />
    </div>




  )
}

export default Signup;