// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom'; 
import './header.css'; 

const Header = () => {
    return (
        <header className="header">
            <div className="header-content">
                {/* Uncomment this line if you have a logo */}
                {/* <img src={logo} alt="Site Logo" className="logo" /> */}
                <nav className="nav">
                    <Link to="/events">Home</Link>
                    <Link to="/about">About Us</Link>
                    {/* <Link to="/contact">Contact</Link> */}
                    <Link to="/cart">Cart</Link>
                    <Link to="/profile">Profile</Link>
                    <Link to="/logout">Logout</Link>



                </nav>
            </div>
        </header>
    );
};

export default Header;
