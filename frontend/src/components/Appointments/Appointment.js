import React from 'react';
import { dateOptions } from '../../util/general';
import upcoming from '../../assets/icons/schedule_black.svg'
import history from '../../assets/icons/history_black.svg'

function Appointment({ details, time }) {
    const doctorsName = [details.doctor.firstName, details.doctor.lastName].join(" ")
    const appointmentDate = new Date(details.dateTime).toLocaleString('en-US', {...dateOptions, 
        hour: 'numeric', 
        minute: 'numeric',
        hour12: true
    })
    const status = details.status === null ? "Pending" : details.status ? "Approved" : "Declined"
    return (
        <div>
            <h2>Dr. {doctorsName}</h2>
            <p>Reason: {details.reason}</p>
            <div>
                <img src={ time === "past" ? history : upcoming} alt="Time icon" />
                <p>{appointmentDate}</p>
            </div>
            <div>
                <div className={`indicator ${status}`}></div>
                <p>{status}</p>
            </div>
        </div>
    );
}

export default Appointment;