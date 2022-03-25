import { useContext, useEffect, useState } from "react"
import SessionContext from "../../provider/SessionContext"
import { getAppointments } from "../../util/api/appointment"
import { dateOptions } from "../../util/general"

function DoctorDashboard(props) {
    let { session } = useContext(SessionContext)
    const [appointments, setAppointments] = useState([])
    const firstName = session.user.firstName

    

    let today = new Date()
    let todayStr = today.toLocaleString('en-US', dateOptions)

    useEffect(() => {
        console.log(session)
       getAppointments(session?.authToken)
        .then(res => {
           console.log(res)
        //    setTimeout(() => {
               setAppointments([...res.appointments])
        //    }, 10000);
       })
    }, [])
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
