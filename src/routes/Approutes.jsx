import React from 'react'
import { Routes, Route } from "react-router-dom"
import AdminDashboard from "../pages/Home/index.jsx"
import Employee from "../pages/Employee/index.jsx"
import Department from "../pages/Department/index.jsx"
import Salary from "../pages/Salary/index.jsx"
import Leaves from "../pages/Leaves/index.jsx"
import AddEmp from "../pages/Employee/AddEmp"
import Login from "../pages/Login/index.jsx"
import ViewEmp from '../pages/Employee/ViewEmp.jsx'
import Empployeeleaves from '../pages/Employee/Empleaves.jsx'
import Mainlayout from '../Component/layout/Mainlayout.jsx'
import AddDeprtment from '../pages/Department/AddDeprtment.jsx'
import Empsalary from "../pages/Employee/Empsalary.jsx"
import EditEmp from '../pages/Employee/EditEmp.jsx'
import EditDepartment from '../pages/Department/EditDepartment.jsx'
import PrivateRoutes from './PrivateRoutes.jsx'
import RoleBasedRoutes from './RoleBasedRoutes.jsx'
import EmployeeDashboard from '../pages/Employee/EmployeeDashboard.jsx'
import EmployeeProfile from "../pages/EmpProfile/index.jsx"
import Empleaves from '../pages/Leaves/Empleaves.jsx'
import AddLeaves from '../pages/Leaves/AddLeaves.jsx'
import EmpSalary from '../pages/Salary/EmpSalary.jsx'
import EmpSettings from '../pages/Settings/EmpSettings.jsx'
import LeavesDetails from '../pages/Leaves/LeavesDetails.jsx'
function Approutes() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route element={<Mainlayout />}>

          {/* // all admin routes are here  */}
          {/* //protected routes */}
          <Route path="/admin-dashboard" element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["admin"]}>
                < AdminDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>

          } />
          <Route path="/emp" element={<Employee />} />
          <Route path="/addemp" element={<AddEmp />} />
          <Route path="/emp/detailsview/:id" element={<ViewEmp />} />
          <Route path="/emp/leavesview/:id" element={<Empployeeleaves />} />
          <Route path="/emp/salaryview/:id" element={<Empsalary />} />
          <Route path="/emp/edit/:id" element={<EditEmp />} />
          <Route path="/dept" element={<Department />} />
          <Route path="/dept/edit/:id" element={<EditDepartment />} />
          <Route path="/adddepartment" element={<AddDeprtment />} />
          <Route path="/salary" element={<Salary />} />
          <Route path="/leaves" element={<Leaves />} />
          <Route path="/admin-dashboard/leavesDetails/:id" element={<LeavesDetails />} />


          {/* // all employee Routes are here */}
          {/* //protected routes */}
          <Route path="/employee-dashboard" element={
            <PrivateRoutes>
              <RoleBasedRoutes requiredRole={["employee"]}>
                < EmployeeDashboard />
              </RoleBasedRoutes>
            </PrivateRoutes>

          } />

          <Route path="/empProfile/:id" element={<EmployeeProfile />} />
          <Route path="/empleaves" element={<Empleaves />} />
          <Route path="/empleaves/add" element={<AddLeaves />} />
          <Route path="/empsalary" element={<EmpSalary />} />
          <Route path="/empsettings" element={<EmpSettings />} />


        </Route>
      </Routes>
    </div>
  )
}

export default Approutes