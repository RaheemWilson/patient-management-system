import { useState, useContext } from 'react'
import { useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import backArrow from '../../assets/icons/arrow_back.svg'
import SessionContext from '../../provider/SessionContext'
import { loginPatient } from '../../util/api/patient'
import './auth.scss'

export default function Login() {
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
        <div className='authContainer'>
            <div className='imageContainer signupImage'>
                <Link to="/" className='returnHome'>
                        <img src={backArrow} alt="Navigation to home page"/>
                        Go to homepage
                </Link>
            </div>
            <div className='formContainer'>
                <h1 className='formHeader'>Welcome back</h1>
                <p className='formDesc'>Sign in to continue use consulto.</p>
                { error && <p className='error'>There is an error in authenticating your credentials, please try again.</p> }
                <div className='form'>
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
            </div>
        </div>
    )
}