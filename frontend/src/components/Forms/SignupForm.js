import React from 'react';
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { createDoctor } from '../../util/api/doctor';
import { createPatient } from '../../util/api/patient';
import { info } from '../AntComponents/Modal';
import { successfulSignUp } from '../AntComponents/Notification';
// import "antd/dist/antd.less";

function SignupForm({ isPatient }) {
    const [passwordCheck, setPasswordCheck] = useState(false)
    const [error, setError] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm({ defaultValues: { isPatient: isPatient }});
    
    const navigate = useNavigate()

    const onSubmit =  async (data) => {
        if(data.password !== data.cpassword){
            setPasswordCheck(true)
        } else {
            if(isPatient){
                let res = await createPatient(data)
                if(res){
                    successfulSignUp()
                    navigate("/auth/login?user=patient")
                } else {
                    setError(true)
                }
            } else {
                let res = await createDoctor(data)
        
                if(res){
                    info(res.doctorId)
                    navigate("/auth/login?user=doctor")
                } else {
                    setError(true)
                }
            }

        }
    };

    return (
        <div className='form'>
            { error && <p className='error'>There is an error in creating your account please try again</p> }
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className='name'>
                    <div>
                        <label htmlFor="firstName">First name</label>
                        <input 
                            type="text"
                            {
                                ...register('firstName', { 
                                    required: true, 
                                    maxLength: 20,
                                    pattern: /^[A-Za-z]+$/i
                                })
                            }
                        />
                    </div>
                    <div>
                        <label htmlFor="lastName">Last name</label>
                        <input 
                            type="text"
                            {
                                ...register('lastName', { 
                                    required: true, 
                                    maxLength: 20,
                                    pattern: /^[A-Za-z]+$/i
                                })
                            }
                            />
                    </div>
                    {errors?.firstName?.type === "required" && <p>First name is required.</p>}
                    {errors?.lastName?.type === "required" && <p>Last name is required.</p>}
                </div>
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
                { !isPatient && (
                    <div>
                        <label htmlFor="telephone">Telephone</label>
                        <input 
                            type="tel" 
                            {
                                ...register('telephone', { 
                                    required: true, 
                                })
                            } 
                        />
                        {errors?.telephone?.type === "required" && <p>This field is required.</p>}
                    </div>
                )}
                <div>
                    <label htmlFor="password">Password</label>
                    <input 
                        type="password" 
                        {
                            ...register('password', { 
                                required: true, 
                                pattern: /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/
                            })
                        }
                    />
                    { errors?.password?.type === "required" && <p>This field is required.</p>}  
                    {errors?.password?.type === "pattern" &&  
                        <p className='passwordCheck'>* Password must contain at least 8 characters including 
                            at least one uppercase letter, one lowercase letter, 
                            one number and one special character.</p>
                    }

                </div>
                <div>
                    <label htmlFor="cpassword">Confirm Password</label>
                    <input 
                        type="password" 
                        {
                            ...register('cpassword', { 
                                required: true, 
                            })
                        }
                    />
                    { errors?.cpassword?.type === "required" && <p>This field is required.</p>}  
                    { passwordCheck && <p>Passwords do not match</p> }
                </div>
                <button  className='button' type="submit">Sign up</button>
            </form>
            <div className='signUpOption'>
                {`Already have an account? `} 
                <Link to={{ 
                    pathname: `/auth/login?user=${isPatient?"patient":"doctor"}`,
                }} className='ref'>
                    Login
                </Link> 
                {` instead`}
            </div>
        </div>
    );
}

export default SignupForm;