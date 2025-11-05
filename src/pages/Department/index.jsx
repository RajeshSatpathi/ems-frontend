import React from 'react'
import DataTable, { Alignment } from 'react-data-table-component';

import { FaEdit } from "react-icons/fa";
import { MdDeleteSweep } from "react-icons/md";
import { Link } from "react-router-dom"
import { useState } from 'react';
import { useEffect } from 'react';
const columns = [
  {
    name: 'SL No.',
    selector: (row, index) => index + 1,
    width: '100px',
  },
  {
    name: 'Department Name',
    selector: row => row.deptName,
    sortable: true,
  },
  {
    name: 'Description',
    selector: row => row.deptDesc,
    sortable: true,
  },
  {
    name: 'Action',
    cell: row => (
      <div className='flex gap-x-5 flex-wrap'>
        <Link to={`/dept/edit/${row._id}`} className=" text-gray-600 cursor-pointer">
          <FaEdit size={18} />
        </Link>
        <button className=" text-gray-600 cursor-pointer">
          <MdDeleteSweep size={19} />
        </button>
      </div>
    ),
  },
];
const customStyles = {
  tableWrapper: {
    style: {
      borderRadius: '8px', // <-- add border radius here
      overflow: 'hidden',  // ensures content respects border radius
      // optional light border (Tailwind's gray-200)
    },
  },
  headCells: {
    style: {
      backgroundColor: '#9B5DE0', // purple-800
      color: 'white',
      fontWeight: 'bold',
      fontSize: '14px',
      textTransform: 'uppercase',


    },
  },
  cells: {
    style: {
      fontSize: '14px',
      color: '',
    },
  },
  rows: {
    style: {
      minHeight: '50px', // optional
    },
  },
};

function index() {
  const [deptData, setdeptData] = useState([]);
  const [search, setsearch] = useState("");
  const [filterData, setfilterData] = useState();


  useEffect(() => {
    const fetchDeptData = async () => {
      try {
        const token = localStorage.getItem("token")
        const response = await fetch("https://ems-backend-xjj3.vercel.app/department", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        if (!response.ok) {
          throw new Error("Failed to fetch departments");
        }
        const data = await response.json();
        if (data) {
          setdeptData(data.dept);
        }
      } catch (error) {
        console.error("Error fetching departments:", error);
      }
    }
    fetchDeptData();

  }, [])
  // filter fucntionality
  useEffect(() => {
    if (search === '') {
      setfilterData(deptData); // Show all when search is empty
    } else {
      const searchData = deptData.filter((item) =>
        item.deptName.toLowerCase().includes(search.toLowerCase())
      );
      setfilterData(searchData);
    }
  }, [search, deptData]);
  return (
    <div>
      <div>
        <h2 className='text-lg font-semibold my-2 '>Department  Management</h2>
      </div>
      <div className='flex justify-between my-3 mx-1'>
        <div>
          <input type="text" placeholder='search Department'
            className='bg-gray-100 p-1.5 w-70 rounded'
            value={search}
            onChange={(e) => setsearch(e.target.value)}

          />
        </div>
        <div>
          <Link to="/adddepartment" className='bg-gradient-to-l
              from-[#7f00ff] to-[#e100ff]
           shadow-2xl rounded cursor-pointer

            text-white p-2 text-sm'>Add Department</Link>
        </div>
      </div>
      <DataTable
        customStyles={customStyles}
        columns={columns}
        data={filterData}
        pagination={true}
      />
    </div>
  )
}

export default index