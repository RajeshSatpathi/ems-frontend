import React, { useEffect, useState } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import { fetchDeptData } from '../../utils/FetchEmpandDept';

function index() {
  // this is for department state fetch from api
  const [department, setdepartment] = useState([]);
  // this is for employee state fetch from api
  const [employee, setemployee] = useState([]);

  // this is for user input for salary from

  const [inputData, setinputData] = useState({
    employeeId: "",
    basicSalary: 0,
    allowances: 0,
    deductions:0,
    PayDate: ""

  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setinputData((prev) => ({
      ...prev,
      [name]: value
    }));
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { employeeId, basicSalary, allowances, deductions, PayDate } = inputData;
    if (!employeeId || !basicSalary || !allowances || !deductions || !PayDate) {
      toast("All field Are Require")
    } else {
      // console.log(inputData)
      try {
        const url = "https://ems-backend-xjj3.vercel.app/api/salary/add";
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
          alert("Salary added successfully!");
          setinputData("");
       

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

  }
  //handle department change 
  const handleDepartmentChange = async (e) => {
    const selectedDeptId = e.target.value;

    if (selectedDeptId) {
      try {
        const token = localStorage.getItem("token")
        const res = await fetch(`https://ems-backend-xjj3.vercel.app/api/employee/department/${selectedDeptId}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        const data = await res.json();
        setemployee(data);
      } catch (err) {
        console.error("Failed to fetch employees:", err);
      }
    } else {
      setemployee([]); // clear if no department selected
    }
  };
  useEffect(() => {
    const fetchData = async () => {
      const deptResponse = await fetchDeptData();
      if (deptResponse?.dept) {
        setdepartment(deptResponse.dept)
      }
    }
    fetchData()
  }, [])
  return (
    <div>

      <div><h2 className='text-lg font-semibold uppercase text-gray-700'> Add Salary  </h2></div><br />
      {/* //main form section  */}
      <div>
        <form action=""
          onSubmit={handleSubmit}
          className='bg-gray-100 rounded flex justify-center flex-col items-center p-5'>

          <div className='flex gap-5'>
            <div className='flex flex-col lg:w-70 w-full '>
              <label htmlFor="" className='text-sm'>Department Name</label>
              <select name="deptName" id=""
                value={inputData.deptName}
                onChange={handleDepartmentChange}
                className='p-1.5  bg-gray-100  outline-none border-gray-300 border-1 rounded'>
                <option value="">select</option>
                {
                  department.map((item) => (
                    <option value={item._id}>{item.deptName}</option>
                  ))
                }
              </select>
            </div><br />
            <div className='flex flex-col lg:w-70 w-full'>
              <label htmlFor="" className='text-sm'>Employee ID</label>
              <select name="employeeId" id=""
                value={inputData.employeeId}
                onChange={handleChange}
                className='p-1.5  bg-gray-100  outline-none border-gray-300 border-1 rounded'>
                <option value="">select</option>
                {employee.map((emp) => (
                  <option key={emp._id} value={emp._id}>
                    {emp.employeeId}
                  </option>
                ))}
              </select>
            </div>
          </div><br />
          <div className='flex gap-5'>
            <div className='flex flex-col lg:w-70 w-full '>
              <label htmlFor="" className='text-sm'>Basic Salary</label>
              <input type="number"
                name='basicSalary'
                value={inputData.basicSalary}
                onChange={handleChange}
                className='p-1.5  bg-gray-100  outline-none border-gray-300 border-1 rounded' />
            </div><br />
            <div className='flex flex-col lg:w-70 w-full'>
              <label htmlFor="" className='text-sm'>Allowances</label>
              <input type="number"
                name='allowances'
                value={inputData.allowances}
                onChange={handleChange}
                className='p-1.5  bg-gray-100  outline-none border-gray-300 border-1 rounded' />
            </div>
          </div><br />
          <div className='flex gap-5'>
            <div className='flex flex-col lg:w-70 w-full '>
              <label htmlFor="" className='text-sm'>Deduction</label>
              <input type="number"
                name='deductions'
                value={inputData.deductions}
                onChange={handleChange}
                className='p-1.5  bg-gray-100  outline-none border-gray-300 border-1 rounded' />
            </div><br />
            <div className='flex flex-col lg:w-70 w-full'>
              <label htmlFor="" className='text-sm'>Pay Date</label>
              <input type="date"
                name='PayDate'
                value={inputData.PayDate}
                onChange={handleChange}

                className='p-1.5  bg-gray-100  outline-none border-gray-300 border-1 rounded' />
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

export default index