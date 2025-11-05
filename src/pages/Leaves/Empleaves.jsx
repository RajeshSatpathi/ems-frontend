import React, { useEffect, useState } from 'react'
import { customStyles } from '../Employee/EmpTbl.jsx';
import DataTable, { Alignment } from 'react-data-table-component';
import { data } from "../../DemotblData.jsx"
import { Link } from 'react-router-dom';
import { Leavescolumns } from './LeavesCol.jsx';

function Empleaves() {
  const [search, setsearch] = useState("");
  const [leavesData, setleavesData] = useState([]);


  useEffect(() => {
    const fetchLeaves = async()=>{
       try {
        const token = localStorage.getItem("token")
        const response = await fetch("https://ems-backend-xjj3.vercel.app/api/leaves/", {
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
  }, [])




  return (
    <div>
      <div>
        <h2 className='text-lg font-semibold my-2 '>Leaves  Management</h2>
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
          <Link to="/empleaves/add" className='bg-gradient-to-l
              from-[#7f00ff] to-[#e100ff]
           shadow-2xl rounded cursor-pointer
            
            text-white p-2 text-sm'>Apply Leaves</Link>
        </div>
      </div>
      <DataTable
        customStyles={customStyles}
        columns={Leavescolumns}
        data={leavesData}
        pagination={true}
        highlightOnHover
        pointerOnHover
        responsive
      />
    </div>
  )
}

export default Empleaves