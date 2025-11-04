import React from 'react'
import { FaUserFriends } from "react-icons/fa";
import { FaBuildingUser } from "react-icons/fa6";
import { BsCashCoin } from "react-icons/bs";
import { RiMailCloseFill } from "react-icons/ri";
import { GoIssueClosed } from "react-icons/go";
import { useAuth } from '../../mycontext/AuthContext';
import { useNavigate } from 'react-router-dom';
function index() {
  const data = [
    {
      icons: FaUserFriends,
      heading: "Total Employee",
      color: "#F75270"
    },
    {
      icons: FaBuildingUser,
      heading: "Total Department",
      color: "#4682B4"
    },
    {
      icons: BsCashCoin,
      heading: "Monthly Pay",
      color: "#59AC77"
    },
 
  ]
    const Leavesdata = [
    {
      icons: FaUserFriends,
      heading: "Leave Applied",
      color: "#DDA0DD"
    },
    {
      icons: FaBuildingUser,
      heading: "Leave Pending",
      color: "#4682B4"
    },
    {
      icons: GoIssueClosed,
      heading: "Leaves Accepted",
      color: "#59AC77"
    },
        {
      icons: RiMailCloseFill,
      heading: "Leaves Rejected",
      color: "#F75270"
    }, 
  ];
  const {userData,loading} = useAuth();
  const navigate = useNavigate()
  if(loading){
    return <div>Loading.........</div>
  }
  if(!userData){
    navigate("/")
  }
  return (
    <div>
      <h2 className='text-xl font-semibold text-gray-700 mb-3'>Admin Dashboard Overview</h2>
     
      <div className='flex gap-7 flex-wrap '>
        {
          data.map((item) => (
            <div className='bg-gray-100 xl:w-90 lg:w-80 w-70 py-5 px-4 h-36 rounded-md shadow-md'>
              <div className=' flex justify-between'>
                <div>
                  <item.icons size={40} color={item.color} />
                </div>
                <div>
                  <h2 className='text-lg font-semibold text-gray-600'>{item.heading}</h2>
                </div>
              </div>
              <div className='text-right'><span className='text-xl font-bold '>100</span></div>
            </div>
          ))
        }
      </div><br /><br />
      {/* leavs details  */}
      <h2 className='text-xl  mb-3 '>Leaves Details</h2>
      <div className='flex gap-5 flex-wrap '>
        {
          Leavesdata.map((item) => (
            <div className='bg-gray-100 xl:w-98 lg:w-80 w-70 py-5 px-4 h-30 rounded shadow-md'>
              <div className=' flex justify-between'>
                <div>
                  <item.icons size={50} color={item.color} />
                </div>
                <div>
                  <h2 className='text-lg font-semibold text-gray-600'>{item.heading}</h2>
                </div>
              </div>
              <div className='text-right'><span className='text-xl font-bold '>100</span></div>
            </div>
          ))
        }
      </div><br />
    </div>
  )
}

export default index