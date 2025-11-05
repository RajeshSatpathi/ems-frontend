import React, { useEffect, useState } from 'react'
import DataTable, { Alignment } from 'react-data-table-component';
import { MdRemoveRedEye } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import {Link} from "react-router-dom"
import {customStyles} from "../Employee/EmpTbl.jsx"
const columns = [
  {
    name: 'SL No.',
    selector: (row, index) => index + 1,
  },
  {
    name: 'EMP ID',
    selector: row => row.employeeId.employeeId,
  },
  {
    name: 'Name',
    selector: row => row.employeeId.userId.name,
  },
  {
    name: 'Leave Type',
    selector: row => row.leaveType,
  },
  {
    name: 'Department',
    selector: row => row.employeeId.department?.deptName,
  },
  {
    name: 'Days',
    selector: row => {
      const from = new Date(row.FromDate);
      const to = new Date(row.ToDate);

      // Calculate time difference in milliseconds
      const diffTime = to - from;

      // Convert milliseconds to days (1 day = 1000 * 60 * 60 * 24 ms)
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1;

      return diffDays;
    },
  },
  {
    name: 'Status',
    selector: row => row.status,
  },
  {
    name: 'Action',
    selector: row => row.year,
    cell: row =>
      <div className='flex gap-x-5 flex-wrap'>
        <Link to={`/admin-dashboard/leavesDetails/${row._id}`} className=" text-gray-600">
        <MdRemoveRedEye size={18} /></Link>

      </div>,
  },
];


function index() {
  const [leavesData, setleavesData] = useState([]);


  useEffect(() => {
    const fetchLeaves = async () => {
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
          <input type="text" placeholder='search By EMP ID'
            className='bg-gray-100 p-1.5 w-70 rounded'
          />
        </div>
        <div>
          <button className='bg-gray-500 text-green-400
           shadow-2xl rounded cursor-pointer mx-1

            p-2 text-sm'>Accept</button>
          <button className='bg-gray-500
           shadow-2xl rounded cursor-pointer mx-1

            text-red-300 p-2 text-sm'>Reject</button>
          <button className='bg-gray-500
           shadow-2xl rounded cursor-pointer

            text-yellow-200 p-2 text-sm'>Pending</button>
        </div>
      </div>
      <DataTable
        customStyles={customStyles}
        columns={columns}
        data={leavesData}
        pagination={true}
      />
    </div>
  )
}

export default index