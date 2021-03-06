import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import SessionContext from '../../provider/SessionContext'

function DoctorRoutes(props) {
    const { session } = useContext(SessionContext)
    return session && session?.userType === "doctor" ? <Outlet/> : <Navigate to="/auth/login?user=patient"/>
}

export default DoctorRoutes;

