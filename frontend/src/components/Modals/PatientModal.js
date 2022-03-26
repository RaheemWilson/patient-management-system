import { Modal } from '@mantine/core';

export default function PatientModal({ 
    handleOpened,
    opened,
    name, 
    reason, 
    appointmentDate, 
    status 
}) {
  

  return (
    <>
      <Modal
        opened={opened}
        onClose={() => handleOpened(false)}
        title="Appointment"
        className='appointment-modal'
      >
        <p><span>Consultation with:</span>{" Dr. " + name }</p>
        <p><span>Appointment time:</span>{" " + appointmentDate}</p>
        <p><span>Reason for consultation:</span>{" " + reason}.</p>
        
        {
            status === "Pending" ? ( 
                <p>Your appointment is still <span>{status}</span>.</p>
            ) : (
                <p>Your appointment was <span>{status}</span>.</p>
            )
        }
      </Modal>
    </>
  );
}