import React from 'react'
import { Navigate } from 'react-router-dom'

export default function RedirectUserToHome({ children }) {
    const auth=localStorage.getItem('token')
    //console.log(children )
  return (
    <div>
        {auth ? <Navigate to="/"/> : children}
    </div>
  )
}


