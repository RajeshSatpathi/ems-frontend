import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { data } from '../../DemotblData.jsx'
function ViewEmp() {
  const { id } = useParams()
  const [Emp, setEmp] = useState([]);
    console.log(Emp)
  useEffect(() => {
    const fetchEmpAPICall = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch(`https://ems-backend-xjj3.vercel.app/api/employee/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch departments");
        }
        const data = await response.json();
        if (data) {
          console.log(data)
          setEmp(data.emp);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    }
    fetchEmpAPICall()

  }, [id])
  return (
    <div>
      <h2 className='text-md font-semibold text-gray-600'>Employee Details</h2><br />
      <div className='bg-gray-100 rounded w-full flex flex-col items-center justify-center p-3'>

        <div className='w-30 h-30  my-2 rounded-full'>
          <img src={`https://ems-backend-xjj3.vercel.app/Public/uploads/${Emp.userId?.image}`} alt="" />
        </div>
        <div className='flex gap-6 flex-wrap  '>
          <div className='flex flex-col  lg:w-70 w-full '>
            <label htmlFor="" className='text-sm'>Name</label>
            <input type="text" className='p-1.5  bg-gray-200  
            outline-none border-gray-300 border-1 rounded' value={Emp.userId?.name} />
          </div>
          <div className='flex flex-col lg:w-70 w-full'>
            <label htmlFor="" className='text-sm'>Email</label>
            <input type="email" className='p-1.5 bg-gray-200  
            outline-none border-gray-300 border-1 rounded'
            value={Emp.userId?.email}
            />
          </div>
        </div><br />

        <div className='flex gap-6 flex-wrap '>
          <div className='flex flex-col lg:w-70 w-full'>
            <label htmlFor="" className='text-sm'>EMP ID</label>
            <input type="text" className='p-1.5 bg-gray-200  
             outline-none border-gray-300 border-1 rounded'
             value={Emp.employeeId}
              />
          </div>
          <div className='flex flex-col lg:w-70 w-full'>
            <label htmlFor="" className='text-sm'>DOB</label>
            <input type="text" className='p-1.5 bg-gray-200  
            outline-none border-gray-300 border-1 rounded' value={Emp?.dob} />
          </div>
        </div><br />

        <div className='flex gap-6 flex-wrap '>
          <div className='flex flex-col lg:w-70 w-full'>
            <label htmlFor="" className='text-sm'>Gender</label>
            <input type="text" className='p-1.5 bg-gray-200   
            outline-none border-gray-300 border-1 rounded' 
            value={Emp?.gender}
            />

          </div>

          <div className='flex flex-col lg:w-70 w-full'>
            <label htmlFor="" className='text-sm'>Maritial Status</label>
            <input type="text" className='p-1.5 bg-gray-200  
             outline-none border-gray-300 border-1 rounded' 
              value={Emp?.maritalStatus}
             />

          </div>
        </div><br />
        <div className='flex gap-6 flex-wrap'>
          <div className='flex flex-col lg:w-70 w-full'>
            <label htmlFor="" className='text-sm'>Designation</label>
            <input type="text" className='p-1.5 bg-gray-200   
            outline-none border-gray-300 border-1 rounded'
               value={Emp?.designation}
             />
          </div>
          <div className='flex flex-col lg:w-70 w-full'>
            <label htmlFor="" className='text-sm'>Department</label>
            <input type="text" className='p-1.5 bg-gray-200  
             outline-none border-gray-300 border-1 rounded' value={Emp?.department?.deptName} />

          </div>
        </div><br />
        <div className='flex gap-6 flex-wrap  '>
          <div className='flex flex-col lg:w-70 w-85'>
            <label htmlFor="" className='text-sm'>Salary</label>
            <input type="number" className='p-1.5 bg-gray-200 rounded 
             outline-none border-gray-300 border-1'
             value={Emp?.salary}
              />
          </div>
          <div className='flex flex-col lg:w-70 w-full '>
            {/* <label htmlFor="" className='text-sm'>Password</label> */}
            {/* <input type="password" className='p-1.5 bg-gray-100 rounded outline-none border-gray-300 border-1' /> */}

          </div>
        </div><br />


      </div>
    </div>
  )
}

export default ViewEmp