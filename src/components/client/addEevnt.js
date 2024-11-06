import React, { useEffect, useState } from "react";
import axios from "axios";
import "./addEvents.css"; // Ensure your CSS styling is linked

const AddEventForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    date: "",
    time: "",
    capacity: "",
    tags: "",
    price: "",
  });
  const [image, setImage] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [events, setEvents] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });
  const handleImageChange = (e) => setImage(e.target.files[0]);

  const fetchEvents = async () => {
    setIsLoading(true);
    try {
      const response = await axios.get("http://localhost:3005/events");
      setEvents(response.data.events);
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    Object.keys(formData).forEach((key) => data.append(key, formData[key]));
    if (image) data.append("image", image);
    else {
      alert("Please upload an image!");
      return;
    }

    try {
      await axios.post("http://localhost:3005/addEvents", data, {
        headers: { "Content-Type": "multipart/form-data" },
      });
      alert("Event created successfully!");
      setShowModal(false);
      fetchEvents();
    } catch (error) {
      console.error("Error creating event:", error);
      alert("Error creating event. Check console for details.");
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3005/deleteEvent/${id}`);
      alert("Event deleted successfully!");
      fetchEvents();
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleEdit = (event) => {
    setFormData(event);
    setShowModal(true);
  };

  useEffect(() => {
    fetchEvents();
  }, []);

  return (
    <div className="page-wrapper">
      <header className="header-new">
        <h1>Event Manager</h1>
        <nav className="nav">
          <a href="#home">Home</a>
          <a href="#events">Events</a>
          <a href="#contact">Contact</a>
        </nav>
      </header>

      <div className="background-wrapper">
        <div className="container">
          <button onClick={() => setShowModal(true)} className="add-event-button">Add Event</button>
        </div>
      </div>

      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <button className="close-button" onClick={() => setShowModal(false)}>&times;</button>
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
              <input type="file" name="image" onChange={handleImageChange} accept="image/*" required />
              <button type="submit">Create Event</button>
            </form>
          </div>
        </div>
      )}

      <div className="events-table">
        <h2>Event List</h2>
        {isLoading ? (
          <p>Loading events...</p>
        ) : (
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Title</th>
                <th>Description</th>
                <th>Location</th>
                <th>Date</th>
                <th>Time</th>
                <th>Capacity</th>
                <th>Tags</th>
                <th>Price</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id}>
                  <td>
                    {event.image ? (
                      <img src={event.image.url} alt={event.title} className="event-image" />
                    ) : (
                      <span>No image</span>
                    )}
                  </td>
                  <td>{event.title}</td>
                  <td>{event.description}</td>
                  <td>{event.location}</td>
                  <td>{event.date}</td>
                  <td>{event.time}</td>
                  <td>{event.capacity}</td>
                  <td>{event.tags.join(", ")}</td>
                  <td>${event.price}</td>
                  <td>
                    <button onClick={() => handleEdit(event)} className="edit-button">Edit</button>
                    <button onClick={() => handleDelete(event._id)} className="delete-button">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AddEventForm;
