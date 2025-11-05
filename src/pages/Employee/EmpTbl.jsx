import { Link } from "react-router-dom"
import { MdRemoveRedEye } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

export const Empcolumns = [
  {
    name: 'SL No.',
    selector: (row, index) => index + 1,
  },

  {
    name: "Profile Image",
    cell: (row) => (
      row.userId?.image ? (
        <img
          src={`https://ems-backend-xjj3.vercel.app/Public/uploads/${row.userId?.image}`}
          alt="Profile"
          style={{ width: "40px", height: "40px", borderRadius: "50%", objectFit: "cover" }}
        />
      ) : (
        <span>No Image</span>
      )
    ),
  },
  { name: "Name", selector: (row) => row.userId?.name, sortable: true },
  { name: "Department", selector: (row) => row.department?.deptName },

  {
    name: 'Action',
    selector: row => row.year, 
    cell: row =>
      <div className='flex gap-x-5 flex-wrap'>
        <Link to={`/emp/detailsview/${row._id}`} className=" text-gray-600"><MdRemoveRedEye size={18} /></Link>
        <Link to={`/emp/edit/${row._id}`} className=" text-gray-600"><FaEdit size={18} /></Link>
        <Link to={`/emp/salaryview/${row._id}`} className=" text-green-600 font-semibold">Salary</Link>

      </div>,
  },
];


export const customStyles = {
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
