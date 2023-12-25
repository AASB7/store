"use client"
import React, { useState } from 'react';
import { auth } from "../firebase";
import { updateEmail, sendEmailVerification, verifyBeforeUpdateEmail } from 'firebase/auth';


const EditProfile = () => {
  const [newEmail, setNewEmail] = useState('');
  
const handleUpdateEmail = async () => {
    const user = auth.currentUser;

  // Update the email first
  updateEmail(user, newEmail)
    .then(() => {
      // After successfully updating the email, check if the email is verified
      if (!user.emailVerified) {
        // If not verified, send a verification email
        return sendEmailVerification(user);
      } else {
        // Email is already verified, no need to send another verification email
        return Promise.resolve();
      }
    })
    .then(() => {
      // Email update and verification (if needed) completed successfully!
      console.log('Email updated successfully!');
      if (!user.emailVerified) {
        console.log('Verification email sent.');
      }
    })
    .catch((error) => {
      // An error occurred during the process
      console.error('Error updating email or sending verification email:', error.message);
    });
  }

  return (
    <div>
      <h1>Edit Profile</h1>
      <label>New Email:</label>
      <input
        type="email"
        value={newEmail}
        onChange={(e) => setNewEmail(e.target.value)}
      />
      <button onClick={handleUpdateEmail}>
        Update Email
      </button>
    </div>
  );
};

export default EditProfile;