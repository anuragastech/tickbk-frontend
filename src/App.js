import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Login from "./components/user/login/Login";
import Signup from "./components/user/signup/signup";
import Events from "./components/user/events/Events";
import AddEvent from "./components/client/addEevnt";
import About from "./components/user/about/about";
import Profile from "./components/user/profile/profile";
import Cart from "./components/user/cart/cart";
import AdminLogin from "./components/client/adminLogin";
import AdminSignup from "./components/client/adminSignup";

const App = () => {
  return (
    <Router>
      <div>
        <Routes>
          {/* Redirect root ("/") to "/login" */}
          {/* <Route path="/" element={<Navigate to="/login" />} /> */}
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/adminSignup" element={<AdminSignup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/events" element={<Events />} />
          <Route path="/addEvent" element={<AddEvent />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
