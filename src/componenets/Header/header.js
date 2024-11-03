// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom'; 
import './header.css'; 

const Header = () => {
    return (
        <header className="header" style={{ 
            backgroundImage: 'url(https://asset.cloudinary.com/dd6qdgpfr/cdca073c4779ac0226c4a97f0e84d1a3)', 
            backgroundSize: 'cover', 
            backgroundPosition: 'center' 
        }}>
            <div className="header-content">
                {/* <img src={logo} alt="Site Logo" className="logo" /> */}
                <nav className="nav">
                    <Link to="/">Home</Link>
                    <Link to="/events">Events</Link>
                    <Link to="/about">About Us</Link>
                    <Link to="/contact">Contact</Link>
                </nav>
            </div>
        </header>
    );
};

export default Header;
