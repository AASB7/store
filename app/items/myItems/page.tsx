"use client";

import React, { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";
import { db } from "../../firebase";
import { useRouter } from "next/navigation";
import {
  collection, onSnapshot, query, where, deleteDoc,
  doc,
} from "firebase/firestore";
import { ToastContainer, toast } from "react-toastify";

function myitems() {
  const [showSpinner, setShowSpinner] = useState(true);
  const router = useRouter();
  const [user, loading] = useAuthState(auth);
  const [userEmail, setUserEmail] = useState("");
  const [header, setheader] = useState("");
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
      }

      );

      if (items.length == 0) {
        setheader("You don't have any products");
      } else {
        setheader("Your Products");
      }

      return () => {
        unsubscribe();
      };
    }

  }, [user, loading, userEmail, header, items]);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setShowSpinner(false);
    }, 2000);

    return () => clearTimeout(timeoutId);
  }, [showSpinner]);
  function showMsg(txt) {
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
  const deletProduct = async (id) => {
    const isConfirmed = window.confirm("Are you sure you want to delete?");

    if (isConfirmed) {
      showMsg("Deleted Successfully");
      await deleteDoc(doc(db, 'items', id));
    }

  }




  return (
    <>
      {showSpinner ? (<div className="text-center flex flex-wrap mx-auto justify-center pt-8 ">
        <div>
          <svg aria-hidden="true" className="inline w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
            <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
      ) : (
        <>
          {user ? (<>
            <h1 className="relative m-3 pt-8 flex flex-wrap mx-auto justify-center bg-transparent	md:text-4xl ">{header}</h1><div className=" bg-gray-100 flex flex-col justify-center">
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
                          <button className="bg-red-600 text-gray-900 w-1/2 mt-4 rounded-lg cursor-pointer border-2 border-red-600 hover:bg-white" onClick={() => deletProduct(item.id)} >Delete</button>
                        </div>
                      </div>
                    </div>

                  </div>
                ))}
              </div>
            </div></>) : (
            <p>Loading...</p>
          )}
        </>)}
      <ToastContainer />
    </>
  );

}
export default myitems;

