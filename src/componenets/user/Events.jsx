// Events.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header/header';
import Footer from '../footer/footer';
import './events.css';

// Modal Component for displaying event details
const EventModal = ({ event, onClose }) => {
    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <h2>{event.title}</h2>
                <img src={event.image?.url} alt={event.title} className="modal-image" />
                <p>{event.description}</p>
                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                <button className="button" onClick={onClose}>Close</button>
            </div>
        </div>
    );
};

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [selectedEvent, setSelectedEvent] = useState(null); // For the modal
    const [modalVisible, setModalVisible] = useState(false); // Modal visibility

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
        // Check for logged-in user by verifying the presence of a token in cookies
        const token = document.cookie.split('; ').find(row => row.startsWith('token='));
        if (!token) {
            // Redirect to login if not logged in
            window.location.href = '/login';
            return;
        }
        
        // If logged in, call the booking API with the event ID
        try {
            await axios.post(`http://localhost:3005/bookEvent/${eventId}`, {}, {
                withCredentials: true, // Include cookies in the request
            });
            alert("Booking successful!"); // Notify user of success
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

    if (loading) return <p>Loading events...</p>;
    if (error) return <p>Error: {error}</p>;

    return (
        <div>
            <Header />
            <div className="events-container">
                <h1>Available Events</h1>
                <div className="events-list">
                    {events.length > 0 ? (
                        events.map((event) => (
                            <div key={event._id} className="event-card">
                                {event.image?.url && (
                                    <img
                                        src={event.image.url}
                                        alt={event.title}
                                        className="event-image"
                                    />
                                )}
                                <h2>{event.title}</h2>
                                <p>{event.description}</p>
                                <p><strong>Date:</strong> {new Date(event.date).toLocaleDateString()}</p>
                                <div className="button-group">
                                    <button className="button" onClick={() => handleBookNow(event._id)}>Book Now</button>
                                    <button className="button" onClick={() => handleDetails(event)}>Details</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No events available for booking.</p>
                    )}
                </div>
                {modalVisible && selectedEvent && (
                    <EventModal event={selectedEvent} onClose={closeModal} />
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Events;
