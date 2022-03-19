import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import SessionContext from '../../provider/SessionContext'

const  PublicRoutes = (props) =>{
    const { session } = useContext(SessionContext)

    return session ? <Navigate to="/dashboard"/> : <Outlet />
}
	
export default PublicRoutes;