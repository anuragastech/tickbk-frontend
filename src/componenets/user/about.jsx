// About.js
import React from 'react';
import './about.css';
import Header from '../Header/header';
import Footer from '../footer/footer';
const About = () => {
    return (
        <div>
                        <Header/>

        <div className="about-container">
            <div className="about-hero">
                <h1>About Evently</h1>
                <p>Your go-to platform for discovering and booking events.</p>
            </div>

            <section className="about-section">
                <h2>Our Mission</h2>
                <p>
                    Evently is dedicated to connecting people with experiences they’ll love. 
                    Whether it’s concerts, workshops, conferences, or community gatherings, 
                    our platform provides a seamless way to discover and book events that match your interests.
                </p>
            </section>

            <section className="about-section">
                <h2>Why Choose Evently?</h2>
                <ul>
                    <li><strong>Wide Variety:</strong> From large festivals to small meetups, we have events for everyone.</li>
                    <li><strong>Easy Booking:</strong> Secure your spot with a few clicks, anytime, anywhere.</li>
                    <li><strong>Personalized Recommendations:</strong> Get suggestions based on your interests and past bookings.</li>
                </ul>
            </section>

            <section className="about-section">
                <h2>Our Team</h2>
                <p>
                    Our team is passionate about creating memorable experiences. We work tirelessly to bring you 
                    the best events, simplify the booking process, and keep you informed about what’s happening around you.
                </p>
            </section>

            <section className="about-section">
                <h2>Get In Touch</h2>
                <p>
                    Have questions or feedback? We’d love to hear from you. Contact us at <a href="mailto:support@evently.com">support@evently.com</a>.
                </p>
            </section>
        </div>
        <Footer/>
        </div>
    );
};

export default About;
