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
    <div className="flex flex-col items-center p-5 bg-gray-100 min-h-screen w-full">
      <header className="flex justify-between items-center w-full p-5 bg-[#283e4a] text-white">
        <h1 className="text-2xl">Event Manager</h1>
        <nav className="space-x-5">
          <a href="#home" className="hover:underline">Home</a>
          <a href="#events" className="hover:underline">Events</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </nav>
      </header>

      <div className="bg-gray-200 w-full flex justify-center py-6">
        <div className="container">
          <button onClick={() => setShowModal(true)} className="py-2 px-6 bg-green-500 text-white rounded-md text-lg transition duration-300 hover:bg-green-600">
            Add Event
          </button>
        </div>
      </div>

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50" onClick={() => setShowModal(false)}>
          <div className="bg-white p-6 max-w-md w-full rounded-lg relative" onClick={(e) => e.stopPropagation()}>
            <button className="absolute top-2 right-2 text-2xl text-gray-500 hover:text-gray-800" onClick={() => setShowModal(false)}>&times;</button>
            <h2 className="text-xl mb-5">Add New Event</h2>
            <form onSubmit={handleSubmit} className="flex flex-col gap-4">
              <input type="text" name="title" value={formData.title} onChange={handleChange} placeholder="Title" className="p-3 border rounded-md" required />
              <textarea name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="p-3 border rounded-md" required />
              <input type="text" name="location" value={formData.location} onChange={handleChange} placeholder="Location" className="p-3 border rounded-md" required />
              <input type="date" name="date" value={formData.date} onChange={handleChange} className="p-3 border rounded-md" required />
              <input type="time" name="time" value={formData.time} onChange={handleChange} className="p-3 border rounded-md" required />
              <input type="number" name="capacity" value={formData.capacity} onChange={handleChange} placeholder="Capacity" className="p-3 border rounded-md" required />
              <input type="text" name="tags" value={formData.tags} onChange={handleChange} placeholder="Tags (comma separated)" className="p-3 border rounded-md" required />
              <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="p-3 border rounded-md" required />
              <input type="file" name="image" onChange={handleImageChange} accept="image/*" className="p-3 border rounded-md" required />
              <button type="submit" className="py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">Create Event</button>
            </form>
          </div>
        </div>
      )}

      <div className="w-full max-w-4xl mt-10">
        <h2 className="text-xl mb-4">Event List</h2>
        {isLoading ? (
          <p>Loading events...</p>
        ) : (
          <table className="w-full border-collapse shadow-lg bg-white rounded-lg">
            <thead>
              <tr className="bg-[#283e4a] text-white">
                <th className="p-3">Image</th>
                <th className="p-3">Title</th>
                <th className="p-3">Description</th>
                <th className="p-3">Location</th>
                <th className="p-3">Date</th>
                <th className="p-3">Time</th>
                <th className="p-3">Capacity</th>
                <th className="p-3">Tags</th>
                <th className="p-3">Price</th>
                <th className="p-3">Actions</th>
              </tr>
            </thead>
            <tbody>
              {events.map((event) => (
                <tr key={event._id} className="border-b">
                  <td className="p-3">
                    {event.image ? (
                      <img src={event.image.url} alt={event.title} className="w-16 h-auto rounded-md" />
                    ) : (
                      <span>No image</span>
                    )}
                  </td>
                  <td className="p-3">{event.title}</td>
                  <td className="p-3">{event.description}</td>
                  <td className="p-3">{event.location}</td>
                  <td className="p-3">{event.date}</td>
                  <td className="p-3">{event.time}</td>
                  <td className="p-3">{event.capacity}</td>
                  <td className="p-3">{event.tags.join(", ")}</td>
                  <td className="p-3">${event.price}</td>
                  <td className="p-3">
                    <button onClick={() => handleEdit(event)} className="py-1 px-3 bg-orange-500 text-white rounded-md hover:bg-orange-600 transition">Edit</button>
                    <button onClick={() => handleDelete(event._id)} className="py-1 px-3 bg-red-500 text-white rounded-md hover:bg-red-600 transition">Delete</button>
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
