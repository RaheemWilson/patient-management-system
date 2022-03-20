import { useContext } from "react"
import SessionContext from "../../provider/SessionContext"

export default function Dashboard() {
    let { session } = useContext(SessionContext)
    console.log(session)
    return (
        <>Hello</>
    )
}