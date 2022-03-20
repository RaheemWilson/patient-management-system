import { useContext, useState } from "react"
import SessionContext from "../../provider/SessionContext"
import ProfileIcon from '../../assets/icons/person_black.svg'
import AccountIcon from '../../assets/icons/settings_black.svg'
import EditProfile from "./EditProfile"

export default function Profile(){
    const { session, useSession } = useContext(SessionContext)
    const [active, setActive] = useState("profile")

    const handleClick = (tab) => {
        setActive(tab)
    }
    return(
        <div>
            <div>
                <p>{ session?.user?.firstName+" "+session?.user?.firstName }</p>
                <p>Your personal account</p>
            </div>
            <div>
                <aside>
                    <ul>
                        <li>
                            <img src={ProfileIcon} alt="Profile icon"/>
                            {" "}
                            <span>Profile</span>
                        </li>
                        <li>
                            <img src={AccountIcon} alt="Profile icon"/>
                            {" "}
                            <span>Account</span>
                        </li>
                    </ul>
                </aside>
                <div>
                    { active === "profile" && <EditProfile /> }
                    {/* { active === "account" && } */}
                </div>
            </div>
        </div>
    )
}