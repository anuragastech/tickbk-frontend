import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Header from '../../Header/header';
import Footer from '../../footer/footer';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const EventModal = ({ event, onClose }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50" onClick={onClose}>
            <div
                className="bg-gradient-to-br from-gray-800 via-gray-900 to-black text-white rounded-2xl p-6 max-w-lg w-full shadow-2xl transform transition-all duration-300"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="text-3xl font-semibold text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 mb-4">{event.title}</h2>
                <img
                    src={event.image?.url}
                    alt={event.title}
                    className="rounded-xl w-full h-48 object-cover mb-4"
                />
                <p className="text-lg text-gray-300 mb-4">{event.description}</p>
                <p className="text-lg font-semibold text-gray-200">
                    <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                </p>
                <div className="mt-6">
                    <button
                        className="w-full bg-gradient-to-br from-green-500 via-blue-600 to-purple-700 hover:bg-gradient-to-br hover:from-green-600 hover:via-blue-700 hover:to-purple-800 text-white font-semibold py-3 rounded-2xl transition duration-300"
                        onClick={onClose}
                    >
                        Close
                    </button>
                </div>
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
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/events`);
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

    const handleBookNow = async (eventId, totalCapacity) => {
        const token = document.cookie.split('; ').find((row) => row.startsWith('token='));
        if (!token) {
            window.location.href = '/login'; 
            return; 
        }
    
        const event = events.find((e) => e._id === eventId);
        if (!event) return;
    
        const totalBookedTickets = event.attendees.reduce((total, attendee) => total + attendee.tickets, 0);
        if (totalBookedTickets >= totalCapacity) {
            toast.error("Booking Full!"); 
            return;
        }
    
        try {
            await axios.post(`${process.env.REACT_APP_API_URL}/bookEvents/${eventId}`, {}, {
                withCredentials: true,
            });
            toast.success("Booking successful!");
        } catch (error) {
            toast.error("Failed to book the event. Please try again.");
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

    if (loading) return <p className="text-center py-10 text-gray-500">Loading events...</p>;
    if (error) return <p className="text-center py-10 text-red-500">Error: {error}</p>;

    return (
        <div className="bg-gradient-to-br from-black via-blackish-blue to-green-600 min-h-screen mt-10">
            <Header />
            <div className="container mx-auto px-6 py-16">
                <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 text-center mb-12">Book Your Favorite Events</h1>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
                    {events.length > 0 ? (
                        events.map((event) => {
                            const totalCapacity = event.capacity || 100; 
                            const totalBookedTickets = event.attendees.reduce((total, attendee) => total + attendee.tickets, 0);
                            const isFullyBooked = totalBookedTickets >= totalCapacity;

                            return (
                                <div key={event._id} className="bg-gradient-to-br from-black via-gray-800 to-gray-900 rounded-2xl shadow-lg overflow-hidden transform transition duration-500 hover:scale-105 hover:shadow-xl">
                                    {event.image?.url && (
                                        <img
                                            src={event.image.url}
                                            alt={event.title}
                                            className="w-full h-40 object-cover rounded-t-2xl"
                                        />
                                    )}
                                    <div className="p-4">
                                        <h3 className="text-xl font-semibold text-white mb-2">{event.title}</h3>
                                        <p className="text-sm text-gray-400 mb-3">{event.description}</p>
                                        <p className="text-xs text-gray-500 mb-4">
                                            <strong>Date:</strong> {new Date(event.date).toLocaleDateString()}
                                        </p>
                                        <div className="flex justify-between items-center">
                                            <button
                                                className={`${
                                                    isFullyBooked
                                                        ? 'bg-red-500 cursor-not-allowed' // Change color to red when fully booked
                                                        : 'bg-gradient-to-br from-black via-blue-gradient to-purple-950  border-blue-600 border-2 text-white font-semibold py-2 px-5 rounded-lg hover:bg-gradient-to-br hover:from-green-600 hover:via-blue-700 hover:to-purple-800 transition duration-300'
                                                }`}
                                                onClick={() => !isFullyBooked && handleBookNow(event._id, totalCapacity)}
                                                disabled={isFullyBooked}
                                            >
                                                {isFullyBooked ? 'Booking Full' : 'Book Now'} {/* Change text to 'Booking Full' when fully booked */}
                                            </button>
                                            <button
                                                className="bg-gradient-to-br from-gray-500 via-gray-600 to-gray-700 border-gray-400 border-2 text-white font-semibold py-2 px-5 rounded-xl hover:bg-gradient-to-br hover:from-gray-600 hover:via-gray-700 hover:to-gray-800 transition duration-300"
                                                onClick={() => handleDetails(event)}
                                            >
                                                Details
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            );
                        })
                    ) : (
                        <p className="col-span-full text-center text-white">No events available for booking.</p>
                    )}
                </div>
                {modalVisible && selectedEvent && <EventModal event={selectedEvent} onClose={closeModal} />}
            </div>
            <Footer />
            <ToastContainer />
        </div>
    );
};

export default Events;
