"use client";
import { useState, useEffect } from "react";
import { db, storage, auth } from "../../firebase";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import { useRouter } from "next/navigation";
import { collection, addDoc } from "firebase/firestore";
import { useAuthState } from "react-firebase-hooks/auth";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function Page() {
    const router = useRouter();
    const [user, loading] = useAuthState(auth);
    const [userEmail, setUserEmail] = useState("");
    const [productName, setProductName] = useState("");
    const [productDesc, setProductDesc] = useState("");
    const [productPrice, setProductPrice] = useState(0);
    const [productImg, setProductImg] = useState(null);
    const [error, setError] = useState("");
    const types = ["image/png", "image/jpeg"]; // image types

    useEffect(() => {
        // If the user is not authenticated, redirect to the login page
        if (!loading && !user) {
            router.push("/login"); // Replace '/login' with the actual path to your login page
        }
    }, [user, loading]);

    useEffect(() => {
        if (user) {
            setUserEmail(user.email);
        }
    }, [user]);



    const productImgHandler = (e) => {
        let selectedFile = e.target.files[0];
        if (selectedFile && types.includes(selectedFile.type)) {
            setProductImg(selectedFile);
            setError("");
        } else {
            setProductImg(null);
            setError("Please select a valid image type (jpg or png)");
        }
    };
    const addProduct = async (e) => {
        e.preventDefault();

        const storageRef = ref(storage, `product-images/${productImg.name}`);
        const uploadTask = uploadBytesResumable(storageRef, productImg);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                const progress =
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                console.log(progress);
            },
            (err) => setError(err.message),
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((url) => {
                    addDoc(collection(db, "items"), {
                        ProductName: productName,
                        ProductPrice: Number(productPrice),
                        productDesc: productDesc,
                        ProductImg: url,
                        oner: userEmail,
                    })
                        .then(() => {
                            setProductName("");
                            setProductPrice(0);
                            setProductDesc("");
                            setProductImg(null);
                            setError("");
                            document.getElementById("file").value = "";

                            toast.success("Item uploaded successfully");
                        })
                        .catch((err) => {
                            setError(err.message);
                            toast.error("Error adding item to the database");
                        });
                });
            },
        );
    };
    return (
        <>
            <ToastContainer
                position='top-center'
                autoClose={3000}
                hideProgressBar
            />
            <div class='flex items-center justify-center p-12  h-screen'>
                {user ? (
                    <div class='mx-auto w-full max-w-[550px]'>
                        <h2 className='relative flex  items-center justify-center text-[#6A64F1] font-bold text-xl md:text-3xl pb-8'>
                            Add Item Form
                        </h2>
                        <h2 className='text-gray-500 text-lg md:text-xl pb-4 '>
                            Please fill out the form below to add a new item
                        </h2>
                        <form onSubmit={addProduct}>
                            <div class='-mx-3 flex flex-wrap'>
                                <div class='w-full px-3 sm:w-1/2'>
                                    <div class='mb-5'>
                                        <label
                                            for='Name'
                                            class='mb-3 block text-base font-medium text-[#07074D]'
                                        >
                                            Name
                                        </label>
                                        <input
                                            type='text'
                                            name='Name'
                                            id='Name'
                                            placeholder='Name'
                                            class='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
                                            onChange={(e) =>
                                                setProductName(e.target.value)
                                            }
                                            value={productName}
                                        />
                                    </div>
                                </div>
                                <div class='w-full px-3 sm:w-1/2'>
                                    <div class='mb-5'>
                                        <label
                                            for='price'
                                            class='mb-3 block text-base font-medium text-[#07074D]'
                                        >
                                            Price
                                        </label>
                                        <input
                                            type='number'
                                            name='Price'
                                            id='Price'
                                            placeholder='0'
                                            min='0'
                                            class='w-full rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
                                            onChange={(e) =>
                                                setProductPrice(e.target.value)
                                            }
                                            value={productPrice}
                                        />
                                    </div>
                                </div>
                            </div>
                            <div class='mb-5'>
                                <label
                                    for='guest'
                                    class='mb-3 block text-base font-medium text-[#07074D]'
                                >
                                    Description
                                </label>
                                <textarea
                                    type='text'
                                    name='description'
                                    id='description'
                                    placeholder='Write your description.... '
                                    class='w-full appearance-none rounded-md border border-[#e0e0e0] bg-white py-3 px-6 text-base font-medium text-[#6B7280] outline-none focus:border-[#6A64F1] focus:shadow-md'
                                    onChange={(e) =>
                                        setProductDesc(e.target.value)
                                    }
                                    value={productDesc}
                                ></textarea>
                            </div>

                            <div class='mb-8'>
                                <input
                                    type='file'
                                    name='file'
                                    id='file'
                                    class='sr-only'
                                    onChange={productImgHandler}
                                />
                                <label
                                    for='file'
                                    class='relative flex min-h-[200px] bg-white items-center justify-center rounded-md border border-dashed border-[#e0e0e0] p-12 text-center'
                                >
                                    <div>
                                        <span class='mb-2 block text-xl font-semibold text-[#07074D]'>
                                            Drop images here
                                        </span>
                                        <span class='mb-2 block text-base font-medium text-[#6B7280]'>
                                            Or
                                        </span>
                                        <span class='inline-flex cursor-pointer rounded border border-[#e0e0e0] py-2 px-7 text-base font-medium text-[#07074D] hover:bg-gray-100'>
                                            Browse
                                        </span>
                                    </div>
                                </label>
                            </div>

                            <div>
                                <button
                                    type='submit'
                                    class='hover:shadow-form rounded-md bg-[#6A64F1] hover:bg-[#736cf8] py-3 px-8 text-center text-base font-semibold text-white outline-none'
                                >
                                    Add
                                </button>
                            </div>
                        </form>
                        {error && <span className='error-msg'>{error}</span>}
                    </div>
                ) : (
                    // You can customize the message or redirect to the login page
                    <p>Loading...</p>
                )}
            </div>
        </>
    );
}

export default Page;
