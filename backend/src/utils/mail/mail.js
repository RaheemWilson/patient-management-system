import "dotenv/config";

export const successfulSignup = (email, randomId, name) => {
    return {
        from: process.env.MAIL_ADDRESS,
        to: email, 
        subject: "Successful Sign up on consulto",
        text: "",
        html: `
            <div style="padding:10px;">
            <p>Dr. ${name} your account was created. Please view details to login.</p>
            <h3>Contact Details</h3>
            <ul>
                <li>Your assigned id is <strong>${randomId}</strong></li>
            </ul>
            <p>For subsequent login in purposes you will be required to use your assigned ID number.</p>
        `
    }
}


export const acceptAppointment = ( email, appointment) => {
    return {
        from: process.env.MAIL_ADDRESS,
        to: email, 
        subject: "Your appointment was approved!",
        html: `
            <div style="padding:10px;">
            <p> Good day, ${appointment?.patient?.gender === "male"? "Mr" : "Mrs"} ${appointment?.patient?.lastName}
            your appointment with Dr. ${appointment?.doctor?.lastName}. Please view details of your appointment.</p>
            <ul>
                <li>Date of consultation: <strong>${new Date(appointment.dateTime).toLocaleString()}</strong></li>
                <li>Reason for consultation: <strong>${new Date(appointment.dateTime).toLocaleString()}</strong></li>
                <li>Doctor for consultation: <strong>${appointment.doctor.firstName} ${appointment.doctor.lastName}</strong></li>
            </ul>
            <p>If you have any further queries please contact Dr. ${appointment?.doctor?.lastName}</p>
            <a href="tel:${appointment.doctor.telephone}">${appointment.doctor.telephone}</a>

            <p>Thanks for your cooperation and please make every effort to be on time for your consultation</p>
        `
    }
}