
import React from "react";

function footer(){
   return (
    <>
<div class=" w-screen pt-40">

	<footer class="p-4 bg-[#59598f] rounded-lg shadow md:px-6 md:py-8 dark:bg-gray-800">
		<div class="sm:flex sm:items-center sm:justify-between">
			<a href="#" target="_blank" class="flex items-center mb-4 sm:mb-0">
				<span class="self-center text-xl font-semibold whitespace-nowrap text-white">Store</span>
			</a>
			<ul class="flex flex-wrap items-center mb-6 sm:mb-0">
      
				<li>
					<a href="/" class="mr-4 text-sm text-gray-500 hover:underline md:mr-6 text-gray-400">Products</a>
				</li>
        <li>
					<a href="#" class="text-sm mr-4 text-gray-500 hover:underline text-gray-400">About</a>
				</li>
				<li>
					<a href="#" class="text-sm text-gray-500 hover:underline text-gray-400">Contact</a>
				</li>
			</ul>
		</div>
		<hr class="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
		<span class="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="/" target="_blank" class="hover:underline">Store™</a>. All Rights Reserved.
    </span>
	</footer>
</div>
    
    
    </>
   )


}

export default footer; 