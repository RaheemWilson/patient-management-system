import Appointment from './Appointment';

function PatientAppointments({ appointments }) {
    let now = Date.parse(new Date())

    let pastAppointments = []
    let upcomingAppointments = []

    (() => {
        appointments.forEach(appointment => {
            if(appointment.dateTime > now){
                upcomingAppointments.push(appointment)
            } else {
                pastAppointments.push(appointment)
            }
        });
    })()
    
    return (
        <div>
            <div>
                <h2>Upcoming appointments</h2>
                <div>
                    {
                        upcomingAppointments.map(appointment => {
                            return (
                                <Appointment details={appointment} time={"upcoming"}/>
                            )
                        })
                    }
                </div>
            </div>
            <div>
                <h2>Past appointments</h2>
                <div>
                    {
                        pastAppointments.map(appointment => {
                            return (
                                <Appointment details={appointment} time={"past"}/>
                            )
                        })
                    }
                </div>
            </div>
        </div>
    );
}

export default PatientAppointments;