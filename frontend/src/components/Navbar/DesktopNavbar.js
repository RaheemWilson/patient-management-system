import { useContext } from "react"
import { Link } from "react-router-dom"
import SessionContext from "../../provider/SessionContext"
import Dropdown from "./Dropdown"

function DesktopNavbar() {
    const { session } = useContext(SessionContext)
    return (
        <>
            <ul className="navOptions">
                {
                    session?.auth ? (
                        <li className="navOption">
                            <Link to="/patient/dashboard">Dashboard</Link>
                        </li>
                    ) : <></>
                }
                <li className="navOption">
                    <Link to="about">About us</Link>
                </li>
                {
                    !session && (   
                        <li className="navOption">
                            <Link to={
                                {
                                    pathname: "/auth/login?user=doctor",
                                }
                            }
                            >
                                Consulto doctors
                            </Link>
                        </li>
                    )
                }
                {
                    (session?.userType === "patient" || !session) && (
                        <li className="navOption apt">
                            <Link 
                                to={{ 
                                    pathname: `${ session?.auth ? "/patient/create-appointment": "/auth/login?user=patient"}`,
                                }}
                            >Book an appointment</Link>
                        </li>
                    )
                }
                {
                    session?.auth ? <Dropdown/> : (
                        <li className="navOption">
                            <Link to="/auth/signup?user=patient" className="btn">Sign up</Link>
                        </li>
                    )
                }
            </ul>
        </>
    );
}

export default DesktopNavbar;