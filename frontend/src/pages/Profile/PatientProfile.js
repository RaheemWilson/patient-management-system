import { useContext, useState } from "react"
import SessionContext from "../../provider/SessionContext"
import ProfileIcon from '../../assets/icons/person_black.svg'
import AccountIcon from '../../assets/icons/settings_black.svg'
import EditProfile from "./EditProfile"
import DeleteAccount from "./DeleteAccount"
import './profile.scss'

export default function Profile(){
    const { session, useSession } = useContext(SessionContext)
    const [active, setActive] = useState("profile")
    let userName = session?.user?.firstName+" "+session?.user?.lastName 

    const handleClick = (tab) => {
        setActive(tab)
    }
    return(
        <div>
            <div>
                <p><strong>{ userName || "User" }</strong></p>
                <p>Your personal account</p>
            </div>
            <div className="profile-container">
                <aside className="opts-container">
                    <ul className="profile-options">
                        <li onClick={() => handleClick("profile")}>
                            <img src={ProfileIcon} alt="Profile icon"/>
                            {" "}
                            <span>Profile</span>
                        </li>
                        <li onClick={() => handleClick("account")}> 
                            <img src={AccountIcon} alt="Profile icon"/>
                            {" "}
                            <span>Account</span>
                        </li>
                    </ul>
                </aside>
                <div>
                    { active === "profile" && <EditProfile /> }
                    { active === "account" && <DeleteAccount /> }
                </div>
            </div>
        </div>
    )
}