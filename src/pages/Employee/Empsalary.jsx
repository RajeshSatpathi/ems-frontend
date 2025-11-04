import React, { useEffect, useState } from 'react'
import DataTable, { Alignment } from 'react-data-table-component';
import { useParams } from 'react-router-dom';
import { data } from "../../DemotblData.jsx"
import { customStyles } from './EmpTbl.jsx';
const columns = [
  {
    name: 'SL No.',
    selector: (row,index) => index + 1,
  },
  {
    name: 'EMP ID',
    selector: row => row.employeeId.employeeId,
  },
  {
    name: 'Salary',
    selector: row => row.basicSalary,
  },
  {
    name: 'Allowence',
    selector: row => row.allowances,
  },
  {
    name: 'Deduction',
    selector: row => row.deductions,
  },
  {
    name: 'Total',
    selector: row => row.netSalary,
  },
  {
    name: 'Pay Date',
    selector: row =>  new Date(row.PayDate).toLocaleDateString(),
  },

];

function Salary() {
  const { id } = useParams();
const [salaryData, setsalaryData] = useState([])
console.log(salaryData)
useEffect(() => {
  const fetchSalary = async () => {
    try {
      const token = localStorage.getItem("token")
      const response = await fetch(`http://localhost:8000/api/salary/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      if (!response.ok) {
        throw new Error("Failed to fetch salary");
      }
      const data = await response.json();
      if (data) {
        setsalaryData(data)
      }
    } catch (error) {
      console.error("Error fetching salary:", error);
    }
  }
  fetchSalary()
}, [])

  return (
    <div>
      <div>
        <h2 className='text-lg font-semibold my-2 '>Salary History </h2>
      </div>
      <div className='flex justify-between my-3 mx-1'>
        <div>
          <input type="text" placeholder='search By EMP ID'
            className='bg-gray-100 p-1.5 w-70 rounded'
          />
        </div>
        <div>

        </div>
      </div>
      <DataTable
        customStyles={customStyles}
        columns={columns}
        data={salaryData}
        pagination={true}
      />
    </div>
  )
}

export default Salary