import { useContext, useEffect, useState } from "react"
import PatientAppointments from "../../components/Appointments/PatientAppointments"
import SessionContext from "../../provider/SessionContext"
import { getAppointments } from "../../util/api/appointment"
import { dateOptions } from "../../util/general"
import { Skeleton, List } from 'antd';
import './dashboard.scss'
import { success } from "../../components/AntComponents/Notification"
import "antd/dist/antd.less";

export default function Dashboard() {
    let { session } = useContext(SessionContext)
    const [appointments, setAppointments] = useState(null)
    const firstName = session.user.firstName

    

    let today = new Date()
    let todayStr = today.toLocaleString('en-US', dateOptions)

    useEffect(() => {
        console.log(session)
        success()
       getAppointments(session?.authToken)
        .then(res => {
           console.log(res)
           setTimeout(() => {
               setAppointments([...res.appointments])
           }, 5000);
       })
    }, [])

    if(!appointments){
        return (
            <div className="skeleton-board">
                <h1>Welcome, {firstName}!</h1>
                <List
                    itemLayout="vertical"
                    size="large"
                    dataSource={[...Array(8).keys()]}
                    renderItem={_ => (
                        <List.Item>
                            <Skeleton active />
                        </List.Item>
                    )}
                >
                </List>
            </div>
        )
    }
    

    return (
        <div>
            <div className="dashboard-header">
                <h1>Welcome, <span>{firstName}!</span></h1>
                <p>{todayStr}</p>
            </div>
            <p className="info">
                Lorem ipsum dolor sit, amet consectetur adipisicing elit. Reiciendis, dolorum laudantium quia ipsam repudiandae ut itaque. 
                Ut aperiam quas eos voluptatum expedita, tempore porro, assumenda obcaecati eveniet hic consectetur fugit.
            </p>
            {
                appointments.length > 0 && (
                    <PatientAppointments appointments={appointments}/>
                )
            }
        </div>
    )
}