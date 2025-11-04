import React, { useEffect, useState } from 'react'
import { useNavigate } from "react-router-dom"
import { ToastContainer, toast } from 'react-toastify';
import { fetchDeptData } from '../../utils/FetchEmpandDept';
function AddEmp() {
  const [department, setdepartment] = useState()
  const [formdata, setformdata] = useState({});
  const navigate = useNavigate()
  useEffect(() => {
    const fetchData = async () => {
      try {
        const deptResponse = await fetchDeptData();
        if (deptResponse?.dept) {
          setdepartment(deptResponse.dept);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
      }
    };

    fetchData();
  }, [])

  const handlechange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setformdata((prev) => ({ ...prev, [name]: files[0] }))
    } else {
      setformdata((prev) => ({ ...prev, [name]: value }))
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formdata.name || !formdata.email || !formdata.employeeId ||
      !formdata.dob || !formdata.gender || !formdata.maritalStatus
      || !formdata.designation || !formdata.department || !formdata.salary
      || !formdata.password || !formdata.role || !formdata.image
    ) {
      toast("All fields are required");
    } else {
      const formDataOBJ = new FormData();

      Object.keys(formdata).forEach((key) => {
        formDataOBJ.append(key, formdata[key])
      });


      const AddEmpAPICall = async () => {
        try {
          const url = "http://localhost:8000/api/employee/addEmp";
          const token = localStorage.getItem("token")
          const response = await fetch(url, {
            method: "POST",
            headers: {
              // "Content-Type": "application/json",
              Authorization: `Bearer ${token}`
            },
            body: formDataOBJ

          });
          if (response.ok) {
            alert("Employee added successfully!");
            setformdata("");
            navigate("/emp")

          } else {
            const err = await response.json();
            console.log(err)
            // toast.error(err.message || "Failed to add department.");
          }
        } catch (error) {
          toast.error("Something went wrong. Please try again later.");
          console.error(error);
        }
      }
      AddEmpAPICall()
    }


  }
  return (
    <div>
      <div><h2 className='text-lg font-semibold uppercase text-gray-700'>Add Emoplyee Details </h2></div><br />
      {/* //main form section  */}
      <div>
        <form action=""
          onSubmit={handleSubmit}
          className='bg-gray-100 rounded flex justify-center flex-col items-center p-5'>

          <div className='flex gap-6 flex-wrap '>
            <div className='flex flex-col lg:w-70 w-full '>
              <label htmlFor="" className='text-sm'>Name</label>
              <input type="text"
                name='name'
                onChange={handlechange}
                className='p-1.5  bg-gray-100  outline-none border-gray-300 border-1 rounded' />
            </div>
            <div className='flex flex-col lg:w-70 w-full'>
              <label htmlFor="" className='text-sm'>Email</label>
              <input type="email"
                name='email'
                onChange={handlechange}
                className='p-1.5 bg-gray-100  outline-none border-gray-300 border-1 rounded' />
            </div>
          </div><br />

          <div className='flex gap-6 flex-wrap'>
            <div className='flex flex-col lg:w-70 w-full'>
              <label htmlFor="" className='text-sm'>EMP ID</label>
              <input type="text"
                name='employeeId'
                onChange={handlechange}
                className='p-1.5 bg-gray-100   outline-none border-gray-300 border-1 rounded' />
            </div>
            <div className='flex flex-col lg:w-70 w-full'>
              <label htmlFor="" className='text-sm'>DOB</label>
              <input type="date"
                name='dob'
                onChange={handlechange}
                className='p-1.5 bg-gray-100  outline-none border-gray-300 border-1 rounded' />
            </div>
          </div><br />

          <div className='flex gap-6 flex-wrap'>
            <div className='flex flex-col lg:w-70 w-full'>
              <label htmlFor="" className='text-sm'>Gender</label>
              <select
                id="gender"
                name="gender"
                onChange={handlechange}
                className="p-1.5 bg-gray-100  outline-none border-gray-300 border-1 rounded"
              >
                <option value="">Select Gender</option>
                <option value="male">Male </option>
                <option value="female">Female</option>

              </select>
            </div>

            <div className='flex flex-col lg:w-70 w-full'>
              <label htmlFor="" className='text-sm'>Maritial Status</label>
              <select
                id="maritalStatus"
                name="maritalStatus"
                onChange={handlechange}
                className="p-1.5 bg-gray-100  outline-none border-gray-300 border-1 rounded"
              >
                <option value="">Select Status</option>
                <option value="Married">Married </option>
                <option value="Unmarried">Unmarried</option>

              </select>
            </div>
          </div><br />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex flex-col lg:w-70 w-full'>
              <label htmlFor="" className='text-sm'>Designation</label>
              <input type="text"
                name='designation'
                onChange={handlechange}
                className='p-1.5 bg-gray-100   outline-none border-gray-300 border-1 rounded' />
            </div>
            <div className='flex flex-col lg:w-70 w-full'>
              <label htmlFor="" className='text-sm'>Department</label>
              <select
                id="department"
                name="department"
                onChange={handlechange}
                className="p-1.5 bg-gray-100 rounded outline-none border-gray-300 border-1"
              >
                <option value="">Select</option>
                {
                  department?.map((item) => (
                    <option value={item._id}>{item.deptName}</option>

                  ))
                }

              </select>
            </div>
          </div><br />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex flex-col lg:w-70 w-full'>
              <label htmlFor="" className='text-sm'>Salary</label>
              <input type="number"
                name='salary'
                onChange={handlechange}
                className='p-1.5 bg-gray-100 rounded  outline-none border-gray-300 border-1' />
            </div>
            <div className='flex flex-col lg:w-70 w-full'>
              <label htmlFor="" className='text-sm'>Password</label>
              <input type="password"
                name='password'
                onChange={handlechange}
                className='p-1.5 bg-gray-100 rounded outline-none border-gray-300 border-1' />

            </div>
          </div><br />

          <div className='flex gap-6 flex-wrap'>
            <div className='flex flex-col lg:w-70 w-full'>
              <label htmlFor="" className='text-sm'>Role</label>
              <select
                id="role"
                name="role"
                onChange={handlechange}
                className="p-1.5 bg-gray-100  outline-none rounded border-gray-300 border-1"
              >
                <option value="">Select</option>
                <option value="employee">admin </option>
                <option value="employee">employee</option>

              </select>
            </div>
            <div className='flex flex-col lg:w-70 w-full'>
              <label htmlFor="" className='text-sm'>Profile Image</label>
              <input type="file"
                name='image'
                onChange={handlechange}
                className='p-1.5 bg-gray-100 rounded outline-none border-gray-300 border-1' />

            </div>
          </div><br />

          <div className=''>
            <button className='text-white 
             px-4 flex items-center gap-x-3 
             font-semibold bg-gradient-to-l
              from-[#7f00ff] to-[#e100ff]
               py-2 hover:text-white rounded hover:shadow-lg'>Submit</button>
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

export default AddEmp