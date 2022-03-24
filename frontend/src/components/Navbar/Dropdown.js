import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import SessionContext from "../../provider/SessionContext"
import avatar from '../../assets/images/no-profile-picture.svg'
import './navbar.scss'


export default function Dropdown() {
    const { session, setSession } = useContext(SessionContext)
    const navigate = useNavigate()

    const handleSignOut = () => {
        setSession(null)
        navigate(`/auth/login?user=${session.userType === "patient"? "patient": "doctor"}`)
    }

    return (
        (
                <div className="dropDownContainer">
                    <img 
                        src={avatar} 
                        alt="User profile" 
                        className='avatar'
                        width={40}
                        height={40}
                    />
                    <div className="dropDown">
                        <span>
                            Signed in as <strong>{session?.user?.email}</strong>
                        </span>
                        <hr />
                        <Link to="/patient/profile">Profile</Link>
                        <p onClick={handleSignOut} role="button">
                            Signout
                        </p>
                    </div>
                </div>

            )
        
    )
}