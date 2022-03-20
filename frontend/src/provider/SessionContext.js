import { createContext } from "react";

const SessionContext = createContext({
    session: {},
    useSession: () => {}
})

export default SessionContext;