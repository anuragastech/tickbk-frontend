import React from 'react';
import Header from '../../Header/header';
import Footer from '../../footer/footer';

const About = () => {
    return (
        <div className="bg-gray-100 min-h-screen flex flex-col">
            <Header />
            <div className="about-container max-w-7xl mx-auto px-8 py-10 text-gray-800 font-sans mt-16">
                {/* Hero Section */}
                <div className="about-hero text-center bg-gradient-to-r from-teal-600 via-teal-500 to-teal-400 text-white p-12 rounded-lg shadow-lg mb-10">
                    <h1 className="text-5xl font-extrabold mb-4 tracking-tight">About Evently</h1>
                    <p className="text-2xl font-medium">
                        Your go-to platform for discovering and booking events.
                    </p>
                </div>

                {/* Mission Section */}
                <section className="about-section mb-12">
                    <h2 className="text-4xl font-bold text-indigo-700 mb-6 underline decoration-teal-500">Our Mission</h2>
                    <p className="text-lg leading-relaxed text-gray-700">
                        Evently is dedicated to connecting people with experiences they’ll love. Whether it’s concerts, workshops, 
                        conferences, or community gatherings, our platform provides a seamless way to discover and book events that match your interests.
                    </p>
                </section>

                {/* Why Choose Us Section */}
                <section className="about-section mb-12">
                    <h2 className="text-4xl font-bold text-indigo-700 mb-6 underline decoration-teal-500">Why Choose Evently?</h2>
                    <ul className="space-y-6 text-lg leading-relaxed text-gray-700">
                        <li className="flex items-start">
                            <span className="bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-4">
                                ✓
                            </span>
                            <strong className="text-gray-900">Wide Variety:</strong> From large festivals to small meetups, we have events for everyone.
                        </li>
                        <li className="flex items-start">
                            <span className="bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-4">
                                ✓
                            </span>
                            <strong className="text-gray-900">Easy Booking:</strong> Secure your spot with a few clicks, anytime, anywhere.
                        </li>
                        <li className="flex items-start">
                            <span className="bg-teal-500 text-white rounded-full w-6 h-6 flex items-center justify-center mr-4">
                                ✓
                            </span>
                            <strong className="text-gray-900">Personalized Recommendations:</strong> Get suggestions based on your interests and past bookings.
                        </li>
                    </ul>
                </section>

                {/* Our Team Section */}
                <section className="about-section mb-12">
                    <h2 className="text-4xl font-bold text-indigo-700 mb-6 underline decoration-teal-500">Our Team</h2>
                    <p className="text-lg leading-relaxed text-gray-700">
                        Our team is passionate about creating memorable experiences. We work tirelessly to bring you the best events, 
                        simplify the booking process, and keep you informed about what’s happening around you.
                    </p>
                </section>

                {/* Contact Section */}
                <section className="about-section">
                    <h2 className="text-4xl font-bold text-indigo-700 mb-6 underline decoration-teal-500">Get In Touch</h2>
                    <p className="text-lg leading-relaxed text-gray-700">
                        Have questions or feedback? We’d love to hear from you. Contact us at{' '}
                        <a
                            href="mailto:support@evently.com"
                            className="text-teal-600 font-bold hover:underline hover:text-teal-700 transition duration-300"
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
