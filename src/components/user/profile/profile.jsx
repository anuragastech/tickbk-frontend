import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../Header/header';
import Footer from '../../footer/footer';
import { useNavigate } from 'react-router-dom'; 

import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; 

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [bookedEvents, setBookedEvents] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isEditing, setIsEditing] = useState(false); 
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        emailId: '',
        age: '',
        gender: '',
        skill: ''
    });
    const navigate = useNavigate();

    useEffect(() => {
        // Function to get the token from cookies
        const getTokenFromCookies = () => {
            const cookies = document.cookie.split(';');
            for (let cookie of cookies) {
                cookie = cookie.trim();
                if (cookie.startsWith('token=')) {
                    return cookie.substring('token='.length, cookie.length);
                }
            }
            return null;
        };

        // Check if the token is present in cookies
        const token = getTokenFromCookies();
        if (!token) {
            // If token is not present, redirect to login page
            navigate('/login');
        } else {
            // Fetch the profile data if the token is present
            const fetchProfile = async () => {
                try {
                    const response = await axios.get(`${process.env.REACT_APP_API_URL}/profile/user`, {
                        withCredentials: true, 
                    });
                    setProfile(response.data.user); 
                    setBookedEvents(response.data.bookedEvents); 
                    setLoading(false);
                } catch (error) {
                    console.error("Error fetching profile:", error);
                    setError("Failed to load profile data");
                    setLoading(false);
                }
            };

            fetchProfile();
        }
    }, [navigate]);

    const handleEditClick = () => {
        setIsEditing(true);
        setFormData({
            firstName: profile.firstName,
            lastName: profile.lastName,
            emailId: profile.emailId,
            age: profile.age,
            gender: profile.gender,
            skill: profile.skill
        });
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.put(`${process.env.REACT_APP_API_URL}/profile/edit`, formData, {
                withCredentials: true,
            });
            setProfile(response.data.user);  
            setIsEditing(false); 
            toast.success('Profile updated successfully!'); 
        } catch (error) {
            console.error("Error updating profile:", error);
            setError("Failed to update profile");
            toast.error('Failed to update profile!'); 
        }
    };

    if (loading) return <p className="text-center text-gray-500">Loading profile...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div className="min-h-screen pt-1 mt-2  bg-gradient-to-br from-green-300 via-blackish-blue to-green-600 text-white">
            <Header />
            <div className="max-w-6xl mb-3 mx-auto mt-24 p-8 bg-gradient-to-b from-gray-50 to-gray-200 rounded-lg shadow-xl">
                <div className="flex flex-col md:flex-row items-center mb-8 space-x-6">
                    <div className="w-40 h-40 flex-shrink-0 overflow-hidden rounded-full border-4 border-pink-500 shadow-lg">
                        <img
                            src="https://via.placeholder.com/150"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="mt-4 md:mt-0 md:ml-6 text-center md:text-left">
                        <h1 className="text-4xl font-semibold text-gray-900">{profile?.firstName} {profile?.lastName}</h1>
                        <p className="text-lg text-gray-700">{profile?.emailId}</p>
                        <button
                            onClick={handleEditClick}
                            className="mt-4 bg-indigo-600 text-white py-2 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Edit Profile
                        </button>
                    </div>
                </div>

                {isEditing ? (
                    <form onSubmit={handleSubmit} className="bg-gradient-to-r from-gray-100 to-gray-300 p-6 rounded-lg border border-gray-400 shadow-xl space-y-4">
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label className="block text-gray-600" htmlFor="firstName">First Name</label>
                                <input
                                    type="text"
                                    id="firstName"
                                    name="firstName"
                                    value={formData.firstName}
                                    onChange={handleChange}
                                    className="text-black w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-gray-600" htmlFor="lastName">Last Name</label>
                                <input
                                    type="text"
                                    id="lastName"
                                    name="lastName"
                                    value={formData.lastName}
                                    onChange={handleChange}
                                    className="text-black w-full p-2 mt-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-600" htmlFor="emailId">Email</label>
                            <input
                                type="email"
                                id="emailId"
                                name="emailId"
                                value={formData.emailId}
                                onChange={handleChange}
                                className="w-full p-2 mt-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            />
                        </div>
                        <div className="flex space-x-4">
                            <div className="w-1/2">
                                <label className="block text-gray-600" htmlFor="age">Age</label>
                                <input
                                    type="number"
                                    id="age"
                                    name="age"
                                    value={formData.age}
                                    onChange={handleChange}
                                    className="w-full p-2 mt-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                />
                            </div>
                            <div className="w-1/2">
                                <label className="block text-gray-600" htmlFor="gender">Gender</label>
                                <input
                                    type="text"
                                    id="gender"
                                    name="gender"
                                    value={formData.gender}
                                    onChange={handleChange}
                                    className="w-full p-2 mt-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-gray-600" htmlFor="skill">Skill</label>
                            <input
                                type="text"
                                id="skill"
                                name="skill"
                                value={formData.skill}
                                onChange={handleChange}
                                className="w-full p-2 mt-2 border text-black border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-indigo-600"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full mt-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 focus:outline-none transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            Save Changes
                        </button>
                    </form>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-gradient-to-r from-gray-100 to-gray-300 p-6 rounded-lg border border-gray-400 shadow-lg">
                        <p className="text-lg text-gray-800"><strong className="text-gray-600">Age:</strong> {profile.age}</p>
                        <p className="text-lg text-gray-800"><strong className="text-gray-600">Gender:</strong> {profile.gender}</p>
                        <p className="text-lg text-gray-800"><strong className="text-gray-600">Address:</strong> {profile.address?.join(', ')}</p>
                        <p className="text-lg text-gray-800"><strong className="text-gray-600">Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
                    </div>
                )}

                {bookedEvents.length > 0 ? (
    <div className="mt-8">
        <h2 className="text-2xl font-semibold text-gray-900">Booked Events</h2>
        <ul className="mt-4 space-y-4">
            {bookedEvents.map((event, index) => (
                <li key={index} className="bg-gray-100 p-6 rounded-lg shadow-lg">
                    <h3 className="text-xl font-semibold text-gray-800">{event.eventName}</h3>
                    <p className="text-lg text-gray-600">
                        <strong>Date:</strong> {new Date(event.eventDate).toLocaleDateString()}
                    </p>
                    <p className="text-lg text-gray-600">
                        <strong>Time:</strong> {event.eventTime} 
                    </p>
                    <p className="text-lg text-gray-600">
                        <strong>Location:</strong> {event.location} 
                    </p>
                    <p className="text-lg text-gray-600">
                        <strong>Description:</strong> {event.description}
                    </p>
                    <p className="text-lg text-gray-600">
                        <strong>Host:</strong> {event.hostName}
                    </p>
                    <p className="text-lg text-gray-600">
                        <strong>Status:</strong> {event.status} 
                    </p>
                </li>
            ))}
        </ul>
    </div>
) : (
    <p className="text-lg text-gray-500 mt-6">No booked events yet.</p>
)}

            </div>
            <Footer />
            <ToastContainer />
        </div>
    );
};

export default Profile;
