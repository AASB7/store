"use client"
import { AuthContextProvider } from "./context/authContext";
import { auth } from "./firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import Link from "next/link";
import Avatar from "../assets/EmptyAvatar.jpg";
import { useState } from 'react';
import Image from "next/image";

function Navbar() {
    const [showUserEmail, setShowUserEmail] = useState(false);
    const [user] = useAuthState(auth);
    const navItems = user
    ? [
          {
              text: "Profile",
              link: "/profile",
          },
          {
              text: "Add Item",
              link: "/items/addItem",
          },
          {
            text: "My Items",
            link: "/items/myItems",
        },
          {
              text: "Logout",
              onClick: handleLogout,
          },
      ]
    : [
          {
              text: "Login",
              link: "/login",
          },
          {
              text: "Signup",
              link: "/signup",
          },
      ];
  
  function handleLogout() {
    auth.signOut();
  }
  return(
    <nav className='flex justify-between items-center bg-[#59598f] text-white p-4'>
    <h3 className='text-2xl'>Store</h3>
    <div className='relative'>
        <Image
            src={Avatar}
            alt='User Profile'
            className='w-10 h-10 rounded-full cursor-pointer'
            onClick={() => setShowUserEmail(!showUserEmail)}
        />
        {showUserEmail && (
            <div className='w-[15em] absolute top-0 right-0 mt-12 p-2 bg-[#EEE]  rounded shadow text-black text-center  '>
                {user && <span>{user.email}</span>}
                <ul>
                    {navItems.map((item, index) => (
                        <li key={index}>
                            {item.onClick ? (
                                <a
                                    onClick={item.onClick}
                                    className='hover:text-teal-700 cursor-pointer'
                                >
                                    {item.text}
                                </a>
                            ) : (
                                <Link
                                    legacyBehavior
                                    href={item.link}
                                    passHref
                                >
                                    <a className='hover:text-teal-700'>
                                        {item.text}
                                    </a>
                                </Link>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        )}
    </div>
</nav>
  )    
}
export default Navbar