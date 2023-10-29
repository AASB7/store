"use client"

import Image from 'next/image';
import { auth } from './firebase';
import React, { useState } from 'react';
import Avatar from "../assets/EmptyAvatar.jpg"
export default function Home() {
  const [showUserEmail, setShowUserEmail] = useState(false);
  const [navItems] = useState([{
    text:"Profile",
    link:"/profile"

  },{

    text:"Add Item",
    link:"items/addItem"
  },{
    text:"Logout",
    link:"/login"
  }
])
  return (
    <>
        <nav className="flex justify-between items-center bg-[#59598f] text-white p-4">
      <h3 className="text-2xl">Store</h3>
      <div className="relative">
        <Image
          src={Avatar}
          alt="User Profile"
          className="w-10 h-10 rounded-full cursor-pointer"
          onClick={() => setShowUserEmail(!showUserEmail)}
        />
        {showUserEmail  && (
          <div className="w-[15em] absolute top-0 right-0 mt-12 p-2 bg-[#EEE]  rounded shadow text-black text-center  ">
            {/* Display the user's email here */}
            <span>example@example.com</span>
            <br/>
            <ul>
            {navItems.map((item, index) => (
              <li key={index}>
                <a className='hover:text-teal-700	' href={item.link}>{item.text}</a>
              </li>
            ))}
          </ul>
          </div>
        )}
      </div>
    </nav>
 
    </>
  )
}
