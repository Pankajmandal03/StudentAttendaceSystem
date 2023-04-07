import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Profile from "./pages/Profile";
import { AuthenticationContext } from "./context/Auth_context";
import Dashboard from "./pages/Dashboard";
import Attendance from "./pages/Attendance";
function App() {
  return (
    <>
      <Router>
        <AuthenticationContext>
          <Routes>
            <Route path="/" element={<Signup />} />
            <Route path="login" element={<Login />} />
            <Route path="signup" element={<Signup />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Dashboard" element={<Dashboard />} />
<<<<<<< HEAD
            <Route path="/Attendance" element={<Attendance />} />
=======
            <Route path="/attendance" element={<Attendance />} />
>>>>>>> 00a8fa524f373e4b3608f8bea57d282e5af41640
          </Routes>
        </AuthenticationContext>
      </Router>
    </>
  );
}

export default App;
