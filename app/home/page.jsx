"use client";
// components/UserInfo.js
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase";

function UserInfo() {
    const [user, loading, error] = useAuthState(auth);
    const [userEmail, setUserEmail] = useState("");

    useEffect(() => {
        if (user) {
            setUserEmail(user.email);
        }
    }, [user]);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }

    return (
        <div>
            {user ? (
                <p>Welcome, {userEmail}!</p>
            ) : (
                <p>You are not logged in.</p>
            )}
        </div>
    );
}

export default UserInfo;
