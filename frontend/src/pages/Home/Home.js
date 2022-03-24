import { Link } from "react-router-dom"
import './home.scss'

export default function Home() {
    return(
        <div className="hero-container">
            <div className="hero-content">
                <h1 className="hero-title">Serving Your Health Needs Is Our <span>Priority</span></h1>
                <p className="hero-desc">
                    There's nothing more important than our good health, cause that's
                    our principal capital asset for a good future.
                </p>
                <div className="links">
                    <Link to="/auth/login?user=patient" className="btn"> Book an appointment</Link>
                    <Link to="/auth/signup?user=patient">Sign up today</Link>
                </div>
            </div>
        </div>
    )
}