import React, { useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate } from "react-router-dom"

function AddDeprtment() {
  const [deptName, setdeptName] = useState(null);
  const [desc, setdesc] = useState(null);
  const navigate = useNavigate();

  //add department api call 
  const AddDepartmentAPICall = async () => {
    try {
      const url = "https://ems-backend-xjj3.vercel.app/department/addDepartment";
      const token = localStorage.getItem("token")
      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({
          deptName,
          deptDesc: desc
        })

      });
      if (response.ok) {
        toast("Department added successfully!");
        setdeptName("");
        setdesc("");
        navigate("/dept")


      } else {
        const err = await response.json();
        toast.error(err.message || "Failed to add department.");
      }
    } catch (error) {
      toast.error("Something went wrong. Please try again later.");
      console.error(error);
    }
  }
  const handleSubmit = (e) => {
    e.preventDefault()
    if (!deptName || !desc) {
      toast("please fill the dept Name")
    } else {
      AddDepartmentAPICall();
    }

  }


  return (

    <div>
      <div><h2 className='text-lg font-semibold uppercase text-gray-700'>Add Department Details </h2></div><br />
      {/* //main form section  */}

      <div>
        <form action="" onSubmit={handleSubmit} className='bg-gray-100 
        rounded flex justify-center flex-col items-center p-5'>

          <div className=''>
            <div className='flex flex-col lg:w-100 w-full '>
              <label htmlFor="" className='text-sm'>Department Name</label>
              <input type="text" className='p-1.5  bg-gray-100
                outline-none border-gray-300 border-1 rounded'
                value={deptName}
                onChange={(e) => setdeptName(e.target.value)}
              />
            </div><br />
            <div className='flex flex-col lg:w-100 w-full'>
              <label htmlFor="" className='text-sm'>Description</label>
              <input type="text" className='p-1.5 bg-gray-100  outline-none
               border-gray-300 border-1 rounded'
                value={desc}
                onChange={(e) => setdesc(e.target.value)}
              />
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
      // transition={Bounce}
      />
    </div>
  )
}

export default AddDeprtment