import { useContext, useEffect, useState } from "react"
import { Link } from "react-router-dom"
import PatientAppointments from "../../components/Appointments/PatientAppointments"
import SessionContext from "../../provider/SessionContext"
import { getAppointments } from "../../util/api/appointment"
import { dateOptions } from "../../util/general"
import doctorSvg from '../../assets/images/doctors.svg'
import { Plus } from "tabler-icons-react"
import { Loader } from '@mantine/core';
import './dashboard.scss'

export default function Dashboard() {
    let { session } = useContext(SessionContext)
    const [appointments, setAppointments] = useState(null)
    const firstName = session.user.firstName

    let today = new Date()
    let todayStr = today.toLocaleString('en-US', dateOptions)

    useEffect(() => {
        let isMounted = true; 
        getAppointments(session?.authToken).then(res => {
            if (isMounted) setAppointments([...res.appointments]);
        })
        return () => { isMounted = false };
    }, [])

    if(!appointments){
        return (
            <div className="skeleton-board">
                <Loader size="xl" variant="dots" />;
            </div>
        )
    }
    

    return (
        <div>
            <div className="dashboard-header">
                <h1>Welcome, <span>{firstName}!</span></h1>
                <p>{todayStr}</p>
            </div>
            {
                appointments.length > 0 ? (
                    <>
                        <p className="info">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis, dolorum laudantium quia ipsam repudiandae ut itaque. 
                            Ut aperiam quas eos voluptatum expedita, tempore porro, assumenda obcaecati eveniet hic consectetur fugit.
                        </p>
                        <PatientAppointments appointments={appointments}/>
                    </>
                ) : (
                    <div className="no-appointments">
                        <img src={doctorSvg} alt="Doctors illustration" />
                        <p>There are currently no appointments for you.</p>
                        <Link to="/patient/create-appointment" className="link">
                            <Plus size={20} /> <span>Create an appointment</span>
                        </Link>
                    </div>
                )
            }
        </div>
    )
}