import React, { useState } from 'react';
import { dateOptions } from '../../util/general';
import upcoming from '../../assets/icons/schedule_black.svg'
import history from '../../assets/icons/history_black.svg'
import DoctorModal from '../Modals/DoctorModal';
import BadgeComponent from '../Badge/Badge';

function DoctorAppointment({ details, time }) {
    const [opened, setOpened] = useState();
    const patientsName = [details?.patient?.firstName, details.patient?.lastName].join(" ")
    const appointmentDate = new Date(details.dateTime).toLocaleString('en-US', {...dateOptions, 
        hour: 'numeric', 
        minute: 'numeric',
        hour12: true
    })
    const status = details?.isApproved === null ? "Pending" : details?.isApproved ? "Approved" : "Declined"
    
    const closeModal = () => {
        setOpened(false)
    }

    return (
        <>
            <div className='appointment-card' onClick={() => setOpened(true)}>
                <h3>{patientsName}</h3>
                <p className='reason'>Purpose: {details?.reason}</p>
                <div className='appointment-date'>
                    <img src={ time === "past" ? history : upcoming} alt="Time icon" />
                    <span>{appointmentDate}</span>
                </div>
                <div className='status'>
                    <BadgeComponent status={status} />
                </div>
            </div>
            <DoctorModal 
                opened={opened}
                handleOpened={closeModal}
                name={patientsName}
                appointmentDate={appointmentDate}
                status={status}
                reason={details?.reason}
                otherInfo={{...details?.patient}}
                id={details?._id}
            />
        </>
    );
}

export default DoctorAppointment;