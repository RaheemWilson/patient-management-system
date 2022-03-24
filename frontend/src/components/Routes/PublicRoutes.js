import React, { useContext } from 'react'
import { Navigate, Outlet } from 'react-router-dom'
import SessionContext from '../../provider/SessionContext'

const  PublicRoutes = (props) =>{
    const { session } = useContext(SessionContext)

    if(session){
        if(session.userType === "patient"){
            return <Navigate to="/patient/dashboard"/>
        } else{
            return <Navigate to="/doctor/dashboard"/>
        }
    } else {
        return <Outlet />
    }
}
	
export default PublicRoutes;