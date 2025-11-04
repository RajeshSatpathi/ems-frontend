import React, { useEffect, useState } from 'react'
import { FaHandLizard } from 'react-icons/fa';
import { useNavigate, useParams } from 'react-router-dom';

function EditDepartment() {
    const [dept, setdept] = useState();
    const { id } = useParams();
    const naviaget = useNavigate();

    useEffect(() => {
        const fetchDeptData = async () => {
            try {
                const token = localStorage.getItem("token")

                const response = await fetch(`http://localhost:8000/department/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                if (!response.ok) {
                    throw new Error("Failed to fetch departments");
                }
                const data = await response.json();
                if (data) {
                    setdept(data.dept);
                }
            } catch (error) {
                console.error("Error fetching departments:", error);
            }
        }
        fetchDeptData();
    }, [id])
    const updateDepartment = async (e) => {
        e.preventDefault();
        try {
            try {
                const url = `http://localhost:8000/department/edit/${id}`;
                const token = localStorage.getItem("token")
                const response = await fetch(url, {
                    method: "PUT",
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`
                    },
                    body: JSON.stringify({
                        deptName: dept.deptName,
                        deptDesc: dept.deptDesc
                    })

                });
                if (response.ok) {
                    toast.success("Department updated successfully!");
               
                    navigate("/dept")
                } else {
                    const err = await response.json();
                    toast.error(err.message || "Failed to edit department.");
                }
            } catch (error) {
                toast.error("Something went wrong. Please try again later.");
                console.error(error);
            }
        } catch (error) {

        }

    }
    return (
        <div>
            <div><h2 className='text-lg font-semibold 
            uppercase text-gray-700'>Edit Department Details </h2></div><br />
            {/* //main form section  */}
            <div>
                <form action="" onSubmit={updateDepartment} 
                className='bg-gray-100 rounded flex justify-center flex-col items-center p-5'>

                    <div className=''>
                        <div className='flex flex-col lg:w-100 w-full '>
                            <label htmlFor="" className='text-sm'>Department Name</label>
                            <input type="text"
                                className='p-1.5 
                            
                             bg-gray-100  outline-none border-gray-300 border-1 rounded'
                                value={dept?.deptName}
                                onChange={(e) =>
                                    setdept((prev) => ({ ...prev, deptName: e.target.value }))
                                }
                            />
                        </div><br />
                        <div className='flex flex-col lg:w-100 w-full'>
                            <label htmlFor="" className='text-sm'>Description</label>
                            <input type="text"
                                className='p-1.5 bg-gray-100  outline-none border-gray-300 border-1 rounded'
                                value={dept?.deptDesc}
                                onChange={(e) =>
                                    setdept((prev) => ({ ...prev, deptDesc: e.target.value }))
                                }
                            />
                        </div>
                    </div><br />
                    <div className=''>
                        <button className='text-white 
                  px-4 flex items-center gap-x-3 
                  font-semibold bg-gradient-to-l
                 from-[#7f00ff] to-[#e100ff]
                   py-2 hover:text-white rounded hover:shadow-lg'>Update</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default EditDepartment