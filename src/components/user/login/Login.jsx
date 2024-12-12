import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError(null);

        try {
            const response = await axios.post(`${process.env.REACT_APP_API_URL}/login`, { emailId, password }, { withCredentials: true });
            console.log('Login successful:', response.data);

            // No need to save the token in local storage
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
        <div className="flex items-center justify-center min-h-screen bg-gray-100 font-poppins">
            <div className="flex w-full max-w-4xl shadow-lg rounded-lg overflow-hidden bg-white">
                {/* Left Section */}
                <div className="w-1/2 bg-gradient-to-br from-indigo-500 to-blue-600 text-white flex flex-col justify-center items-center p-10">
                    <h2 className="text-3xl font-bold mb-4">Welcome Back!</h2>
                    <p className="text-lg text-center">Please log in to continue.</p>
                </div>
                {/* Right Section */}
                <div className="w-1/2 p-8">
                    <h1 className="text-2xl font-semibold text-gray-800 text-center mb-6">Login</h1>
                    {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className="mb-4">
                            <label htmlFor="email" className="block text-gray-600 mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={emailId}
                                onChange={(e) => setEmailId(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block text-gray-600 mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 bg-blue-600 text-white text-lg font-semibold rounded-lg hover:bg-indigo-500 transition duration-300"
                        >
                            Login
                        </button>
                        <p className="text-center mt-4 text-gray-600">
                            If you are not a user!{' '}
                            <a href="/signup" className="text-blue-600 hover:underline">
                                Sign Up
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
