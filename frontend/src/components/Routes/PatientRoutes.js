import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import SessionContext from '../../provider/SessionContext'


function PatientRoutes(props) {
    const { session } = useContext(SessionContext)
    return session && session?.userType === "patient" ? <Outlet/> : <Navigate to="/auth/login?user=patient"/>
}

export default PatientRoutes; 