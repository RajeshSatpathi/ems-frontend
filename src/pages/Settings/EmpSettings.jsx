import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "../../mycontext/AuthContext.jsx"
import { useNavigate } from 'react-router-dom';
function EmpSettings() {
    const { userData } = useAuth()

    const [inputData, setinputData] = useState({
        userId: userData?._id,
        oldPassword: "",
        newPassword: ""
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setinputData((prev) => ({
            ...prev,
            [name]: value
        }))
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!inputData.oldPassword || !inputData.newPassword) {
            toast("Please Fill all fields..")
        } else {
            try {
                const url = "https://ems-backend-xjj3.vercel.app/department/addDepartment";
                const token = localStorage.getItem("token")
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(inputData)

                });
                if (response.ok) {
                    toast("Password Changes successfully!");
           


                } else {
                    const err = await response.json();
                    toast.error(err.message || "Failed to change Password.");
                }
            } catch (error) {
                toast.error("Something went wrong. Please try again later.");
                console.error(error);
            }
        }

    }
    return (
        <div>
            <div><h2 className='text-lg font-semibold uppercase text-gray-700'>
                Profile Settings</h2></div><br />
            {/* //main form section  */}

            <div>
                <form action="" onSubmit={handleSubmit} className='bg-gray-100 
               rounded flex justify-center  flex-col items-center p-5'>

                    <div className=''>
                        <div className='flex flex-col lg:w-100 w-full '>
                            <label htmlFor="" className='text-sm'>Old Password</label>
                            <input type="text" className='p-1.5  bg-gray-100
                              outline-none border-gray-300 border-1 rounded'
                                name='oldPassword'
                                value={inputData.oldPassword}
                                onChange={handleChange}
                            />
                        </div><br />
                        <div className='flex flex-col lg:w-100 w-full'>
                            <label htmlFor="" className='text-sm'>New Password</label>
                            <input type="text" className='p-1.5 bg-gray-100  outline-none
                             border-gray-300 border-1 rounded'
                                name='newPassword'
                                value={inputData.newPassword}
                                onChange={handleChange}
                            />
                        </div>
                    </div><br />
                    <div className=''>
                        <button className='text-white 
                      px-4 flex items-center gap-x-3 
                      font-semibold bg-gradient-to-l
                       from-[#7f00ff] to-[#e100ff]
                        py-2 hover:text-white rounded hover:shadow-lg'>
                            Chanage Password</button>
                    </div>
                </form>
            </div>
            <ToastContainer
                position="top-right"
                autoClose={2000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="dark"
            // transition={Bounce}
            />
        </div>
    )
}

export default EmpSettings