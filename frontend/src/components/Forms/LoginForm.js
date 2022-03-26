import React from 'react';
import { loginPatient } from '../../util/api/patient';
import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import SessionContext from '../../provider/SessionContext'
import { loginDoctor } from '../../util/api/doctor';
import { useNotifications } from '@mantine/notifications';
import { Check } from 'tabler-icons-react';

function LoginForm({ isPatient }) {
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues: { isPatient: isPatient }});
    const notifications = useNotifications();

    const { session, setSession } = useContext(SessionContext)
    console.log(session, "Login")

    const onSubmit = async (data) => {
       let res = isPatient ? await loginPatient(data) : await loginDoctor(data)
    
        if(res){
            notifications.showNotification({
                message: "You have successfully logged in!",
                icon: <Check size={20}/>,
                color: "teal"
            })
            setSession({...res, auth: true})
            if(res.userType === "patient")
                navigate(`${res.user.isUpdated? "/patient/dashboard" : "/patient/profile"}`)
            else{
                navigate(`/doctor/dashboard`)
            }
        } else {
            setTimeout(() => {
                setError(true)
            }, 4000);
        }
    };

    return (
        <div className='form'>
            { error && <p className='error'>There is an error in authenticating your credentials, please try again.</p> }
            <form onSubmit={handleSubmit(onSubmit)}>
                { isPatient && (
                    <div>
                        <label htmlFor="email">Email</label>
                        <input 
                            type="email" 
                            {
                                ...register('email', { 
                                    required: true, 
                                })
                            } 
                        />
                        {errors?.email?.type === "required" && <p>This field is required.</p>}
                    </div>
                )}
                {
                    !isPatient && (
                        <div>
                            <label htmlFor="doctorId">Doctor's ID</label>
                            <input 
                                type="text" 
                                {
                                    ...register('doctorId', { 
                                        required: true, 
                                    })
                                } 
                            />
                            {errors?.doctorId?.type === "required" && <p>This field is required.</p>}
                        </div>
                    )
                }
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        {
                            ...register('password', { 
                                required: true, 
                                pattern: "^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$"
                            })
                        }
                    />
                    { errors?.password?.type === "required" && <p>This field is required.</p>}  
                </div>
                <button  className='button' type="submit">Login</button>
            </form>
            <div className='signUpOption'>
                {`Don't have an account? `} 
                <Link to={{ 
                    pathname: `/auth/signup?user=${isPatient?"patient":"doctor"}`,
                }} className='ref'>
                    Sign up
                </Link> 
                {` here.`}
            </div>
        </div>
    );
}

export default LoginForm;