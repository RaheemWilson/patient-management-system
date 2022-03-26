import React from 'react';
import { dateOptions } from '../../util/general';
import upcoming from '../../assets/icons/schedule_black.svg'
import history from '../../assets/icons/history_black.svg'

function DoctorAppointment({ details, time }) {
    const patientsName = [details.patient.firstName, details.patient.lastName].join(" ")
    const appointmentDate = new Date(details.dateTime).toLocaleString('en-US', {...dateOptions, 
        hour: 'numeric', 
        minute: 'numeric',
        hour12: true
    })
    const status = details.isApproved === null ? "Pending" : details.isApproved ? "Approved" : "Declined"
    return (
        <div className='appointment-card'>
            <h3>Dr. {patientsName}</h3>
            <p className='reason'>Purpose: {details.reason}</p>
            <div className='appointment-date'>
                <img src={ time === "past" ? history : upcoming} alt="Time icon" />
                <span>{appointmentDate}</span>
            </div>
            <div className='status'>
                <div className={`indicator ${status}`}></div>
                <span>{status}</span>
            </div>
        </div>
    );
}

export default DoctorAppointment;