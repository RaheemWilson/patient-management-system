import { useContext } from "react"
import { Link } from "react-router-dom"
import SessionContext from "../../provider/SessionContext"
import avatar from '../../assets/images/no-profile-picture.svg'
import './navbar.scss'

export default function Dropdown() {
    const { session } = useContext(SessionContext)
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
                        <Link to="/dashboard">Profile</Link>
                        <p>
                            Signout
                        </p>
                    </div>
                </div>

            )
        
    )
}