import React from 'react'
import DataTable, { Alignment } from 'react-data-table-component';
import { MdRemoveRedEye } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import { Link } from 'react-router-dom';
import {data} from "../../DemotblData.jsx"
const columns = [
  {
    name: 'SL No.',
    selector: row => row.title,
  },
  {
    name: 'leaves Type',
    selector: row => row.name,
  },
  {
    name: 'From',
    selector: row => row.year,
  },
  {
    name: 'To',
    selector: row => row.department,
  },
    {
    name: 'Description',
    selector: row => row.department,
  },
    {
    name: 'Applied Date',
    selector: row => row.department,
  },
    {
    name: 'Status',
    selector: row => row.department,
  },
//   {
//     name: 'Action',
//     selector: row => row.year,
//     cell: row =>
//       <div className='flex gap-x-5 flex-wrap'>
//         <Link to={`/emp/detailsview/${row.title}`} className=" text-gray-600"><MdRemoveRedEye size={18} /></Link>
//         <button className=" text-gray-600"><FaEdit size={18} /></button>
//         <Link  className=" text-green-600 font-semibold">Salary</Link>
//         <Link  to={`/emp/leavesview/${row.title}`} className=" text-red-500">Leaves</Link>


//       </div>,
//   },
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
function Empleaves() {
  return (
      <div>
      <div>
        <h2 className='text-lg font-semibold my-2 '>Leaves Details of -----</h2>
      </div>
      <div className='flex justify-between my-3 mx-1'>
      
        <div>
    
        </div>
      </div>
      <DataTable
        customStyles={customStyles}
        columns={columns}
        data={data}
        pagination={true}
      />
    </div>
  )
}

export default Empleaves