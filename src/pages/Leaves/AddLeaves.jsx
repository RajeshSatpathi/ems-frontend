import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useAuth } from "../../mycontext/AuthContext.jsx"
import { useNavigate } from 'react-router-dom';

function AddLeaves() {
    const { userData } = useAuth()
    const navigate = useNavigate()
    // this is for user input for salary from

    const [inputData, setinputData] = useState({
        userId: "",
        leaveType: "",
        FromDate: "",
        ToDate: "",
        Description: ""

    });
    useEffect(() => {
        if (userData._id) {
            setinputData((prev) => ({
                ...prev,
                userId: userData._id
            }))
        }
    }, [userData]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setinputData((prev) => ({
            ...prev,
            [name]: value
        }));
    }
    const handleSubmit = async (e) => {
        e.preventDefault();
        const { leaveType, FromDate, ToDate, Description, userId } = inputData;
        if (!userId) {
            toast("User ID is missing, please re-login");
            return;
        }

        if (!leaveType || !FromDate || !ToDate || !Description) {
            toast("All Fields Are Required");
        } else {

            try {
                const token = localStorage.getItem('token');
                const url = "http://localhost:8000/api/leaves/add";
                const response = await fetch(url, {
                    method: "POST",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify(inputData)
                })
                if (response.ok) {
                    toast("Your Leaves Application Successfully Apply");
                    setTimeout(() => {
                        navigate('/empleaves');
                    }, 1000);

                }
            } catch (error) {
                console.log("error in sending data ", error)
                alert("sending error")
            }
        }

    }


    return (
        <div>

            <div><h2 className='text-lg font-semibold uppercase text-gray-700'> Application For Leaves
            </h2></div><br />
            {/* //main form section  */}
            <div>
                <form action=""
                    onSubmit={handleSubmit}
                    className='bg-gray-100 rounded flex justify-center flex-col items-center p-5'>

                    <div className='flex gap-5'>
                        <div className='flex flex-col lg:w-100 w-full '>
                            <label htmlFor="" className='text-sm'>Leaves Type</label>
                            <select name="leaveType" id=""
                                value={inputData.leaveType}
                                onChange={handleChange}
                                className='p-1.5  bg-gray-100  outline-none
                                 border-gray-300 border-1 rounded'>
                                <option value="">select</option>
                                <option value="Sick Leaves">Sick Leaves</option>
                                <option value="Casual Leaves">Casual Leaves</option>
                                <option value="Annual Leaves">Annual Leaves</option>

                            </select>
                        </div><br />
                        <div className='flex flex-col lg:w-100 w-full '>
                            <label htmlFor="" className='text-sm'>Description</label>
                            <input type="text"
                                name='Description'
                                value={inputData.Description}
                                onChange={handleChange}
                                className='p-1.5  bg-gray-100  outline-none
                                 border-gray-300 border-1 rounded' />
                        </div><br />

                    </div><br />
                    <div className='flex gap-5'>

                        <div className='flex flex-col lg:w-100 w-full '>
                            <label htmlFor="" className='text-sm'>From Date</label>
                            <input type="date"
                                name='FromDate'
                                value={inputData.FromDate}
                                onChange={handleChange}
                                className='p-1.5  bg-gray-100  outline-none
                                 border-gray-300 border-1 rounded' />
                        </div><br />
                        <div className='flex flex-col lg:w-100 w-full'>
                            <label htmlFor="" className='text-sm'>To Date</label>
                            <input type="date"
                                name='ToDate'
                                value={inputData.ToDate}
                                onChange={handleChange}
                                className='p-1.5  bg-gray-100  outline-none
                                 border-gray-300 border-1 rounded' />
                        </div>
                    </div><br />
                    <div className=''>
                        <button className='text-white 
             px-4 flex items-center gap-x-3 
             font-semibold bg-gradient-to-l
              from-[#7f00ff] to-[#e100ff]
               py-2 hover:text-white rounded hover:shadow-lg'>Apply</button>
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
            />
        </div>
    )
}

export default AddLeaves