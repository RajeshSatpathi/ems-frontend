import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import { fetchDeptData, fetchEmpAPICall } from '../../utils/FetchEmpandDept';
function EditEmp() {
  const [empData, setempData] = useState();
  const [deptData, setdeptData] = useState([]);
  const [employees, setemployees] = useState({
    name: "",
    maritalStatus: "",
    designation: "",
    department: "",
    salary: ""
  })
  const { id } = useParams()
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target;
    setemployees(prev => ({
      ...prev,
      [name]: value
    }));
  }


  useEffect(() => {
   const fetchData = async () => {
    try {
      const empResponse = await fetchEmpAPICall(id);
      const deptResponse = await fetchDeptData();

      if (empResponse?.emp) {
        setempData(empResponse.emp);
      }
      if (deptResponse?.dept) {
        setdeptData(deptResponse.dept);
      }
    } catch (err) {
      console.error("Error fetching data:", err);
    }
  };

  fetchData();

  }, [])

  useEffect(() => {
    if (empData) {
      setemployees({
        name: empData?.userId?.name || "",
        maritalStatus: empData?.maritalStatus || "",
        designation: empData?.designation || "",
        department: empData?.department?._id || "",
        salary: empData?.salary || ""
      });
    }
  }, [empData]);
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await fetch(`http://localhost:8000/api/employee/edit/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify(employees)
      });

      if (!response.ok) {
        throw new Error("Failed to update employee");
      }

      const data = await response.json();
      if (data) {
        alert("Employee Updated Successfully...");
        navigate("/emp")
      }

      // Optionally redirect or show success message
    } catch (err) {
      console.error(err);
    }
  }
  return (
    <div>
      <div><h2 className='text-lg font-semibold uppercase text-gray-700'>Edit Emoplyee Details </h2></div><br />
      {/* //main form section  */}
      <div>
        <form action="" onSubmit={handleSubmit} className='bg-gray-100
          rounded flex justify-center flex-col items-center p-5'>

          <div className='flex gap-6 flex-wrap '>
            <div className='flex flex-col lg:w-70 w-full '>
              <label htmlFor="" className='text-sm'>Name</label>
              <input type="text"
                name='name'
                value={employees.name}
                onChange={handleChange}
                className='p-1.5  bg-gray-100  outline-none border-gray-300 border-1 rounded' />
            </div>
            <div className='flex flex-col lg:w-70 w-full'>
              <label htmlFor="" className='text-sm'>Maritial Status</label>
              <select
                id="maritalStatus"
                name="maritalStatus"
                value={employees?.maritalStatus}
                onChange={handleChange}
                className="p-1.5 bg-gray-100  outline-none border-gray-300 border-1 rounded"
              >
                <option value="">Select Status</option>
                <option value="married">Married </option>
                <option value="Unmarried">Unmarried</option>

              </select>
            </div>
          </div><br />

          <div className='flex gap-6 flex-wrap'>
            <div className='flex flex-col lg:w-70 w-full'>
              <label htmlFor="" className='text-sm'>Designation</label>
              <input type="text"
                name='designation'
                value={employees?.designation}
                onChange={handleChange}
                className='p-1.5 bg-gray-100   outline-none border-gray-300 border-1 rounded' />
            </div>
            <div className='flex flex-col lg:w-70 w-full'>
              <label htmlFor="" className='text-sm'>Department</label>
              <select
                id="department"
                name="department"
                value={employees.department}
                onChange={handleChange}
                className="p-1.5 bg-gray-100 rounded outline-none border-gray-300 border-1"
              >
                <option value="">Select</option>
                {
                  deptData?.map((item) => (
                    <option value={item._id}>{item.deptName}</option>

                  ))
                }

              </select>
            </div>
          </div><br />
          <div className='flex gap-6 flex-wrap'>
            <div className='flex flex-col lg:w-100 w-full'>
              <label htmlFor="" className='text-sm'>Salary</label>
              <input type="number"
                name='salary'
                value={employees?.salary}
                onChange={handleChange}
                className='p-1.5 bg-gray-100 rounded  outline-none border-gray-300 border-1' />
            </div>

          </div><br />

          <div className=''>
            <button className='text-white 
             px-4 flex items-center gap-x-3 
             cursor-pointer
             font-semibold bg-gradient-to-l
              from-[#7f00ff] to-[#e100ff]
               py-2 hover:text-white rounded hover:shadow-lg'>Update</button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default EditEmp