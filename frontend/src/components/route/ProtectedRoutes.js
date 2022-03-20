import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import SessionContext from '../../provider/SessionContext'

const  ProtectedRoutes = (props) =>{
    const { session } = useContext(SessionContext)

    return session ? <Outlet/> : <Navigate to="/auth/login"/>
}
	
export default ProtectedRoutes;