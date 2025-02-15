import React from 'react'
import { Navigate, Outlet } from 'react-router-dom'

export const ProtectedRoute = ({ children, isAllowed, redireccionar="/"}) => {

    if(!isAllowed){
        return <Navigate to={redireccionar} />
    }

    return children? children: <Outlet/>
}
