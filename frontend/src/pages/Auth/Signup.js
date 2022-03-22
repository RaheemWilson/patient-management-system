import { Link } from 'react-router-dom'
import backArrow from '../../assets/icons/arrow_back.svg'
import SignupForm from '../../components/Forms/SignupForm'
import './auth.scss'


export default function Signup() {
    
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
                <SignupForm />
            </div>
        </div>
    )
}