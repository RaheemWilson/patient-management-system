import React from 'react';
import { useContext, useState } from "react"
import SessionContext from "../../provider/SessionContext"
import { useNavigate } from "react-router-dom"

function DeleteAccount() {
    const { session, setSession } = useContext(SessionContext)
    const navigate = useNavigate()

    const handleClick = async () => {
        // let res = await deleteAccount(session.user._id)
        let res = null

        if(res){
            setSession(null)
            navigate("/")
        }
    }
    return (
        <div>
            <h1>Delete Account</h1>
            <div>
                <p>Once you delete your account, there is no going back. Please be certain.</p>
                <button onClick={handleClick}>Delete your account</button>
            </div>
        </div>
    );
}

export default DeleteAccount;