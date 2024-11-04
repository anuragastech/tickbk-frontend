import React, { useState } from 'react';
import axios from 'axios';

const AddEventForm = () => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        capacity: '',
        tags: '',
        price: ''
    });
    const [image, setImage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setImage(e.target.files[0]);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // Create FormData instance to send both text and file data
        const data = new FormData();
        
        // Append text fields
        Object.keys(formData).forEach((key) => {
            data.append(key, formData[key]);
        });

        // Append image file
        if (image) {
            data.append('image', image);
        } else {
            alert("Please upload an image!");
            return;
        }

        try {
            // Send the POST request to your backend
            const response = await axios.post('http://localhost:3005/addEvents', data, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });

            // Handle the response
            alert("Event created successfully!");
            console.log(response.data);
        } catch (error) {
            console.error("Error creating event:", error);
            alert("Error creating event. Check console for details.");
        }
    };

    return (
        <div>
            <h2>Add New Event</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" required />
                <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" required />
                <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" required />
                <input type="date" name="date" value={formData.date} onChange={handleChange} required />
                <input type="time" name="time" value={formData.time} onChange={handleChange} required />
                <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="Capacity" required />
                <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma separated)" required />
                <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" required />
                
                {/* Image Upload */}
                <input type="file" name="image" onChange={handleImageChange} accept="image/*" required />

                <button type="submit">Create Event</button>
            </form>
        </div>
    );
};

export default AddEventForm;
