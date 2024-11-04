// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componenets/user/Login';
import Signup from './componenets/user/signup';
import Events from './componenets/user/Events';
import AddEvent from"./componenets/client/addEevnt"
import About from"./componenets/user/about"
import Profile from './componenets/user/profile';
import Cart from './componenets/user/cart';

const App = () => {
    return (
        <Router>
            <div>
                {/* <h1>Welcome to the App</h1> */}
                <Routes>
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
