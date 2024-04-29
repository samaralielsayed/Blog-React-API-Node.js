import React from 'react'
import { Outlet, Navigate } from 'react-router-dom'
export default function ProtectedRoute({ children }) {
    const auth=localStorage.getItem('token')
    //console.log(children )
    return(
    <>
       {auth ? children : <Navigate to="/login" />}
    </>
    )
}
