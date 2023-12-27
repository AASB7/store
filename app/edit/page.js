"use client"
import React, { useState } from 'react';
import { auth } from '../firebase'; // Assuming your firebase.js exports 'auth'
import { EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';
import { verifyBeforeUpdateEmail, sendEmailVerification,fetchSignInMethodsForEmail } from 'firebase/auth';
const EditProfile = () => {
  const [newEmail, setNewEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleUpdateEmail = async () => {
    const user = auth.currentUser;
    const credential = EmailAuthProvider.credential(user.email, password);
  
    try {
      // Check if the new email is already associated with an account
      const emailInUse = await auth.fetchSignInMethodsForEmail(newEmail);

      if (emailInUse.length > 0) {
        // Email is already used by another account
        console.error('Email is already in use by another account.');
        // You can show a message to the user here
        return;
      }
    

      // Reauthenticate the user
      await reauthenticateWithCredential(user, credential);
  
      // Update the email
      await verifyBeforeUpdateEmail(user, newEmail);
  
      // Set emailVerified to true
      await user.reload();
      await user.getIdToken(true);
      user.emailVerified = true;
  
      // After successfully updating the email, check if the email is verified
      if (!user.emailVerified) {
        // If not verified, send a verification email
        await sendEmailVerification(user);
        alert('Verification email sent');
      }
  
      // Email update and verification (if needed) completed successfully!
      alert('Email updated successfully!');
    } catch (error) {
      // An error occurred during the process
      alert(error.message);
    }
  };


    
  

  return (
    <div class="max-w-md mx-auto p-4 bg-white shadow-md rounded-md mt-7">
      
      <h1 class="text-2xl font-semibold mb-4">Edit Profile</h1>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-600">New Email:</label>
        <input
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          type="email"
          value={newEmail}
          onChange={(e) => setNewEmail(e.target.value)}
        />
      </div>

      <div class="mb-4">
        <label class="block text-sm font-medium text-gray-600">Password:</label>
        <input
          class="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </div>

      <button
        class="w-full bg-violet-800 text-white py-2 rounded-md hover:bg-violet-900 focus:outline-none focus:bg-blue-600"
        onClick={handleUpdateEmail}
      >
        Update Email
      </button>
    </div>

  );
};

export default EditProfile;