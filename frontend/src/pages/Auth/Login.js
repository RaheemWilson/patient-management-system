import { Link } from 'react-router-dom'
import backArrow from '../../assets/icons/arrow_back.svg'
import LoginForm from '../../components/Forms/LoginForm'
import useQuery from '../../hooks/query'
import './auth.scss'
export default function Login() {
    const query = useQuery();
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
                <LoginForm isPatient={query.get("user") === "patient"}/>
            </div>
        </div>
    )
}