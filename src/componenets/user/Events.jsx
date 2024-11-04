import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../Header/header';
import Footer from '../footer/footer';
import './events.css';

const Events = () => {
    const [events, setEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // Fetch events from the backend when the component mounts
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
                            <div key={event.id} className="event-card">
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
                            </div>
                        ))
                    ) : (
                        <p>No events available for booking.</p>
                    )}
                </div>
            </div>
            <Footer />
        </div>
    );
};

export default Events;
