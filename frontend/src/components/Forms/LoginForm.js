import React from 'react';
import { loginPatient } from '../../util/api/patient';
import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import SessionContext from '../../provider/SessionContext'

function LoginForm() {
    const [error, setError] = useState(false)
    const navigate = useNavigate()
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const { setSession } = useContext(SessionContext)

    const onSubmit = async (data) => {
        let res = await loginPatient(data)
    
        if(res){
            setSession({...res, auth: true})
            navigate(`${res.user.isUpdated? "/patient/dashboard" : "/patient/profile"}`)
        } else {
            setError(true)
        }
    };

    return (
        <div className='form'>
            { error && <p className='error'>There is an error in authenticating your credentials, please try again.</p> }
            <form onSubmit={handleSubmit(onSubmit)}>
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
                <Link to="/auth/signup" className='ref'>
                    Sign up
                </Link> 
                {` here.`}
            </div>
        </div>
    );
}

export default LoginForm;