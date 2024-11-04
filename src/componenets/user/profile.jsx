import React, { useEffect, useState } from 'react';
import axios from 'axios';
import './profile.css';
import Header from '../Header/header';
import Footer from '../footer/footer';

const Profile = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('http://localhost:3005/profile/user', {
                    withCredentials: true 
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

    if (loading) return <p>Loading profile...</p>;
    if (error) return <p>{error}</p>;

    return (
        <div>
        <Header/>
        <div className="profile-container">
            <h1>Profile</h1>
            {profile ? (
                <div className="profile-details">
                    <p><strong>Name:</strong> {profile.name}</p>
                    <p><strong>Email:</strong> {profile.email}</p>
                    <p><strong>Username:</strong> {profile.username}</p>
                    <p><strong>Joined:</strong> {new Date(profile.createdAt).toLocaleDateString()}</p>
                </div>
            ) : (
                <p>No profile data available.</p>
            )}
        </div>
        <Footer/>
        </div>
    );
};

export default Profile;
