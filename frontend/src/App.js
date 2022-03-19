import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
import PublicRoutes from "./components/route/PublicRoutes";
// import ProtectedRoutes from "./components/route/ProtectedRoutes";
import Home from "./pages/Home/Home";
import Signup from "./pages/Auth/Signup";
import SessionProvider from "./provider/SessionProvider";
import Login from "./pages/Auth/Login";

function App() {
  return (
    <SessionProvider>
      <Router>
        <Routes>
          <Route path="/" element={<Layout/>}>
            <Route index element={<Home/>} />
            {/* <Route path="/" element={<ProtectedRoutes/>}>
            </Route> */}
          </Route>
          <Route path="/" element={<PublicRoutes/>}>
            <Route path="auth">
              <Route path="signup" element={<Signup/>}/>
              <Route path="login" element={<Login/>}/>
            </Route>
          </Route>
        </Routes>
      </Router>
    </SessionProvider>
  );
}

export default App;
