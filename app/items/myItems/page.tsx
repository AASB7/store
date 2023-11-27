"use client";

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import { useRouter } from "next/navigation";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import Link from "next/link";

function myitems() {
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [userEmail, setUserEmail] = useState("");
  const [items, setItems] = useState([
  ]);
  useEffect(() => {

    if (!loading && !user) {
      router.push("/login");
    } else if (user) {
      setUserEmail(user.email);
      const q = query(collection(db, 'items'));
      const q1 = query(q, where('oner', '==', userEmail));
    const unsubscribe = onSnapshot(q1, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);
      /*itemsArr = itemsArr.filter((item) =>
      item.oner.toLowerCase().includes(userEmail.toLowerCase())
    );
      setItems(itemsArr);*/
    } );

    return () => {
      // Cleanup the subscription when the component unmounts
      unsubscribe();
    };
    }

  }, [user, loading, userEmail]);
  /*useEffect(() => {
    const q = query(collection(db, 'items'));
    //const q1 = query(q, where("oner", "==", {userEmail}));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let itemsArr = [];

      querySnapshot.forEach((doc) => {
        itemsArr.push({ ...doc.data(), id: doc.id });
      });
      setItems(itemsArr);
      itemsArr = itemsArr.filter((item) =>
      item.oner.toLowerCase().includes(userEmail.toLowerCase())
    );
      setItems(itemsArr);
    }
    )
  }, []);*/

  return (
    <>
      {user ? ( <><h1 className="relative m-3 pt-8 flex flex-wrap mx-auto justify-center bg-transparent	md:text-4xl ">You Items List</h1><div className=" bg-gray-100 flex flex-col justify-center">
        <div className=" relative m-3 pt-4 flex flex-wrap mx-auto justify-center ">

          {items.map((item, id) => (
            <div key={id}>
                <div className="mx-auto mt-11  mr-8 w-[300px] transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                  <div>
                    <img className="h-48 w-full object-cover object-center" src={item.ProductImg} alt="Product Image" /></div>
                  <div className="p-4">
                    <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">{item.ProductName}</h2>
                    <p className="md:text-lg text-gray-500 text-base">{item.productDesc}</p>
                    <div className="flex items-center">
                      <p className="mr-2 pt-4 text-lg font-semibold text-gray-900 dark:text-white">{item.ProductPrice} SR</p>
                    </div>
                    <div className="flex flex-col-reverse mb-1 ml-auto group cursor-pointer">
                      <button className="bg-red-600 text-gray-900 w-1/2 mt-4 rounded-lg cursor-pointer border-2 border-red-600 hover:bg-white">Delete</button>
                    </div>
                  </div>
                </div>
       
            </div>
          ))}
        </div>
      </div></>) : (
        <p>Loading...</p>
      )}
    </>


  );

}
export default myitems;

