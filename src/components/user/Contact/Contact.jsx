import React, { useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from '../../Header/header';
import Footer from '../../footer/footer';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    setTimeout(() => {
      toast.success("Your message has been sent! We'll get back to you shortly.");
      
      setFormData({
        name: '',
        email: '',
        message: ''
      });
    }, 1500); 
  };

  return (
    <div>
    <div className="bg-gradient-to-br from-green-600 to-blue-900 min-h-screen mt-11 flex flex-col justify-center items-center py-12">
      <Header/>

      {/* Hero Section */}
      <div className="text-center text-white mb-12">
        <h1 className="text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-blue-500 to-purple-600">
          Contact Us for Premium Support
        </h1>
        <p className="text-xl mt-4">We're here to help you! Please drop us a message, and we'll respond shortly.</p>
      </div>

      {/* Contact Form Section */}
      <div className="bg-white/60 backdrop-blur-md p-8 rounded-3xl shadow-xl w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-transparent bg-clip-text bg-gradient-to-br from-green-400 via-blue-500 to-purple-600 mb-6">
          Get In Touch
        </h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700" htmlFor="name">
              Full Name
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-xl bg-white bg-opacity-40 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md transition ease-in-out duration-300"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-lg font-medium text-gray-700" htmlFor="email">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-xl bg-white bg-opacity-40 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md transition ease-in-out duration-300"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-lg font-medium text-gray-700" htmlFor="message">
              Your Message
            </label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              className="w-full p-4 border border-gray-300 rounded-xl bg-white bg-opacity-40 focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-md transition ease-in-out duration-300"
              rows="6"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-gradient-to-br from-green-500 via-blue-600 to-purple-700 text-white font-semibold py-3 rounded-xl hover:scale-105 transform transition duration-300 shadow-lg"
          >
            Send Message
          </button>
        </form>
      </div>

      <ToastContainer />
  </div>
  <Footer/>
    </div>
  );
};

export default ContactUs;
