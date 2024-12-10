import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Header/header';
import Footer from '../../footer/footer';

const EventModal = ({ event, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={onClose}>
            <div className="bg-white rounded-lg p-6 max-w-lg w-full shadow-lg" onClick={(e) => e.stopPropagation()}>
                <h2 className="text-2xl font-bold mb-4">{event.title}</h2>
                <img src={event.image?.url} alt={event.title} className="rounded-lg w-full mb-4" />
                <p className="mb-4">{event.description}</p>
                <p className="font-semibold mb-4">
                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                </p>
                <button
                    className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded"
                    onClick={onClose}
                >
                    Close
                </button>
            </div>
        </div>
    );
};

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null);
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        const fetchEvents = async () => {
            try {
                const response = await axios.get('http://localhost:3005/events');
                const eventData = Array.isArray(response.data.events) ? response.data.events : [];
                setEvents(eventData);
                setLoading(false);
            } catch (error) {
                setError(error.message || 'An error occurred while fetching data');
                setLoading(false);
            }
        };

        fetchEvents();
    }, []);

    const handleBookNow = async (eventId) => {
        const token = document.cookie.split('; ').find((row) => row.startsWith('token='));
        if (!token) {
            window.location.href = '/login';
            return;
        }

        try {
            await axios.post(`http://localhost:3005/bookEvents/${eventId}`, {}, {
                withCredentials: true,
            });
            alert("Booking successful!");
        } catch (error) {
            alert("Failed to book the event. Please try again.");
            console.error("Booking error:", error);
        }
    };

    const handleDetails = (event) => {
        setSelectedEvent(event);
        setModalVisible(true);
    };

    const closeModal = () => {
        setModalVisible(false);
        setSelectedEvent(null);
    };

    if (loading) return <p className="text-center py-10">Loading events...</p>;
    if (error) return <p className="text-center py-10 text-red-500">Error: {error}</p>;

    return (
        <div>
            <Header />
            <div className="bg-gray-100 p-6">
                <h1 className="text-3xl font-bold text-center mb-6">Available Events</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {events.length > 0 ? (
                        events.map((event) => (
                            <div key={event._id} className="bg-white rounded-lg shadow-md p-4 transform hover:scale-105 transition">
                                {event.image?.url && (
                                    <img
                                        src={event.image.url}
                                        alt={event.title}
                                        className="w-full h-48 object-cover rounded-lg mb-4"
                                    />
                                )}
                                <h2 className="text-xl font-semibold mb-2">{event.title}</h2>
                                <p className="text-gray-700 mb-2">{event.description}</p>
                                <p className="text-sm text-gray-500 mb-4">
                                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                                </p>
                                <div className="flex justify-between">
                                    <button
                                        className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
                                        onClick={() => handleBookNow(event._id)}
                                    >
                                        Book Now
                                    </button>
                                    <button
                                        className="bg-gray-500 text-white font-bold py-2 px-4 rounded hover:bg-gray-600"
                                        onClick={() => handleDetails(event)}
                                    >
                                        Details
                                    </button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="col-span-full text-center">No events available for booking.</p>
                    )}
                </div>
                {modalVisible && selectedEvent && <EventModal event={selectedEvent} onClose={closeModal} />}
            </div>
            <Footer />
        </div>
    );
};

export default Events;
