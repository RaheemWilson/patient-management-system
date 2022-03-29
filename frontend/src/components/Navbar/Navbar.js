import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import DesktopNavbar from "./DesktopNavbar"
import MobileNavbar from "./MobileNavbar"
import './navbar.scss'

export default function Navbar() {
    const [isMobile, setIsMobile] = useState(false)
    useEffect(() => {

        const handleResize = () => {
            if(window.innerWidth < 768){
                setIsMobile(true)
            } else {
                setIsMobile(false)
            }
        }

        window.addEventListener('resize', handleResize)
        return () => {
            window.removeEventListener('resize', handleResize)
        }
    })
    
    return (
        <header className="header">
            <nav className="navBar">
                <div className="appName">
                    <Link to="/">
                       consulto
                    </Link>
                </div>

                {
                    isMobile ? <MobileNavbar/> :  <DesktopNavbar />
                }
            </nav>
        </header>
    )
}