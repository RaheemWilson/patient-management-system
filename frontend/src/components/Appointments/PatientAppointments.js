import { useEffect, useState } from 'react';
import PatientAppointment from './PatientAppointment';
import './appointment.scss'

function PatientAppointments({ appointments }) {
    let now = Date.parse(new Date())
    const [pastAppointments, setPastAppointments] = useState([])
    const [upcomingAppointments, setUpcomingAppointments] = useState([])

    useEffect(() => {
        appointments.forEach(appointment => {
            if(appointment.dateTime > now){
                setUpcomingAppointments(prev => [...prev, appointment])
            } else {
                setPastAppointments(prev => [...prev, appointment])
            }
        });
    }, [])
    
    
    return (
        <div>
            <div className='appointments-container'>
                <h2>Upcoming appointments</h2>
                <div className='appointments-grid'>
                    {
                        upcomingAppointments.length > 0 ? (
                            upcomingAppointments.map((appointment, index) => {
                                return (
                                    <PatientAppointment details={appointment} time={"upcoming"} key={index}/>
                            )})
                        ) : (
                            <div className="empty-appointment">
                                You have no upcoming appointments as of today. 
                            </div>
                        )
                    }
                </div>
            </div>
            <div className='appointments-container'>
                <h2>Past appointments</h2>
                <div className='appointments-grid'>
                    {
                        pastAppointments.length > 0 ? (
                            pastAppointments.map((appointment, index) => {
                                return (
                                    <PatientAppointment details={appointment} time={"past"} key={index}/>
                                )
                            })
                        ) : (
                            <div className="empty-appointment">
                                You have not been to an appointment as of today.  
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
}

export default PatientAppointments;