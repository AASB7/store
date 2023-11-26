"use client"
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../../firebase";

function view({ searchParams }: {
  searchParams: {
    name: string;
    img: string;
    price: string;
    desc: string;
		owner: string;
  }
}){
	const [user] = useAuthState(auth);
  return (
      <div className="flex flex-col justify-center h-screen bg-gray-100">
	<div
		className="relative flex flex-col md:flex-row md:space-x-5 space-y-3 md:space-y-0 rounded-xl shadow-lg p-3 max-w-xs md:max-w-3xl mx-auto border border-white bg-white">
		<div className="w-full md:w-1/3 bg-white grid place-items-center">
			<img src={searchParams.img} alt="tailwind logo" className="rounded-xl" />
    </div>
			<div className="w-full md:w-2/3 bg-white flex flex-col space-y-2 p-3">
				<div className="flex justify-between item-center">
					<p className="text-gray-500 font-medium hidden md:block"> </p>
					
					<div className="">
						<svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-pink-500" viewBox="0 0 20 20"
							fill="currentColor">
							<path fill-rule="evenodd"
								d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z"
								clip-rule="evenodd" />
						</svg>
					</div>
				</div>
				<h3 className="font-black text-gray-800 md:text-3xl text-xl">{searchParams.name}</h3>
				<p className="md:text-lg text-gray-500 text-base">{searchParams.desc}</p>
				<p className="text-xl font-black text-gray-800">
				{searchParams.price}
					<span className="font-normal text-gray-600 text-base"> SR </span>
				</p>
				{user ? (
                <p className="font-normal text-green-600 text-base pt-4">The owner's contact information:  {searchParams.owner}</p>
            ) : (
                <p className="font-normal text-red-600 text-base pt-4">Please login to find out the owner's contact information</p>
            )}
			</div>
		</div>
	</div>

  );

}

export default view;