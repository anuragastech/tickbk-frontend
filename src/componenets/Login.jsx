import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';


const Login = () => {
    const [emailId, setEmailId] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    
    const handleSubmit = async (event) => {
        event.preventDefault(); // Prevent default form submission behavior
        setError(null); // Reset any previous errors

        try {
            // Make the login request to the backend
            const response = await axios.post(
                'http://localhost:3005/login', // Ensure this URL is correct
                { emailId, password }
            );

            console.log('Login successful:', response.data);
            // Handle successful login, e.g., redirect to dashboard or store token

            localStorage.setItem('token', response.data.token);
                
            // Redirect to /events page
            navigate('/events');

        } catch (err) {
            // Handle error responses from the backend
            if (err.response) {
                console.error('Error response:', err.response); // Log full error response
                setError(err.response.data.message || 'Login failed. Please check your credentials.');
            } else {
                console.error('Error:', err); // Log error
                setError('Network error. Please try again later.');
            }
        }
    };

    return (
        <div className='login-page'>
            <div className='login-container'>
                <h1>Login</h1>
                {error && <p className='error-message'>{error}</p>}
                <form onSubmit={handleSubmit}>
                    <div className='input-group'>
                        <label htmlFor='email'>Email</label>
                        <input
                            type='email'
                            id='email'
                            name='email'
                            value={emailId}
                            onChange={(e) => setEmailId(e.target.value)} // Update state on input change
                            required
                        />
                    </div>
                    <div className='input-group'>
                        <label htmlFor='password'>Password</label>
                        <input
                            type='password'
                            id='password'
                            name='password'
                            value={password}
                            onChange={(e) => setPassword(e.target.value)} // Update state on input change
                            required
                        />
                    </div>
                    <button type='submit'>Login</button>
                    <br />
                    <br />
                    <p>
                        {/* Uncomment the next line if you have a Sign Up page */}
                        If you are not a user! <a style={{ textDecoration: "none" }} href="/signup">Sign Up</a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;
