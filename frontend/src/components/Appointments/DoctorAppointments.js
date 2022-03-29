import { useEffect, useState, createContext, useContext } from 'react';
import DoctorAppointment from './DoctorAppointment';
import { getAppointments } from '../../util/api/appointment';
import './appointment.scss'
import SessionContext from '../../provider/SessionContext';

export const RefreshContext = createContext({})

function DoctorAppointments(props) {
    let now = Date.parse(new Date())
    const [appointments, setAppointments] = useState([...props.appointments])
    const [pastAppointments, setPastAppointments] = useState([])
    const [upcomingAppointments, setUpcomingAppointments] = useState([])
    const [refresh, setRefresh] = useState(true)
    const { session } = useContext(SessionContext)

    useEffect(() => {
        getAppointments(session?.authToken)
        .then(res => {
            setPastAppointments([])
            setUpcomingAppointments([])
            setAppointments([...res.appointments])
       })
    }, [refresh])

    useEffect(() => {
        appointments.forEach(appointment => {
            if(appointment.dateTime > now){
                setUpcomingAppointments(prev => [...prev, appointment])
            } else {
                setPastAppointments(prev => [...prev, appointment])
            }
        });
    }, [appointments])
    

    return (
        <RefreshContext.Provider value={{ refresh, setRefresh }}>
            <div>
                <div className='appointments-container'>
                    <h2>Upcoming appointments</h2>
                    <div className='appointments-grid'>
                        {
                            upcomingAppointments.length > 0 ? (
                                upcomingAppointments.map((appointment, index) => {
                                    return (
                                        <DoctorAppointment 
                                            details={appointment} 
                                            time={"upcoming"} 
                                            key={index}
                                        />
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
                                        appointment?.patient?.firstName ? (
                                            <DoctorAppointment details={appointment} time={"past"} key={index}/>
                                        ) : null
                                    )
                                })
                            ) : (
                                <div className="empty-appointment">
                                    You had no consultation as of today.  
                                </div>
                            )
                        }
                    </div>
                </div>
            </div>
        </RefreshContext.Provider>
    );
}

export default DoctorAppointments;