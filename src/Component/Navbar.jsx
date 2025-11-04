import React, { useState } from 'react'
import { FaCircleUser } from "react-icons/fa6";
import { useAuth } from '../mycontext/AuthContext';
function Navbar() {
    const { userData, logout } = useAuth()
    const [popup, setpopup] = useState(false);

    return (
        <div className='lg:w-[97%] w-[90%] lg:mx-3  flex justify-between
         items-center p-4 rounded-lg  shadow-lg bg-gray-100 h-15'>
            <div className='w-60 '>
                <input type="text"
                    placeholder='search'
                    className='w-full 
                    bg-gray-200
                    rounded 
                    p-1.5'/>
            </div>
            <div className='flex gap-5'>
                <span className='text-gray-600 hidden'>Hello, {userData?.name} </span>
                <img
                    src={`http://localhost:8000/Public/uploads/${userData?.image}`}
                    alt="Profile"
                    className="cursor-pointer w-10 h-10 rounded-full border border-gray-300 object-cover mx-3"
                    onClick={() => setpopup(!popup)} // 👈 Toggle popup
                />
                {
                    popup ? (<div className='bg-gray-100 rounded w-30 border-1 border-gray-300
                     px-3 py-2 absolute right-8 top-12 flex flex-col items-center justify-center'>
                        <h2 className='text-sm'>{userData?.name}</h2>
                        <span className='font-semibold text-sm text-red-400'>({userData?.role})</span> 
                        <button onClick={logout} className='bg-gray-200 text-sm border my-2 border-gray-300
                         p-1 rounded'>logout</button>
                    </div>) : ""
                }

            </div>
        </div>
    )
}

export default Navbar