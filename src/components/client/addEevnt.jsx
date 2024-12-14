import React, { useEffect, useState } from "react";
import axios from "axios";

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
      const response = await axios.get(`${process.env.REACT_APP_API_URL}/events`);
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
      await axios.post(`${process.env.REACT_APP_API_URL}/addEvents`, data, {
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
      await axios.delete(`${process.env.REACT_APP_API_URL}/deleteEvent/${id}`);
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
    <div className="flex flex-col items-center p-8 bg-gradient-to-r from-purple-500 via-pink-500 to-red-500 min-h-screen w-full">
      <header className="flex justify-between items-center w-full p-6 bg-[#1a202c] text-white shadow-lg">
        <h1 className="text-3xl font-bold">Event Manager</h1>
        <nav className="space-x-5">
          <a href="#home" className="hover:underline text-lg">Home</a>
          <a href="#events" className="hover:underline text-lg">Events</a>
          <a href="#contact" className="hover:underline text-lg">Contact</a>
        </nav>
      </header>

      <div className="bg-gradient-to-tl from-gray-300 to-gray-400 w-full flex justify-center py-8">
        <div className="container">
          <button onClick={() => setShowModal(true)} className="py-3 px-8 bg-gradient-to-r from-teal-400 to-teal-600 text-white rounded-lg text-xl font-semibold shadow-md transform hover:scale-105 transition duration-300">
            Add Event
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white p-6 max-w-md w-full rounded-lg relative shadow-lg max-h-dvh" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-4 right-4 text-3xl text-gray-700 hover:text-gray-900" onClick={() => setShowModal(false)}>&times;</button>
            <h2 className="text-2xl font-bold mb-5 text-center">Add New Event</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-6">
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Event Title" className="p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" required />
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" required />
              <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" required />
              <input type="date" name="date" value={formData.date} onChange={handleChange} className="p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" required />
              <input type="time" name="time" value={formData.time} onChange={handleChange} className="p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" required />
              <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="Capacity" className="p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" required />
              <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma separated)" className="p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" required />
              <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" required />
              <input type="file" name="image" onChange={handleImageChange} accept="image/*" className="p-4 border-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500" required />
              <button type="submit" className="py-3 bg-gradient-to-r from-teal-500 to-teal-700 text-white rounded-lg text-xl font-semibold shadow-md transform hover:scale-105 transition duration-300">Create Event</button>
            </form>
          </div>
        </div>
      )}

      <div className="w-full max-w-6xl mt-10">
        <h2 className="text-2xl font-semibold mb-6">Event List</h2>
        {isLoading ? (
          <p className="text-center text-lg">Loading events...</p>
        ) : (
          <table className="w-full border-collapse shadow-lg bg-white rounded-lg overflow-hidden">
            <thead>
              <tr className="bg-[#1a202c] text-white">
                <th className="p-4 text-lg">Image</th>
                <th className="p-4 text-lg">Title</th>
                <th className="p-4 text-lg">Description</th>
                <th className="p-4 text-lg">Location</th>
                <th className="p-4 text-lg">Date</th>
                <th className="p-4 text-lg">Time</th>
                <th className="p-4 text-lg">Capacity</th>
                <th className="p-4 text-lg">Tags</th>
                <th className="p-4 text-lg">Price</th>
                <th className="p-4 text-lg">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id} className="border-b hover:bg-gray-50">
                  <td className="p-4">
                    {event.image ? (
                      <img src={event.image.url} alt={event.title} className="w-20 h-auto rounded-md shadow-md" />
                    ) : (
                      <span>No image</span>
                    )}
                  </td>
                  <td className="p-4">{event.title}</td>
                  <td className="p-4">{event.description}</td>
                  <td className="p-4">{event.location}</td>
                  <td className="p-4">{event.date}</td>
                  <td className="p-4">{event.time}</td>
                  <td className="p-4">{event.capacity}</td>
                  <td className="p-4">{event.tags.join(", ")}</td>
                  <td className="p-4">${event.price}</td>
                  <td className="p-4 flex gap-4">
                    <button onClick={() => handleEdit(event)} className="py-2 px-4 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition">Edit</button>
                    <button onClick={() => handleDelete(event._id)} className="py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition">Delete</button>
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
