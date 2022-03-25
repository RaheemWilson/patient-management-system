import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import SessionContext from '../../provider/SessionContext'

const  ProtectedRoutes = (props) =>{
    const { session } = useContext(SessionContext)

    return session?.auth ? <Outlet/> : <Navigate to="/auth/login?user=patient"/>
}
	
export default ProtectedRoutes;