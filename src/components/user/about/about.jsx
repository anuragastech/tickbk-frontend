import React from 'react';
import Header from '../../Header/header';
import Footer from '../../footer/footer';

const About = () => {
    return (
        <div>
            <Header />
            <div className="about-container max-w-7xl mx-auto px-8 py-10 text-gray-800 font-sans">
                {/* Hero Section */}
                <div className="about-hero text-center bg-teal-700 text-white p-10 rounded-lg mb-10">
                    <h1 className="text-4xl font-bold mb-4">About Evently</h1>
                    <p className="text-xl">Your go-to platform for discovering and booking events.</p>
                </div>

                {/* Mission Section */}
                <section className="about-section mb-12">
                    <h2 className="text-3xl font-semibold text-indigo-700 mb-4">Our Mission</h2>
                    <p className="text-lg leading-relaxed">
                        Evently is dedicated to connecting people with experiences they’ll love. Whether it’s concerts, workshops, 
                        conferences, or community gatherings, our platform provides a seamless way to discover and book events that match your interests.
                    </p>
                </section>

                {/* Why Choose Us Section */}
                <section className="about-section mb-12">
                    <h2 className="text-3xl font-semibold text-indigo-700 mb-4">Why Choose Evently?</h2>
                    <ul className="space-y-4 text-lg leading-relaxed">
                        <li>
                            <strong className="text-indigo-700">Wide Variety:</strong> From large festivals to small meetups, we have events for everyone.
                        </li>
                        <li>
                            <strong className="text-indigo-700">Easy Booking:</strong> Secure your spot with a few clicks, anytime, anywhere.
                        </li>
                        <li>
                            <strong className="text-indigo-700">Personalized Recommendations:</strong> Get suggestions based on your interests and past bookings.
                        </li>
                    </ul>
                </section>

                {/* Our Team Section */}
                <section className="about-section mb-12">
                    <h2 className="text-3xl font-semibold text-indigo-700 mb-4">Our Team</h2>
                    <p className="text-lg leading-relaxed">
                        Our team is passionate about creating memorable experiences. We work tirelessly to bring you the best events, 
                        simplify the booking process, and keep you informed about what’s happening around you.
                    </p>
                </section>

                {/* Contact Section */}
                <section className="about-section">
                    <h2 className="text-3xl font-semibold text-indigo-700 mb-4">Get In Touch</h2>
                    <p className="text-lg leading-relaxed">
                        Have questions or feedback? We’d love to hear from you. Contact us at{' '}
                        <a
                            href="mailto:support@evently.com"
                            className="text-blue-500 hover:underline"
                        >
                            support@evently.com
                        </a>
                        .
                    </p>
                </section>
            </div>
            <Footer />
        </div>
    );
};

export default About;
