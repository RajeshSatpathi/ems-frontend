import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import { useAuth } from '../../mycontext/AuthContext.jsx'
function index() {

  const { userData } = useAuth()
  const [Emp, setEmp] = useState({});
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userData?._id) return; // 👈 Prevent fetch until ID is ready
    const fetchEmpAPICall = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch(`http://localhost:8000/api/employee/${userData?._id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (response.status < 200 || response.status >= 300) {
          throw new Error(`Request failed with status ${response.status}`);
        }
        const data = await response.json();
        if (data) {
          setEmp(data.emp);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
      finally {
        setLoading(false);
      }
    }
    fetchEmpAPICall()

  }, [userData]);
  if (loading) {
    return <p>Loading profile...</p>;
  }
  return (
    <div>
      <h2 className='text-md font-semibold text-gray-600'>My Profile Details</h2><br />
      <div className='bg-gray-100 rounded w-full  flex flex-col items-center justify-center p-3'>

        <div className='w-30 h-30  my-2 rounded-full'>
          <img src={`http://localhost:8000/Public/uploads/${Emp.userId?.image}`} alt="" />
        </div>
        <div className='flex gap-6 flex-wrap '>
          <div className='flex flex-col lg:w-70 w-full '>
            <label htmlFor="" className='text-sm'>Name</label>
            <input type="text" readOnly className='p-1.5  bg-gray-200 
            outline-none border-gray-300 border-1 rounded' value={Emp.userId?.name} />
          </div>
          <div className='flex flex-col lg:w-70 w-full'>
            <label htmlFor="" className='text-sm'>Email</label>
            <input type="email" readOnly className='p-1.5 bg-gray-200  
            outline-none border-gray-300 border-1 rounded'
              value={Emp.userId?.email}
            />
          </div>
        </div><br />

        <div className='flex gap-6 flex-wrap'>
          <div className='flex flex-col lg:w-70 w-full'>
            <label htmlFor="" className='text-sm'>EMP ID</label>
            <input type="text" readOnly className='p-1.5 bg-gray-200  
             outline-none border-gray-300 border-1 rounded'
              value={Emp.employeeId}
            />
          </div>
          <div className='flex flex-col lg:w-70 w-full'>
            <label htmlFor="" className='text-sm'>DOB</label>
            <input type="text" readOnly className='p-1.5 bg-gray-200  
            outline-none border-gray-300 border-1 rounded' value={Emp?.dob} />
          </div>
        </div><br />

        <div className='flex gap-6 flex-wrap'>
          <div className='flex flex-col lg:w-70 w-full'>
            <label htmlFor="" className='text-sm'>Gender</label>
            <input type="text" readOnly className='p-1.5 bg-gray-200   
            outline-none border-gray-300 border-1 rounded'
              value={Emp?.gender}
            />

          </div>

          <div className='flex flex-col lg:w-70 w-full'>
            <label htmlFor="" className='text-sm'>Maritial Status</label>
            <input type="text" readOnly className='p-1.5 bg-gray-200  
             outline-none border-gray-300 border-1 rounded'
              value={Emp?.maritalStatus}
            />

          </div>
        </div><br />
        <div className='flex gap-6 flex-wrap'>
          <div className='flex flex-col lg:w-70 w-full'>
            <label htmlFor="" className='text-sm'>Designation</label>
            <input type="text" readOnly className='p-1.5 bg-gray-200   
            outline-none border-gray-300 border-1 rounded'
              value={Emp?.designation}
            />
          </div>
          <div className='flex flex-col lg:w-70 w-full'>
            <label htmlFor="" className='text-sm'>Department</label>
            <input type="text" readOnly className='p-1.5 bg-gray-200  
             outline-none border-gray-300 border-1 rounded' value={Emp?.department?.deptName} />

          </div>
        </div><br />
        <div className='flex gap-6 flex-wrap'>
          <div className='flex flex-col lg:w-70 w-full'>
            <label htmlFor="" className='text-sm'>Salary</label>
            <input type="number" readOnly className='p-1.5 bg-gray-200 rounded 
             outline-none border-gray-300 border-1'
              value={Emp?.salary}
            />
          </div>
          <div className='flex flex-col lg:w-70 w-full'>
          </div>
        </div><br />
      </div>
    </div>
  )
}

export default index