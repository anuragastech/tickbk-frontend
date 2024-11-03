// src/components/Footer.js
import React from 'react';
import './Footer.css';

const Footer = () => {
    return (
        <footer className="footer">
            <div className="footer-content">
                <p>&copy; 2023 Event Booking. All rights reserved.</p>
                <div className="social-icons">
                    <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                        <img src="../assets/facebook-icon.png" alt="Facebook" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                        <img src="../assets/instagram-icon.png" alt="Instagram" />
                    </a>
                    <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                        <img src="../assets/twitter-icon.png" alt="Twitter" />
                    </a>
                </div>
                <p>Contact us: info@eventbooking.com | +123 456 7890</p>
            </div>
        </footer>
    );
};

export default Footer;
