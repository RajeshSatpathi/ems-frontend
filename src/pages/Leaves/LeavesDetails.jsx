import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'



function leavesDetails() {

    const { id } = useParams()

    const [leavesData, setleavesData] = useState([]);


    useEffect(() => {
        const fetchLeaves = async () => {
            try {
                const token = localStorage.getItem("token")
                const response = await fetch(`http://localhost:8000/api/leaves/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch leaves");
                }
                const data = await response.json();
                if (data) {
                    setleavesData(data.leaves);
                }
            } catch (error) {
                console.error("Error fetching leaves:", error);
            }
        }
        fetchLeaves()
    }, []);

    // const AcceptLeave = async () => {

    // }
    //   const RejectLeave = async () => {

    // }

    return (
        <div>
            <h2 className='text-md font-semibold text-gray-600'>My Profile Details</h2><br />
            <div className='bg-gray-100 rounded w-full flex flex-col items-center justify-center p-3'>

                <div className='w-30 h-30  my-2 rounded-full'>
                    <img src={`http://localhost:8000/Public/uploads/${leavesData.employeeId?.userId.image}`} alt="" />
                </div>
                <div className='flex gap-6 flex-wrap '>
                    <div className='flex flex-col lg:w-70 w-full '>
                        <label htmlFor="" className='text-sm'>Name</label>
                        <input type="text" readOnly className='p-1.5  bg-gray-200 
            outline-none border-gray-300 border-1 rounded' value={leavesData?.employeeId?.userId.name} />
                    </div>
                    <div className='flex flex-col lg:w-70 w-full'>
                        <label htmlFor="" className='text-sm'>EMP ID</label>
                        <input type="email" readOnly className='p-1.5 bg-gray-200  
            outline-none border-gray-300 border-1 rounded'
                            value={leavesData.employeeId?.employeeId}
                        />
                    </div>
                </div><br />

                <div className='flex gap-6 flex-wrap'>
                    <div className='flex flex-col lg:w-70 w-full'>
                        <label htmlFor="" className='text-sm'>Leave Type</label>
                        <input type="text" readOnly className='p-1.5 bg-gray-200  
             outline-none border-gray-300 border-1 rounded'
                            value={leavesData.leaveType}
                        />
                    </div>
                    <div className='flex flex-col lg:w-70 w-full'>
                        <label htmlFor="" className='text-sm'>Description</label>
                        <input type="text" readOnly className='p-1.5 bg-gray-200  
            outline-none border-gray-300 border-1 rounded' value={leavesData?.Description} />
                    </div>
                </div><br />

                <div className='flex gap-6 flex-wrap'>
                    <div className='flex flex-col lg:w-70 w-full'>
                        <label htmlFor="" className='text-sm'>Department</label>
                        <input type="text" readOnly className='p-1.5 bg-gray-200   
            outline-none border-gray-300 border-1 rounded'
                            value={leavesData?.employeeId?.department.deptName}
                        />

                    </div>

                    <div className='flex flex-col lg:w-70 w-full'>
                        <label htmlFor="" className='text-sm'>Start Date</label>
                        <input type="text" readOnly className='p-1.5 bg-gray-200  
             outline-none border-gray-300 border-1 rounded'
                            value={new Date(leavesData?.FromDate).toLocaleDateString()}
                        />

                    </div>
                </div><br />
                <div className='flex gap-6 flex-wrap'>
                    <div className='flex flex-col lg:w-70 w-full'>
                        <label htmlFor="" className='text-sm'>End Date</label>
                        <input type="text" readOnly className='p-1.5 bg-gray-200   
            outline-none border-gray-300 border-1 rounded'
                            value={new Date(leavesData?.ToDate).toLocaleDateString()}
                        />
                    </div>
                    <div className='flex flex-col lg:w-70 w-full'>
                        <label htmlFor="" className='text-sm'>Status</label>
                        <input type="text" readOnly className='p-1.5 bg-gray-200  
             outline-none border-gray-300 border-1 rounded' value={leavesData?.status} />

                    </div>

                </div><br />
                <div>
                    <button className='px-3 py-2 bg-green-400 rounded text-sm mx-2 cursor-pointer'>Accept</button>
                    <button className='px-3 py-2 bg-red-400 rounded text-sm mx-2 cursor-pointer'>Reject</button>
                </div>
            </div>
        </div>
    )
}

export default leavesDetails