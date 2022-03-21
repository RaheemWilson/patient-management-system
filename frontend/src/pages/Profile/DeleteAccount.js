import React from 'react';
import { useContext, useState } from "react"
import SessionContext from "../../provider/SessionContext"
import { useNavigate } from "react-router-dom"
import { deleteAccount } from '../../util/api/patient';
import { Alert } from '../../components/Alert/Alert';

function DeleteAccount() {
    const { session, setSession } = useContext(SessionContext)
    const navigate = useNavigate()

    const handleClick = async () => {
        let res = await deleteAccount(session.user._id, session.authToken)

        if(res){
            setSession(null)
            navigate("/")
        } else {
            console.log("error")
        }
    }
    return (
        <div>
            <Alert></Alert>
            <h1 className='delete-header'>Delete Account</h1>
            <div className='delete-warning'>
                <p>Once you delete your account, there is no going back. Please be certain.</p>
                <button onClick={handleClick}>Delete your account</button>
            </div>
        </div>
    );
}

export default DeleteAccount;