// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './componenets/Login';
import Signup from './componenets/signup';
import Events from './componenets/Events';


const App = () => {
    return (
        <Router>
            <div>
                {/* <h1>Welcome to the App</h1> */}
                <Routes>
                    <Route path="/login" element={<Login />} />
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/Events" element={<Events />} />

                    {/* Add additional routes here, like a dashboard route */}
                </Routes>
            </div>
        </Router>
    );
};

export default App;
