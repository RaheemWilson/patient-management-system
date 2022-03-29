import { Modal, Button } from '@mantine/core';
import { useContext } from 'react';
import SessionContext from '../../provider/SessionContext';
import { updateAppointment } from '../../util/api/appointment';
import { useNotifications } from '@mantine/notifications';
import { RefreshContext } from '../Appointments/DoctorAppointments';

export default function DoctorModal({ 
    handleOpened,
    opened,
    name, 
    appointmentDate, 
    status,
    reason,
    otherInfo,
    id
}) {
    const notifications = useNotifications();
    const { session } = useContext(SessionContext)
    const { refresh, setRefresh } = useContext(RefreshContext)

    function capitalizeFirstLetter(string) {
        if(string){
            return string[0].toUpperCase() + string.slice(1);
        } else {
            return "User is unavailable"
        }
    }

    const handleUpdate = async (isApproved) => {
        let res = await updateAppointment(session?.authToken, isApproved, id)

        var title = ""
        var message = ""
        var color = ""

        if(res){
            title = "Update was successful"
            message = "The patient will be notified of the changes."
            color = "teal"
        } else {
            title = "Update was not successful"
            message = "Please try again to update the appointment."
            color = "red"
        }
        
        notifications.showNotification({
            title: title,
            message: message,
            color: color
        })

        if(res){
            setRefresh(!refresh)
            handleOpened()
        }

    }

    return (
        <>
            <Modal
                opened={opened}
                onClose={() => handleOpened()}
                title="Patient's Appointment"
                className='appointment-modal'
                centered
            >
                <p><span>Consultation with:</span>{name}</p>
                <p><span>Age:</span>{ otherInfo.age}</p>
                <p><span>Appointment time:</span>{appointmentDate}</p>
                <p><span>Gender:</span>{capitalizeFirstLetter(otherInfo.gender)}</p>
                <p><span>Reason for consultation:</span>{reason}</p>
                <p><span>Commordities:</span>{  otherInfo.commordities}.</p>
                <p>
                    <span>Telephone:</span>
                    <a href={`tel:${otherInfo.telephone}`}>{otherInfo.telephone}</a>
                </p>
                <div>
                    <p><span>Height:</span>{otherInfo.height} lbs.</p>
                    <p><span>Weight:</span>{otherInfo.weight} cm.</p>
                </div>
                
                {
                    status === "Pending" ? ( 
                        <div className='btns'>
                            <Button 
                                variant="subtle" 
                                color='red'
                                onClick={() => handleUpdate(false)}
                            >
                                Decline appointment
                            </Button>
                            <Button 
                                variant='filled'
                                onClick={() => handleUpdate(true)}
                            >
                                Accept appointment
                            </Button>
                        </div>
                    ) : (
                        <p>This appointment was <span>{status}.</span></p>
                    )
                }
            </Modal>
        </>
    );
}