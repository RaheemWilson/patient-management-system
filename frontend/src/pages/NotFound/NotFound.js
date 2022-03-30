import React from 'react';
import { Link } from 'react-router-dom';
import Notfound from '../../assets/images/NotFound.svg'
import './notfound.scss'

function NotFound(props) {
    return (
        <div className='notfound-container'>
            <div className='notfound-content'>
                <img src={Notfound} alt="Page not found" />
                <h1>Oh no! Page Not Found.</h1>
                <p>We can’t seem to find the page you are looking for</p>
                <p>Here are some helpful links instead:</p>
                <div className='help-links'>
                    <Link to="/">Home</Link>
                    <Link to="/auth/signup">Sign up</Link>
                    <Link to="/about">About us</Link>
                </div>
            </div>
        </div>
    );
}

export default NotFound;