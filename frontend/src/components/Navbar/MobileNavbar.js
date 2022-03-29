import { Burger, Menu, Divider, Avatar } from "@mantine/core";
import { useContext, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import SessionContext from "../../provider/SessionContext"
import { deleteUser } from "../../util/api/user";

function MobileNavbar() {
    const { session, setSession } = useContext(SessionContext)
    const [opened, setOpened] = useState(false);
    const navigate = useNavigate()

    const handleSignOut = async () => {
        let signout = await deleteUser(session.authToken)

        if(signout){
            setSession(null)
            localStorage.removeItem("authToken")
            navigate(`/auth/login?user=${session.userType === "patient"? "patient": "doctor"}`)
        }

        setOpened((o) => !o)
    }
    let initials = session?.user?.firstName[0] + session?.user?.lastName[0]
    let name = session?.user?.firstName + " " +session?.user?.lastName
    return (
        <>
            <Menu 
                control={
                <Burger 
                    opened={opened}
                    onClick={() => setOpened((o) => !o)}
                    color="#0365c7" 
                    size="sm"
                />}
                delay={500}
                size="xl"
                radius="xs"
            >
                <Menu.Label>
                    <Avatar 
                        src={null} 
                        alt={name} 
                        color="blue"
                        className="avatar"
                        size="md"
                    >{initials} 
                    </Avatar>
                    <span>
                        Signed in as <strong>{session?.user?.email}</strong>
                    </span>
                </Menu.Label>

                <Divider my="sm" />
                
                {
                    session?.auth ? (
                        <Menu.Item 
                            component={Link} 
                            to="/patient/dashboard"
                            onClick={() => setOpened((o) => !o)}
                        >
                            Dashboard
                        </Menu.Item>
                    ) : <></>
                }
                <Menu.Item 
                    component={Link} 
                    to="about"
                    onClick={() => setOpened((o) => !o)}
                >
                    About us
                </Menu.Item>

                {
                    !session && (   
                        <Menu.Item 
                            component={Link} 
                            to="/auth/login?user=doctor"
                            onClick={() => setOpened((o) => !o)}
                        >
                            About us
                        </Menu.Item>
                    )
                }

                {   
                    (session?.userType === "patient" || !session) && (
                        <Menu.Item 
                            component={Link} 
                            to={`${ session?.auth ? "/patient/create-appointment": "/auth/login?user=patient"}`}
                            onClick={() => setOpened((o) => !o)}
                        >
                            Book an appointment
                        </Menu.Item>
                    )
                }
                <Divider />
                {
                    session?.auth ? (
                        <>
                            {
                                session?.userType === "patient" && (
                                    <Menu.Item 
                                        component={Link} 
                                        to="/patient/profile"
                                        onClick={() => setOpened((o) => !o)}
                                    >
                                        Your profile
                                    </Menu.Item>
                                )
                            }
                            
                            <Menu.Item 
                                onClick={handleSignOut}
                            >
                                Sign out
                            </Menu.Item>

                        </>
                    ) : (
                        <Menu.Item 
                            component={Link} 
                            to="/auth/signup?user=patient"
                            onClick={() => setOpened((o) => !o)}
                        >
                            Sign up
                        </Menu.Item>
                    )
                }


                
            </Menu> 
        </>
    );
}

export default MobileNavbar;