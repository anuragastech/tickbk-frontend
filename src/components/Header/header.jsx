import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    // Check if the token exists in cookies when the component mounts
    useEffect(() => {
        const token = document.cookie.split(';').find(cookie => cookie.trim().startsWith('token='));
        setIsAuthenticated(!!token); // Set authentication state based on token presence
    }, []);

    const handleLogout = () => {
        // Clear the token from cookies and set authentication state to false
        document.cookie = 'token=; max-age=0; path=/';
        setIsAuthenticated(false);
    };

    return (
        <header className="w-full h-20 flex items-center justify-between px-8 bg-white shadow-md fixed top-0 left-0 z-50">
            {/* Left Section: Logo and Navigation */}
            <div className="flex items-center space-x-6 w-full justify-between lg:w-auto">
                {/* Logo Section */}
                <div className="flex items-center space-x-4">
                    <img 
                        src="https://res.cloudinary.com/dd6qdgpfr/image/upload/v1734185879/Pngtree_infinity_logo_and_symbol_template_3626130_jfuhm1.png" 
                        alt="TickBook Logo" 
                        className="w-10 h-10 object-contain"
                    />
                    <span className="text-2xl font-bold text-black">TickBook</span>
                </div>

                {/* Navigation Links for desktop */}
                <nav className="hidden lg:flex space-x-6 items-center ml-10">
                    <Link 
                        to="/" 
                        className="text-black font-Zoho_Puvi_Regular,sans-serif text-base py-2 px-2 rounded-lg transition-colors duration-300 hover:bg-gray-200"
                    >
                        Home
                    </Link>
                    <Link 
                        to="/events" 
                        className="text-black font-Zoho_Puvi_Regular,sans-serif text-base py-2 px-2 rounded-lg transition-colors duration-300 hover:bg-gray-200"
                    >
                        Book Tickets
                    </Link>
                    <Link 
                        to="/about" 
                        className="text-black font-Zoho_Puvi_Regular,sans-serif text-base py-2 px-2 rounded-lg transition-colors duration-300 hover:bg-gray-200"
                    >
                        About Us
                    </Link>
                    <Link 
                        to="/contact" 
                        className="text-black font-Zoho_Puvi_Regular,sans-serif text-base py-2 px-2 rounded-lg transition-colors duration-300 hover:bg-gray-200"
                    >
                        Contact
                    </Link>
                    {isAuthenticated && (
                        <Link 
                            to="/profile" 
                            className="text-black font-Zoho_Puvi_Regular,sans-serif text-base py-2 px-2 rounded-lg transition-colors duration-300 hover:bg-gray-200"
                        >
                            Profile
                        </Link>
                    )}
                </nav>
            </div>

            {/* Right Section: Sign In / Get Started Buttons for Desktop */}
            <div className="hidden lg:flex items-center ml-auto space-x-4">
                {!isAuthenticated ? (
                    <>
                        <Link 
                            to="/login" 
                            className="text-green-600 font-Zoho_Puvi_Regular,sans-serif text-sm py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
                        >
                            SIGN IN
                        </Link>
                        <Link 
                            to="/signup" 
                            className="text-white bg-green-500 font-Zoho_Puvi_Regular,sans-serif text-sm py-2 px-4 transition-transform transform hover:scale-105"
                        >
                            GET STARTED
                        </Link>
                    </>
                ) : (
                    <button
                        onClick={handleLogout}
                        className="text-red-600 font-Zoho_Puvi_Regular,sans-serif text-sm py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
                    >
                        LOG OUT
                    </button>
                )}
            </div>

            {/* Mobile Navigation Toggle Button */}
            <div className="lg:hidden flex items-center ml-auto">
                <button onClick={toggleMenu} className="text-black focus:outline-none">
                    {isMenuOpen ? (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M6 18L18 6M6 6l12 12"
                            />
                        </svg>
                    ) : (
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                            className="w-6 h-6"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h16M4 18h16"
                            />
                        </svg>
                    )}
                </button>
            </div>

            {/* Mobile Navigation Links */}
            <div 
                className={`lg:hidden w-full absolute top-20 left-0 bg-white shadow-md transition-all duration-300 transform ${
                    isMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'
                } overflow-hidden z-40`}
            >
                <nav className="flex flex-col items-center py-4 space-y-4">
                    <Link 
                        to="/" 
                        className="text-black font-Zoho_Puvi_Regular,sans-serif text-base py-2 px-4 w-full text-center transition-colors duration-300 hover:bg-gray-200"
                        onClick={toggleMenu}
                    >
                        Home
                    </Link>
                    <Link 
                        to="/events" 
                        className="text-black font-Zoho_Puvi_Regular,sans-serif text-base py-2 px-4 w-full text-center transition-colors duration-300 hover:bg-gray-200"
                        onClick={toggleMenu}
                    >
                        Book Tickets
                    </Link>
                    <Link 
                        to="/about" 
                        className="text-black font-Zoho_Puvi_Regular,sans-serif text-base py-2 px-4 w-full text-center transition-colors duration-300 hover:bg-gray-200"
                        onClick={toggleMenu}
                    >
                        About Us
                    </Link>
                    <Link 
                        to="/contact" 
                        className="text-black font-Zoho_Puvi_Regular,sans-serif text-base py-2 px-4 w-full text-center transition-colors duration-300 hover:bg-gray-200"
                        onClick={toggleMenu}
                    >
                        Contact
                    </Link>
                    {isAuthenticated && (
                        <Link 
                            to="/profile" 
                            className="text-black font-Zoho_Puvi_Regular,sans-serif text-base py-2 px-4 w-full text-center transition-colors duration-300 hover:bg-gray-200"
                            onClick={toggleMenu}
                        >
                            Profile
                        </Link>
                    )}

                    {/* Sign In and Get Started Buttons in the Mobile Menu */}
                    {!isAuthenticated ? (
                        <div className="flex flex-col items-center space-y-4 mt-8">
                            <Link 
                                to="/login" 
                                className="text-green-600 font-Zoho_Puvi_Regular,sans-serif text-sm py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
                                onClick={toggleMenu}
                            >
                                SIGN IN
                            </Link>
                            <Link 
                                to="/signup" 
                                className="text-white bg-green-500 font-Zoho_Puvi_Regular,sans-serif text-sm py-2 px-4 transition-transform transform hover:scale-105"
                                onClick={toggleMenu}
                            >
                                GET STARTED
                            </Link>
                        </div>
                    ) : (
                        <div className="flex flex-col items-center space-y-4 mt-8">
                            <button 
                                onClick={() => {
                                    handleLogout();
                                    toggleMenu();
                                }} 
                                className="text-red-600 font-Zoho_Puvi_Regular,sans-serif text-sm py-2 px-4 rounded-lg transition-transform transform hover:scale-105"
                            >
                                LOG OUT
                            </button>
                        </div>
                    )}
                </nav>
            </div>
        </header>
    );
};

export default Header;
