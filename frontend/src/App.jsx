import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/Login";
import Register from "./component/Register";
import ForgotPassword from "./component/ForgotPassword"
import VerifyOtp from "./component/VerifyOTp";
import Landing from "./component/Landing";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
         <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/verify-otp" element={<VerifyOtp/>} />
      </Routes>
    </Router>
  );
}

export default App;
