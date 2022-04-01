import { useContext , useState} from "react"
import SessionContext from "../../provider/SessionContext"
import { useNavigate } from "react-router-dom"
import { deleteAccount } from '../../util/api/patient';
import { Text, Modal, Button } from '@mantine/core';

function DeleteAccount() {
    const [opened, setOpened] = useState(false);
    const [error, setError] = useState(false);
    const { session, setSession } = useContext(SessionContext)
    const navigate = useNavigate()
    
    
    const handleClick = async () => {
        let res = await deleteAccount(session.user._id, session.authToken)
        if(res){
            setSession(null)
            localStorage.removeItem("authToken")
            navigate("/")
        } else {
            setOpened(false)
            setError(true)
            setTimeout(() => {
                setError(false)
            }, 4000);
        }
    }
    return (
        <>
        <div>
            <h1 className='delete-header'>Delete Account</h1>
            <div className='delete-warning'>
                { error && <p style={{ color: "red"}}>There is an error deleting your account please try again.</p> }
                <p>Once you delete your account, there is no going back. Please be certain.</p>
                <button onClick={() => setOpened(true)}>Delete your account</button>
            </div>
        </div>
        <Modal
            opened={opened}
            onClose={() => setOpened(false)}
            title="Delete your profile"
            centered
        >
            <Text size="sm">
                Are you sure you want to delete your profile? This action is destructive.
            </Text>
            <div className="modal-options">
                <Button 
                    variant="default" 
                    onClick={() => setOpened(false)}
                >
                    No, don't delete it
                </Button>
                <Button 
                    variant='filled'
                    color="red"
                    onClick={() => handleClick()}
                >
                    Delete account
                </Button>
            </div>
        </Modal>
        </>
    );
}

export default DeleteAccount;