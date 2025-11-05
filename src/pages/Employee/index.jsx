import React from 'react'
import DataTable, { Alignment } from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { Empcolumns, customStyles } from './EmpTbl.jsx';
import { useEffect } from 'react';
import { useState } from 'react';


function index() {
  const [empData, setempData] = useState([]);
  const [search, setsearch] = useState("");
  const [filterData, setfilterData] = useState();

  const fetchEmpAPICall = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch("https://ems-backend-xjj3.vercel.app/api/employee/", {
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
        setempData(data.emp);
      }
    } catch (error) {
      console.error("Error fetching departments:", error);
    }
  }
  useEffect(() => {
    fetchEmpAPICall()
  }, [])
  // filter fucntionality
  useEffect(() => {
    if (search === '') {
      setfilterData(empData); // Show all when search is empty
    } else {
      const searchData = empData.filter((item) =>
        item?.userId.name?.toLowerCase().includes(search.toLowerCase())
      );
      setfilterData(searchData);
    }
  }, [search, empData]);
  return (
    <div>
      <div>
        <h2 className='text-lg font-semibold my-2 '>Employee  Management</h2>
      </div>
      <div className='flex justify-between my-3 mx-1'>
        <div>
          <input type="text" placeholder='search By EMP Name'
            className='bg-gray-100 p-1.5 w-70 rounded'
            value={search}
            onChange={(e) => setsearch(e.target.value)}
          />
        </div>
        <div>
          <Link to="/addemp" className='bg-gradient-to-l
              from-[#7f00ff] to-[#e100ff]
           shadow-2xl rounded cursor-pointer
            
            text-white p-2 text-sm'>Add Employee</Link>
        </div>
      </div>
      <DataTable
        customStyles={customStyles}
        columns={Empcolumns}
        data={filterData}
        pagination={true}
        highlightOnHover
        pointerOnHover
        responsive
      
      />
    </div>
  )
}

export default index