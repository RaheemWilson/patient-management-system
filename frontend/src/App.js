import {
  Routes,
  Route,
  useNavigate
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import PublicRoutes from "./components/Routes/PublicRoutes";
import Home from "./pages/Home/Home";
import Signup from "./pages/Auth/Signup";
import Login from "./pages/Auth/Login";
import Dashboard from "./pages/Dashboard/PatientDashboard";
import Profile from "./pages/Profile/PatientProfile";
import Appointment from "./pages/Appointment/Appointment";
import DoctorDashboard from "./pages/Dashboard/DoctorDashboard";
import PatientRoutes from "./components/Routes/PatientRoutes";
import DoctorRoutes from "./components/Routes/DoctorRoutes";
import About from "./pages/About/About";
import { useEffect, useContext } from "react";
import SessionContext from "./provider/SessionContext";
import { getUser } from "./util/api/user";
import NotFound from './pages/NotFound/NotFound'

function App() {
  const { setSession } = useContext(SessionContext)
    const navigate = useNavigate()

    useEffect(() => {
        let token = localStorage.getItem("authToken")
        if(token){
            getUser(token)
            .then(res => {
                setSession({...res, auth: true, authToken: token})
                navigate(-1)
            })
        }
    }, [])

  return (
      <Routes>
        <Route path="/" element={<Layout/>}>
          <Route path="/" index element={<Home/>} />
          <Route path="about" index element={ <About/> } />
          <Route path="/" element={<PatientRoutes/>}>
              <Route path="patient">
                <Route path="dashboard" element={ <Dashboard/> } />
                <Route path="profile" element={ <Profile/> } />
                <Route path="create-appointment" element={ <Appointment/> } />
              </Route>
          </Route>
          <Route path="/" element={<DoctorRoutes/>}>
            <Route path='doctor'>
              <Route path='dashboard' element={ <DoctorDashboard/> }/>
            </Route>
          </Route>
        </Route>
        <Route path="/" element={<PublicRoutes/>}>
          <Route path="auth">
            <Route path="signup" element={<Signup/>}/>
            <Route path="login" element={<Login/>}/>
          </Route>
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
  );
}

export default App;
