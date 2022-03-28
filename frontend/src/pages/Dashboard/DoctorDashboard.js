import { useContext, useEffect, useState } from "react"
import SessionContext from "../../provider/SessionContext"
import { getAppointments } from "../../util/api/appointment"
import { dateOptions } from "../../util/general"
import doctorSvg from '../../assets/images/doctors.svg'
import { Loader } from '@mantine/core';
import DoctorAppointments from '../../components/Appointments/DoctorAppointments'

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
                <h1>Welcome,  <span>Dr. {firstName}!</span></h1>
                <p>{todayStr}</p>
            </div>
            {
                appointments.length > 0 ? (
                    <>
                        <p className="info">
                            Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis, dolorum laudantium quia ipsam repudiandae ut itaque. 
                            Ut aperiam quas eos voluptatum expedita, tempore porro, assumenda obcaecati eveniet hic consectetur fugit.
                        </p>
                        <DoctorAppointments appointments={appointments}/>
                    </>
                ) : (
                    <div className="no-appointments">
                        <img src={doctorSvg} alt="Doctors illustration" />
                        <p>There are currently no appointments for you.</p>
                    </div>
                )
            }
        </div>
    );
}

export default DoctorDashboard;
