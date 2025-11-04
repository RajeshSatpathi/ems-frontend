import React, { useState } from 'react';
import { FaBuildingUser } from "react-icons/fa6";
import { FaBars } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import { MdDashboard } from "react-icons/md";
import { FaUserFriends } from "react-icons/fa";
import { MdHolidayVillage } from "react-icons/md";
import { BsCashCoin } from "react-icons/bs";
import { IoMdSettings } from "react-icons/io";
import { IoCloseCircleOutline } from "react-icons/io5";
import { useAuth } from '../mycontext/AuthContext';
function Sidebar() {
    const [isOpen, setIsOpen] = useState(false);
     const { userData } = useAuth();


    return (
        <>
            {/* Toggle Button for Mobile */}
            <button
                className="md:hidden p-4 text-blue-600"
                onClick={() => setIsOpen(!isOpen)}
            >
                <FaBars size={24} />
            </button>

            {/* Sidebar */}
            <div
                className={`
                    bg-gray-100 py-3 shadow-xl lg:w-45 md:w-40 w-full h-screen  
                    fixed top-0 left-0 z-50 transition-transform duration-300 ease-in-out
                    ${isOpen ? 'translate-x-0' : '-translate-x-full'}
                    md:relative md:translate-x-0 md:flex md:flex-col
                `}
            >
                <div className='flex flex-col items-center'>
                    <span className='relative left-42 lg:hidden cursor-pointer '
                        onClick={() => setIsOpen(!isOpen)}><IoCloseCircleOutline size={25} /></span>
                    <div className='flex items-center gap-3 px-4'>
                        <FaBuildingUser size={25} color='#800080' />
                        <h2 className='text-lg font-bold text-[#800080]'>EMS V.1</h2>
                    </div>
                    <p className='text-center text-gray-500'>Management System</p>
                    <hr className='border-gray-300 my-4 w-full' />
                </div>

                {/* Sidebar content */}
                {
                    userData?.role === "admin" ?
                        <div className="px-4 flex flex-col gap-5">
                            <Link to="/admin-dashboard" className="text-gray-700 flex items-center gap-x-3 font-semibold hover:bg-gradient-to-l hover:from-[#7f00ff] hover:to-[#e100ff] p-2 hover:text-white rounded hover:shadow-lg">
                                <MdDashboard size={20} /> <span>Dashboard</span>
                            </Link>

                            <Link to="/emp" className="text-gray-700 flex items-center gap-x-3 font-semibold hover:bg-gradient-to-l hover:from-[#7f00ff] hover:to-[#e100ff] p-2 hover:text-white rounded hover:shadow-lg">
                                <FaUserFriends size={20} /> <span>Employee</span>
                            </Link>

                            <Link to="/dept" className="text-gray-700 flex items-center gap-x-3 font-semibold hover:bg-gradient-to-l hover:from-[#7f00ff] hover:to-[#e100ff] p-2 hover:text-white rounded hover:shadow-lg">
                                <FaBuildingUser size={20} /> <span>Department</span>
                            </Link>

                            <Link to="/leaves" className="text-gray-700 flex items-center gap-x-3 font-semibold hover:bg-gradient-to-l hover:from-[#7f00ff] hover:to-[#e100ff] p-2 hover:text-white rounded hover:shadow-lg">
                                <MdHolidayVillage size={20} /> <span>Leaves</span>
                            </Link>

                            <Link to="/salary" className="text-gray-700 flex items-center gap-x-3 font-semibold hover:bg-gradient-to-l hover:from-[#7f00ff] hover:to-[#e100ff] p-2 hover:text-white rounded hover:shadow-lg">
                                <BsCashCoin size={20} /> <span>Salary</span>
                            </Link>

                            <Link to="/settings" className="text-gray-700 flex items-center gap-x-3 font-semibold hover:bg-gradient-to-l hover:from-[#7f00ff] hover:to-[#e100ff] p-2 hover:text-white rounded hover:shadow-lg">
                                <IoMdSettings size={20} /> <span>Settings</span>
                            </Link>
                        </div>
                        :
                        <div className="px-4 flex flex-col gap-5">
                            <Link to="/admin-dashboard" className="text-gray-700 flex items-center gap-x-3
                             font-semibold hover:bg-gradient-to-l hover:from-[#7f00ff] hover:to-[#e100ff] p-2
                              hover:text-white rounded hover:shadow-lg">
                                <MdDashboard size={20} /> <span>Dashboard</span>
                            </Link>
                            
                            <Link to={`/empprofile/${userData._id}`} className="text-gray-700 flex items-center gap-x-3
                             font-semibold hover:bg-gradient-to-l hover:from-[#7f00ff] hover:to-[#e100ff] p-2
                              hover:text-white rounded hover:shadow-lg">
                                <FaUserFriends size={20} /> <span>My Profile</span>
                            </Link>

                            <Link to="/empleaves" className="text-gray-700 flex items-center 
                            gap-x-3 font-semibold hover:bg-gradient-to-l hover:from-[#7f00ff] hover:to-[#e100ff] p-2
                             hover:text-white rounded hover:shadow-lg">
                                <MdHolidayVillage size={20} /> <span>Leaves</span>
                            </Link>

                            <Link to="/empsalary" className="text-gray-700 flex items-center 
                            gap-x-3 font-semibold hover:bg-gradient-to-l hover:from-[#7f00ff] hover:to-[#e100ff] 
                            p-2 hover:text-white rounded hover:shadow-lg">
                                <BsCashCoin size={20} /> <span>Salary</span>
                            </Link>

                            <Link to="/empsettings" className="text-gray-700 flex items-center 
                            gap-x-3 font-semibold hover:bg-gradient-to-l hover:from-[#7f00ff] hover:to-[#e100ff] p-2
                             hover:text-white rounded hover:shadow-lg">
                                <IoMdSettings size={20} /> <span>Settings</span>
                            </Link>
                    </div>
                }
            </div>
        </>
    );
}

export default Sidebar;
