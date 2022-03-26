import { useContext, useEffect, useState } from "react"
import SessionContext from "../../provider/SessionContext"
import { getAppointments } from "../../util/api/appointment"
import { dateOptions } from "../../util/general"
import { Loader } from '@mantine/core';

function DoctorDashboard(props) {
    let { session } = useContext(SessionContext)
    const [appointments, setAppointments] = useState([])
    const firstName = session.user.firstName

    

    let today = new Date()
    let todayStr = today.toLocaleString('en-US', dateOptions)

    useEffect(() => {
       getAppointments(session?.authToken)
        .then(res => {
           console.log(res)
            setAppointments([...res.appointments])
       })
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
            {/* {
                appointments.length > 0 && (
                    <PatientAppointments appointments={appointments}/>
                )
            } */}
        </div>
    );
}

export default DoctorDashboard;
