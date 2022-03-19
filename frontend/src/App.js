import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import Layout from "./components/Layout/Layout";
// import ProtectedRoutes from "./components/route/ProtectedRoutes";
import Home from "./pages/Home/Home";
import SessionProvider from "./provider/SessionProvider";

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
            {/* <Route path="/" element={<ProtectedRoutes/>}>
            </Route> */}
        </Routes>
      </Router>
    </SessionProvider>
  );
}

export default App;
