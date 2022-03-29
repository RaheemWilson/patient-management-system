import React, { useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import AppointmentForm from '../../components/Forms/AppointmentForm';
import SessionContext from '../../provider/SessionContext';

import './appointment.scss'

function Appointment() {
    const { session } = useContext(SessionContext)
    const navigate = useNavigate()
    useEffect(() => {
        if(!session?.user?.isUpdated){
            navigate("/patient/profile")
        }
    }, [])
    

    return (
        <div className='aptformContainer'>
            <h1 className='aptHeader'>Book an <span>appointment</span></h1>
            <p className='aptDesc'>Schedule a suitable time to consult your doctor. Doctor's confirmation takes up to 24 hours.</p>
            <AppointmentForm />
        </div>
    );
}

export default Appointment;