import React from 'react';
import { useForm } from 'react-hook-form'
import { useState, useContext } from 'react'
import {  useNavigate } from 'react-router-dom'
import SessionContext from '../../provider/SessionContext'
import { createAppointment } from '../../util/api/appointment';


function AppointmentForm() {
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const { session } = useContext(SessionContext)

    const onSubmit = async (data) => {
        let res = await createAppointment(data, session?.authToken)
    
        if(res){
            setError(false)
            navigate("/patient/dashboard")
        } else {
            setError(true)
        }

    };

    // useEffect(() => {
      
    
    //   return () => {
    //     second
    //   }
    // }, [third])
    

    return (
        <div className='appointmentForm'>
            { error && <p className='error'>There is an error in creating your appointment, please try again.</p> }
            <form onSubmit={handleSubmit(onSubmit)}>
                <div>
                    <label htmlFor="doctor">Doctor</label>
                    <select {...register("doctor", { required: true })}>
                        <option 
                            value="" 
                            defaultValue="Choose your doctor" 
                            disabled 
                            hidden
                        > Choose your doctor
                        </option>
                        {/* {
                            doctors.map((doctor, index) => {
                                let name = doctor.firstName+" "+doctor.lastName+" "+doctor.creditials
                                return (
                                    <option value={`${doctor.id}`}>{ name }</option>
                                )
                            })
                        } */}
                        <option value="1234459ddndsj">Dr. Wright Wilson</option>
                        
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