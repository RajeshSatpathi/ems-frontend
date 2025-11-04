import React from 'react'
import { useAuth } from '../mycontext/AuthContext'
import { Navigate } from 'react-router-dom';

function RoleBasedRoutes({ children, requiredRole }) {
    const { userData, loading } = useAuth();
    if (loading) {
        return <div>Loading ......</div>
    }
    if (!requiredRole.includes(userData.role)) {
        <Navigate to="/unathorized" />
    }
    if (userData.role === 'employee' && !requiredRole.includes('employee')) {
    return <Navigate to="/employee-dashboard" replace />;
  }
    return userData ? children : <Navigate to="/"/>
}

export default RoleBasedRoutes