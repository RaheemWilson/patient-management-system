import React, { useState } from 'react';
import { dateOptions } from '../../util/general';
import upcoming from '../../assets/icons/schedule_black.svg'
import history from '../../assets/icons/history_black.svg'
import PatientModal from '../Modals/PatientModal';

function PatientAppointment({ details, time }) {
    const [opened, setOpened] = useState();
    const doctorsName = [details.doctor.firstName, details.doctor.lastName].join(" ")
    const appointmentDate = new Date(details.dateTime).toLocaleString('en-US', {...dateOptions, 
        hour: 'numeric', 
        minute: 'numeric',
        hour12: true
    })
    const status = details.isApproved === null ? "Pending" : details.isApproved ? "Approved" : "Declined"

    const closeModal = () => {
        setOpened(false)
    }


    return (
        <>
            <div className='appointment-card' onClick={() => setOpened(true)}>
                <h3>Dr. {doctorsName}</h3>
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
            <PatientModal 
                opened={opened}
                handleOpened={closeModal}
                name={doctorsName}
                appointmentDate={appointmentDate}
                status={status}
                reason={details.reason} 
            />
        </>
    );
}

export default PatientAppointment;