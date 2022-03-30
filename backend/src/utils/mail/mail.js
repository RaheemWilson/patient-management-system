import "dotenv/config";
import { transporter } from "./transporter.js";

function successfulSignup(email, randomId, name){

    let options = {
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

    transporter.sendMail(options, function(error){
        if(!error){
            return "Email sent successfully"
        }
    });

    return ''
}


function acceptAppointment( email, appointment){
    let options = {
        from: process.env.MAIL_ADDRESS,
        to: email, 
        subject: "Your appointment was approved!",
        html: `
            <div style="padding:10px;">
            <p> Good day, ${appointment?.patient?.gender === "male"? "Mr" : "Mrs"} ${appointment?.patient?.lastName},
            your appointment with Dr. ${appointment?.doctor?.lastName} was approved. Please view details of your appointment.</p>
            <ul>
                <li>Date of consultation: <strong>${new Date(appointment.dateTime).toLocaleString()}</strong></li>
                <li>Reason for consultation: <strong>${appointment.reason}</strong></li>
                <li>Doctor for consultation: <strong>${appointment.doctor.firstName} ${appointment.doctor.lastName}</strong></li>
            </ul>
            <p>If you have any further queries please contact Dr. ${appointment?.doctor?.lastName}:</p>
            <a href="tel:${appointment.doctor.telephone}">${appointment.doctor.telephone}</a>

            <p>Thanks for your cooperation and please make every effort to be on time for your consultation.</p>
        `
    }

    transporter.sendMail(options, function(error){
        if(!error){
            return "Email sent successfully"
        }
    });

    return ''
}

function declineAppointment( email, appointment){
    let options = {
        from: process.env.MAIL_ADDRESS,
        to: email, 
        subject: "Your appointment was declined!",
        html: `
            <div style="padding:10px;">
            <p> Good day ${appointment?.patient?.gender === "male"? "Mr" : "Mrs"} ${appointment?.patient?.lastName},
            sorry to inform you that your appointment with Dr. ${appointment?.doctor?.lastName} was declined. Please view details of your appointment.</p>
            <ul>
                <li>Date of consultation: <strong>${new Date(appointment.dateTime).toLocaleString()}</strong></li>
                <li>Reason for consultation: <strong>${appointment.reason}</strong></li>
                <li>Doctor for consultation: <strong>${appointment.doctor.firstName} ${appointment.doctor.lastName}</strong></li>
            </ul>
            <p>If you have any further queries please contact Dr. ${appointment?.doctor?.lastName}:</p>
            <a href="tel:${appointment.doctor.telephone}">${appointment.doctor.telephone}</a>

            <p>Thanks for your cooperation and please make every effort to be on time for your consultation.</p>
        `
    }

    transporter.sendMail(options, function(error){
        if(!error){
            return "Email sent successfully"
        }
    });

    return ''
}

module.exports = {
    successfulSignup,
    acceptAppointment,
    declineAppointment
}