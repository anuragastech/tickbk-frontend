// src/components/Profile/Profile.js
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Header from '../../Header/header';
import Footer from '../../footer/footer';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/profile/user`, {
                    withCredentials: true, // Ensure cookies are sent
                });
                setProfile(response.data.user);
                setLoading(false);
            } catch (error) {
                console.error("Error fetching profile:", error);
                setError("Failed to load profile data");
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    if (loading) return <p className="text-center text-gray-500">Loading profile...</p>;
    if (error) return <p className="text-center text-red-500">{error}</p>;

    return (
        <div>
            <Header />
            <div className="max-w-3xl mx-auto mt-12 p-8 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
                <h1 className="text-center text-2xl font-semibold text-gray-800 mb-6">Profile</h1>
                {profile ? (
                    <div className="bg-gray-100 p-6 rounded-lg border border-gray-300">
                        <p className="text-lg text-gray-700"><strong className="text-gray-600">Name:</strong> {profile.name}</p>
                        <p className="text-lg text-gray-700"><strong className="text-gray-600">Email:</strong> {profile.email}</p>
                        <p className="text-lg text-gray-700"><strong className="text-gray-600">Username:</strong> {profile.username}</p>
                        <p className="text-lg text-gray-700"><strong className="text-gray-600">Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
                    </div>
                ) : (
                    <p className="text-center text-gray-500">No profile data available.</p>
                )}
            </div>
            <Footer />
        </div>
    );
};

export default Profile;
