import React from 'react';
import { useForm } from 'react-hook-form'
import { useState, useContext, useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'
import SessionContext from '../../provider/SessionContext'
import { createAppointment } from '../../util/api/appointment';
import { getDoctors } from '../../util/api/doctor';
import { useNotifications } from '@mantine/notifications';

function AppointmentForm() {
    const [error, setError] = useState(false)
    const [doctors, setDoctors] = useState([])
    const navigate = useNavigate()
    const notifications = useNotifications();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({
        defaultValues: {
            doctor: "",
        }
    });
    const { session } = useContext(SessionContext)

    const onSubmit = async (data) => {
        let res = await createAppointment(data, session?.authToken)
    
        if(res){
            notifications.showNotification({
                title: "Your appointment was created",
                message: "Your doctor will respond as soon as possible.",
            })
            setError(false)
            navigate("/patient/dashboard")
        } else {
            setTimeout(() => {
                setError(true)
            }, 4000);
        }

    };

    useEffect(() => {
      getDoctors(session.authToken)
      .then(res => {
          setDoctors(res.doctors)
      })
    }, [])
    

    return (
        <div className='appointmentForm'>
            { error && <p className='error'>There is an error in creating your appointment, please try again.</p> }
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="doctor">Doctor</label>
                    <select {...register("doctor", { required: true })}>
                        <option 
                            defaultValue="Choose your doctor" 
                            disabled 
                            hidden
                        > Choose your doctor
                        </option>
                        {
                            doctors.map((doctor, index) => {
                                let name = doctor.firstName+" "+doctor.lastName
                                return (
                                    <option value={`${doctor._id}`} key={index}>Dr. { name }</option>
                                )
                            })
                        }
                    </select>
                    {errors?.doctor?.type === "required" && <p>This field is required.</p>}
                </div>
                <div>
                    <label htmlFor="dateTime">Date and Time of Appointment</label>
                    <input 
                        type="datetime-local" 
                        {
                            ...register('dateTime', { 
                                required: true, 
                            })
                        } 
                    />
                    {errors?.dateTime?.type === "required" && <p>This field is required.</p>}
                </div>
                <div>
                    <label>Reason for consultation</label>
                    <textarea {...register('reason', { required: true})} />
                </div>
                <button type="submit">Create appointment</button>
            </form>
        </div>
    );
}

export default AppointmentForm;