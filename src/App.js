// App.js
import React from "react";

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
        {/* <h1>Welcome to the App</h1> */}
        <Routes>
          <Route path="/adminLogin" element={<AdminLogin />} />
          <Route path="/adminSignup" element={<AdminSignup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/Events" element={<Events />} />
          <Route path="/AddEvent" element={<AddEvent />} />
          <Route path="/about" element={<About />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/cart" element={<Cart />} />

          {/* Add additional routes here, like a dashboard route */}
        </Routes>
      </div>
    </Router>
  );
};

export default App;
