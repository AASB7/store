"use client";

import { useEffect, useState } from "react";
import {
    collection,
    query,
    onSnapshot,
} from 'firebase/firestore';
import { db } from "../firebase";
import React from "react";
import Link from "next/link";

function UserInfo() {
    const [items, setItems] = useState([
    ]);
    const [filter, setFilter] = useState('');
    const [sortOrder, setSortOrder] = useState(''); // Added state for sorting order
    useEffect(() => {
        const q = query(collection(db, 'items'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            let itemsArr = [];
        
            querySnapshot.forEach((doc) => {
                itemsArr.push({ ...doc.data(), id: doc.id });
            });
            // Filter Function
            if (filter) {
                itemsArr = itemsArr.filter((item) =>
                  item.ProductName.toLowerCase().includes(filter.toLowerCase())
                );
              }
            setItems(itemsArr);
            // Sorting based on price
            if (sortOrder === 'highToLow') {
                itemsArr.sort((a, b) => b.ProductPrice - a.ProductPrice);
            } else if (sortOrder === 'lowToHigh') {
                itemsArr.sort((a, b) => a.ProductPrice - b.ProductPrice);
            }
            setItems(itemsArr);
        });     
    }, [filter, sortOrder]);
    return (
           <>
            {/**   {user ? (
                <p>Welcome, {userEmail}!</p>
            ) : (
                <p>You are not logged in.</p>
            )} */}
                <h1 className="relative m-3 flex flex-wrap mx-auto justify-center bg-transparent	md:text-4xl ">Products List</h1>
                <input
                    type="text"
                    placeholder="Filter by product name"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                    className="w-10/12 p-2 ml-[100px] border rounded-md mb-5 "
                />
                    {/* Dropdown for sorting order */}
                <select
                    value={sortOrder}
                    onChange={(e) => setSortOrder(e.target.value)}
                    className="p-2 border rounded-md ml-[120px]"
                >
                    <option value="">Sort by Price</option>
                    <option value="highToLow">High to Low</option>
                    <option value="lowToHigh">Low to High</option>
                </select>
 
            <div className=" bg-gray-100 flex flex-col justify-center">
                <div className=" bg-gray-100 relative m-3 flex flex-wrap mx-auto justify-center ">
                    {/* if there's no items display ( <h2>There's no item</h2> ) */}
                      { items.length === 0 && filter && <h2>There's no item</h2>}
                      {items.map((item, id) => (
                        <div key={id} >
                            <Link href={{pathname: "items/view",
                        query: {
                           name: item.ProductName,
                           img: item.ProductImg,
                           price: item.ProductPrice,
                           desc: item.productDesc,
                           owner: item.oner,
                        },
                    }}
                        >
                            <div className="mx-auto mt-11  mr-8 w-[300px] transform overflow-hidden rounded-lg bg-white dark:bg-slate-800 shadow-md duration-300 hover:scale-105 hover:shadow-lg">
                                <div>
                                    <img className="h-48 w-full object-cover object-center" src={item.ProductImg} alt="Product Image" /></div>
                                <div className="p-4">
                                    <h2 className="mb-2 text-lg font-medium dark:text-white text-gray-900">{item.ProductName}</h2>
                                    <div className="flex items-center">
                                        <p className="mr-2 text-lg font-semibold text-gray-900 dark:text-white">{item.ProductPrice} SR</p>
                                    </div>
                                    <div className="flex flex-col-reverse mb-1 ml-auto group cursor-pointer">
                                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 group-hover:opacity-70" fill="none" viewBox="0 0 24 24" stroke="gray">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />       
                                        </svg>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        </div>
                    ))}
                    </div>
            </div>
        </>
    );
}
export default UserInfo;
