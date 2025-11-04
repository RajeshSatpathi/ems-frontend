import React from 'react'
import { useAuth } from '../mycontext/AuthContext'
import { Navigate } from 'react-router-dom';

function PrivateRoutes({children}) {
    const { userData, loading } = useAuth();
    if(loading){
        return <div>Loading ......</div>
    }

    return  userData ? children : <Navigate to="/"/>
}

export default PrivateRoutes