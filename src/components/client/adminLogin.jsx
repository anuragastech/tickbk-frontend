import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const AdminLogin = () => {
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        try {
            const response = await axios.post('http://localhost:3005/login/client', { emailId, password }, { withCredentials: true });
            console.log('Login successful:', response.data);
            navigate('/events');
        } catch (err) {
            if (err.response) {
                console.error('Error response:', err.response);
                setError(err.response.data.message || 'Login failed. Please check your credentials.');
            } else {
                console.error('Error:', err);
                setError('Network error. Please try again later.');
            }
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="flex w-full max-w-4xl bg-white rounded-lg shadow-lg overflow-hidden transition-all transform hover:translate-y-1 hover:shadow-2xl">
                <div className="flex flex-col justify-center items-center bg-gradient-to-br from-orange-400 to-yellow-300 text-white p-16 w-1/2 text-center">
                    <h2 className="text-3xl font-bold">Welcome Back!</h2>
                    <p className="mt-2 text-lg">Please log in to continue.</p>
                </div>
                <div className="flex flex-col justify-center p-8 w-1/2">
                    <h1 className="text-3xl font-bold text-gray-800 mb-6">Login</h1>
                    {error && <p className="text-red-500 text-sm mb-4 text-center">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-6">
                            <label htmlFor="email" className="block text-sm font-medium text-gray-600">Email</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={emailId}
                                onChange={(e) => setEmailId(e.target.value)}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400"
                                required
                            />
                        </div>
                        <div className="mb-6">
                            <label htmlFor="password" className="block text-sm font-medium text-gray-600">Password</label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-3 mt-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400"
                                required
                            />
                        </div>
                        <button type="submit" className="w-full p-3 mt-4 text-white bg-orange-400 rounded-md hover:bg-yellow-300 focus:outline-none">Login</button>
                    </form>
                    <p className="mt-4 text-center text-sm text-gray-600">
                        If you are not a user! <a href="/adminSignup" className="text-orange-400 hover:text-yellow-300">Sign Up</a>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;
