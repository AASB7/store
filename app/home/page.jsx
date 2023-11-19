"use client";

import { useEffect, useState } from "react";
import {
    collection,
    query,
    onSnapshot,
} from 'firebase/firestore';
import { db } from "../firebase";

function UserInfo() {
  //  const [user, loading, error] = useAuthState(auth);
   // const [userEmail, setUserEmail] = useState("");
    const [items, setItems] = useState([
    ]);
   /* useEffect(() => {
        if (user) {
            setUserEmail(user.email);
        }
    }, [user]);*/

    useEffect(() => {
        const q = query(collection(db, 'items'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let itemsArr = [];

            querySnapshot.forEach((doc) => {
                itemsArr.push({ ...doc.data(), id: doc.id });
            });
            setItems(itemsArr);
        });
    }, []);


    /*if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>Error: {error.message}</p>;
    }*/

    return (
        <>
            {/**   {user ? (
                <p>Welcome, {userEmail}!</p>
            ) : (
                <p>You are not logged in.</p>
            )} */}

            <div class="min-h-screen bg-gray-100 flex flex-col justify-center">
                <h1 class="relative m-3 flex flex-wrap mx-auto justify-center md:text-4xl">Products List</h1>
                <div class="relative m-3 flex flex-wrap mx-auto justify-center ">
                    {items.map((item, id) => (
                        <div key={id}>
                            <div class="mx-auto mt-11 mr-8 w-[300px] transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                                <div>
                                    <img class="h-48 w-full object-cover object-center" src={item.ProductImg} alt="Product Image" /></div>
                                <div class="p-4">
                                    <h2 class="mb-2 text-lg font-medium dark:text-white text-gray-900">{item.ProductName}</h2>
                                    <div class="flex items-center">
                                        <p class="mr-2 text-lg font-semibold text-gray-900 dark:text-white">{item.ProductPrice} SR</p>
                                    </div>
                                    <div class="flex flex-col-reverse mb-1 ml-auto group cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 group-hover:opacity-70" fill="none" viewBox="0 0 24 24" stroke="gray">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>


                        </div>
                    ))}</div>
            </div>
        </>
    );
}

export default UserInfo;
