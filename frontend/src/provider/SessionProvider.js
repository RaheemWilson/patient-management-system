import { useState } from "react";
import SessionContext from "./SessionContext";

export default function SessionProvider(props){
    const [session, setSession] = useState(null)
    const userSession = { session, setSession }
    return (
        <SessionContext.Provider value={userSession} {...props} />
    )
}