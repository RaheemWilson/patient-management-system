import React from 'react';
import AppointmentForm from '../../components/Forms/AppointmentForm';
import './appointment.scss'

function Appointment() {
    return (
        <div className='aptformContainer'>
            <h1 className='aptHeader'>Book an appointment</h1>
            <p className='aptDesc'>Schedule a suitable time to consult your doctor. Doctor's confirmation takes up to 24 hours.</p>
            <AppointmentForm />
        </div>
    );
}

export default Appointment;