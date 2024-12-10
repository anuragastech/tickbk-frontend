// src/components/Footer.js
import React from 'react';

const Footer = () => {
    return (
        <footer className="bg-gray-900 text-white py-4 px-6 text-center flex flex-col items-center">
            <div className="w-full max-w-3xl text-sm leading-relaxed">
                <p>&copy; 2024 Event Booking. All rights reserved.</p>
                <div className="flex justify-center my-4">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="mx-2">
                        <img src="../assets/facebook-icon.png" alt="Facebook" className="w-6 h-6 transform transition-transform duration-300 hover:scale-110 hover:brightness-90" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="mx-2">
                        <img src="../assets/instagram-icon.png" alt="Instagram" className="w-6 h-6 transform transition-transform duration-300 hover:scale-110 hover:brightness-90" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="mx-2">
                        <img src="../assets/twitter-icon.png" alt="Twitter" className="w-6 h-6 transform transition-transform duration-300 hover:scale-110 hover:brightness-90" />
                    </a>
                </div>
                <p className="text-gray-400 text-xs mt-2">Contact us: info@eventbooking.com | +123 456 85648</p>
            </div>
        </footer>
    );
};

export default Footer;
