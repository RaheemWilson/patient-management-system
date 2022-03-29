import React from 'react';
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { createDoctor } from '../../util/api/doctor';
import { createPatient } from '../../util/api/patient';
import { Modal, Button } from '@mantine/core';

function SignupForm({ isPatient }) {
    const [passwordCheck, setPasswordCheck] = useState(false)
    const [openModal, setOpenModal] = useState(false)
    const [id, setId] = useState(null)
    const [emailSent, setEmailSent] = useState(false)
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
            setTimeout(() => {
                setPasswordCheck(false)
            }, 4000);
        } else {
            if(isPatient){
                let res = await createPatient(data)
                if(res){
                    navigate("/auth/login?user=patient")
                } else {
                    setError(true)
                    setTimeout(() => {
                        setError(false)
                    }, 4000);
                }
            } else {
                let res = await createDoctor(data)
        
                if(res){
                    if(res.email.length > 0){
                        setEmailSent(true)
                    }
                    setId(res.doctorId)
                    setOpenModal(true)
                } else {
                    setError(true)
                    setTimeout(() => {
                        setError(false)
                    }, 4000);
                }
            }

        }
    };

    const handleClose = () => {
        setOpenModal(false)
        navigate("/auth/login?user=doctor")
    }

    return (
        <div className='form'>
        
            <Modal
                opened={openModal}
                onClose={handleClose}
                withCloseButton={true}
            >
                <div className='modal'>
                    <p>
                        For subsequent login in purposes you will be required to use your assigned ID Number.
                    </p>
                    <p>
                        {
                            emailSent ? "Check your email for your login details" : ""
                        }
                    </p>
                    <p>ID Number is <strong>{id}</strong>.</p>
                    <div>
                        <Button 
                            radius={6} 
                            color="white" 
                            variant='filled'
                            onClick={handleClose}
                        >Ok</Button>
                    </div>
                </div>
            </Modal>
            
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