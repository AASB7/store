

function Page(){
return(
<div class="flex items-center justify-center p-12  h-screen">
  <div class="mx-auto w-full max-w-[550px]">
  <h2 className="relative flex  items-center justify-center text-[#6A64F1] font-bold text-xl md:text-3xl pb-8">Add Item Form</h2>
  <h2 className="text-gray-500 text-lg md:text-xl pb-4 ">Please fill out the form below to add a new item</h2>
    <form  method="POST">
      <div class="-mx-3 flex flex-wrap">
        
        <div class="w-full px-3 sm:w-1/2">
          <div class="mb-5">
            <label
              for="Name"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Name
            </label>
            <input
              type="text"
              name="Name"
              id="Name"
              placeholder="Name"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
        <div class="w-full px-3 sm:w-1/2">
          <div class="mb-5">
            <label
              for="price"
              class="mb-3 block text-base font-medium text-[#07074D]"
            >
              Price
            </label>
            <input
              type="number"
              name="Price"
              id="Price"
              placeholder="0"
              min="0"
              class="w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
            />
          </div>
        </div>
      </div>
      <div class="mb-5">
        <label
          for="guest"
          class="mb-3 block text-base font-medium text-[#07074D]"
        >
          Description 
        </label>
        <textarea
          type="text"
          name="description"
          id="description"
          placeholder="Write your description.... "
          class="w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md"
        ></textarea>
      </div>

      <div class="mb-8">
          <input type="file" name="file" id="file" class="sr-only" />
          <label
            for="file"
            class="relative flex min-h-[200px] bg-white items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center"
          >
            <div>
              <span class="mb-2 block text-xl font-semibold text-[#07074D]">
                Drop images here
              </span>
              <span class="mb-2 block text-base font-medium text-[#6B7280]">
                Or
              </span>
              <span
                class="inline-flex cursor-pointer rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D] hover:bg-gray-100"
              >
                Browse
              </span>
            </div>
          </label>
        </div>


      
      <div>
        <button
          class="hover:shadow-form rounded-md bg-[#6A64F1] hover:bg-[#736cf8] py-3 px-8 text-center text-base font-semibold text-white outline-none"
        >
          Add
        </button>
      </div>
    </form>
  </div>
</div>


)

}

export default Page;