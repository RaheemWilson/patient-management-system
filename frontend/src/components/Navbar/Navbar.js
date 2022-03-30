import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import DesktopNavbar from "./DesktopNavbar"
import MobileNavbar from "./MobileNavbar"
import { useMediaQuery } from '@mantine/hooks';
import './navbar.scss'

export default function Navbar() {
    const matches = useMediaQuery('(max-width: 768px)');
    
    return (
        <header className="header">
            <nav className="navBar">
                <div className="appName">
                    <Link to="/">
                       consulto
                    </Link>
                </div>

                {
                    matches ? <MobileNavbar/> :  <DesktopNavbar />
                }
            </nav>
        </header>
    )
}