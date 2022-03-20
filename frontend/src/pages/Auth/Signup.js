import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import backArrow from '../../assets/icons/arrow_back.svg'
import { createPatient } from '../../util/api/patient'
import './auth.scss'


export default function Signup() {
    const [passwordCheck, setPasswordCheck] = useState(false)
    const [error, setError] = useState(false)
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();
    const navigate = useNavigate()

    const onSubmit =  async (data) => {
        if(data.password !== data.cpassword){
            setPasswordCheck(true)
        } else {
            let res = await createPatient(data)
    
            if(res){
                navigate("/auth/login")
            } else {
                setError(true)
            }

        }
    

    };
    return (
        <div className='authContainer'>
            <div className='imageContainer signupImage'>
                <Link to="/" className='returnHome'>
                        <img src={backArrow} alt="Navigation to home page"/>
                        Go to homepage
                </Link>
            </div>
            <div className='formContainer'>
                <h1 className='formHeader'>Welcome</h1>
                <p className='formDesc'>Signup to book an appointment on consulto.</p>
                { error && <p className='error'>There is an error in creating your account please try again</p> }
                <div className='form'>
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
                        <Link to="/auth/login" className='ref'>
                            Login
                        </Link> 
                        {` instead`}
                    </div>
                </div>
            </div>
        </div>
    )
}