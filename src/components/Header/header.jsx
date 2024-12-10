// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header className="w-screen bg-cover bg-center h-[370px] flex items-center justify-center relative overflow-hidden" style={{ backgroundImage: "url('https://res.cloudinary.com/dd6qdgpfr/image/upload/fl_preserve_transparency/v1730666266/6485493_ljpjaw.jpg?_s=public-apps')" }}>
            <div className="flex flex-col items-center justify-center w-full z-10 relative">
                {/* Uncomment this line if you have a logo */}
                {/* <img src={logo} alt="Site Logo" className="logo" /> */}
                <nav className="flex mt-2 z-20">
                    <Link to="/events" className="mx-4 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-yellow-400 hover:text-gray-800">Home</Link>
                    <Link to="/about" className="mx-4 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-yellow-400 hover:text-gray-800">About Us</Link>
                    {/* <Link to="/contact" className="mx-4 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-yellow-400 hover:text-gray-800">Contact</Link> */}
                    <Link to="/cart" className="mx-4 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-yellow-400 hover:text-gray-800">Cart</Link>
                    <Link to="/profile" className="mx-4 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-yellow-400 hover:text-gray-800">Profile</Link>
                    <Link to="/logout" className="mx-4 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300 hover:bg-yellow-400 hover:text-gray-800">Logout</Link>
                </nav>
            </div>
            <div className="absolute inset-0 bg-black bg-opacity-50 z-0"></div>
        </header>
    );
};

export default Header;
