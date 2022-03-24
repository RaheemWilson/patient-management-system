import { useContext, useEffect, useState } from "react"
import PatientAppointments from "../../components/Appointments/PatientAppointments"
import SessionContext from "../../provider/SessionContext"
import { getAppointments } from "../../util/api/appointment"
import { dateOptions } from "../../util/general"
// import { Skeleton, List } from 'antd';
// import "antd/dist/antd.less";
import './dashboard.scss'

export default function Dashboard() {
    let { session } = useContext(SessionContext)
    const [appointments, setAppointments] = useState([])
    const firstName = session.user.firstName

    

    let today = new Date()
    let todayStr = today.toLocaleString('en-US', dateOptions)

    useEffect(() => {
        async function fetchData(){
            let res = await getAppointments(session?.authToken)
            console.log(res)
            setTimeout(() => {
                setAppointments([res.appointments])
            }, 10000);
        }
        fetchData()
    }, [])

    
    /* {
    //     !appointments && (
    //         <div className="skeleton-board">
    //             <h1>Welcome, {firstName}!</h1>
    //             <List
    //                 itemLayout="vertical"
    //                 size="large"
    //                 dataSource={[...Array(8).keys()]}
    //                 renderItem={_ => (
    //                     <List.Item>
    //                         <Skeleton active />
    //                     </List.Item>
    //                 )}
    //             >
    //             </List>
    //         </div>
    //     )
    // } */

    return (
        <div>
            <div className="dashboard-header">
                <h1>Welcome, <span>{firstName}!</span></h1>
                <p>{todayStr}</p>
            </div>
            {
                appointments.length > 0 && (
                    <PatientAppointments appointments={appointments}/>
                )
            }
        </div>
    )
}