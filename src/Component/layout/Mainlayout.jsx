import React from 'react'
import Sidebar from '../Sidebar'
import { Outlet } from "react-router-dom"
import Navbar from '../Navbar'
function Mainlayout() {
  return (
    <div className="flex h-screen">
      {/* Sidebar on the left */}
      <Sidebar />

      {/* Main content area */}
      <div className="flex flex-col flex-1">
        {/* Navbar on top */}
        <Navbar />

        {/* Page content rendered here */}
        <div className="flex-1 overflow-auto p-4">
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Mainlayout