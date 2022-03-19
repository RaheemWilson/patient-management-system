import { Link } from "react-router-dom"
import './navbar.scss'


export default function Navbar() {
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
                        <Link to="create-appointment">Book an appointment</Link>
                    </li>
                    <li className="navOption">
                        <Link to="auth/signup" className="btn">Sign up</Link>
                    </li>
                </ul>
            </nav>
        </header>
    )
}