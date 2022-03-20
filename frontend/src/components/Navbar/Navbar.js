import { useContext } from "react"
import { Link } from "react-router-dom"
import SessionContext from "../../provider/SessionContext"
import Dropdown from "./Dropdown"
import './navbar.scss'

export default function Navbar() {
    const { session } = useContext(SessionContext)
    return (
        <header className="header">
            <nav className="navBar">
                <div className="appName">
                    <Link to="/">
                       consulto
                    </Link>
                </div>
                <ul className="navOptions">
                    <li className="navOption">
                        <Link to="about">About Us</Link>
                    </li>
                    <li className="navOption apt">
                        <Link 
                            to={`${ session?.auth ? "/create-appointment": "/auth/login"}`}
                        >Book an appointment</Link>
                    </li>
                    {
                        session?.auth ? <Dropdown/> : (
                            <li className="navOption">
                                <Link to="/auth/signup" className="btn">Sign up</Link>
                            </li>
                        )
                    }
                </ul>
            </nav>
        </header>
    )
}