import { Avatar } from "@mantine/core"
import { useContext } from "react"
import { Link, useNavigate } from "react-router-dom"
import SessionContext from "../../provider/SessionContext"
import { deleteUser } from "../../util/api/user"
import './navbar.scss'


export default function Dropdown() {
    const { session, setSession } = useContext(SessionContext)
    const navigate = useNavigate()

    const handleSignOut = async () => {
        let signout = await deleteUser(session.authToken)

        if(signout){
            setSession(null)
            localStorage.removeItem("authToken")
            navigate(`/auth/login?user=${session.userType === "patient"? "patient": "doctor"}`)
        }
    }
    let initials = session?.user?.firstName[0] + session?.user?.lastName[0]
    let name = session?.user?.firstName + " " +session?.user?.lastName
    return (
        (
                <div className="dropDownContainer">
                    <Avatar 
                        src={null} 
                        alt={name} 
                        color="blue"
                        className="avatar"
                        size="md"
                    >{initials} 
                    </Avatar>
                    <div className="dropDown">
                        <span>
                            Signed in as <strong>{session?.user?.email}</strong>
                        </span>
                        <hr />
                        {
                            session?.userType === "patient" && (<Link to="/patient/profile">Your Profile</Link>)
                        }
                        <p onClick={handleSignOut} role="button">
                            Signout
                        </p>
                    </div>
                </div>

            )
        
    )
}