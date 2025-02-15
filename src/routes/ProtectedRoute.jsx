import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = ({ children, isAllowed, redireccionar="/login"}) => {

    if(!isAllowed){
        return <Navigate to={redireccionar} replace />
    }

    return children? children: <Outlet/>
}
