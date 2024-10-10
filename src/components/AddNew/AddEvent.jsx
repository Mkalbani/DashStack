import React, { useState } from "react";
import { Camera } from "lucide-react";
import { useNavigate } from "react-router-dom";

const AddEvent = ({ onAddEvent, onCancel }) => {
  const [formData, setFormData] = useState({
    title: "",
    date: "",
    time: "",
    location: "",
    description: "",
    image: null,
    attendees: "",
  });
const navigate = useNavigate()

  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    setFormData((prevState) => ({
      ...prevState,
      image: file,
    }));
    setImagePreview(URL.createObjectURL(file));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newEvent = {
      ...formData,
      id: Date.now(),
      imageSrc: imagePreview || "/api/placeholder/400/300",
      attendees: formData.attendees
        .split(",")
        .map((attendee) => attendee.trim()),
    };
    onAddEvent(newEvent);
    navigate('/calendar')
  };

  return (
    <div className="bg-gray-900 text-sm">
      <h2 className="text-2xl font-bold text-white mb-6">Add New Event</h2>
      <div className="mx-auto bg-gray-800 rounded-lg">
        <div className="mb-6 flex justify-center">
          <label htmlFor="image-upload" className="cursor-pointer">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Event Preview"
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 mt-10 ml-5 bg-gray-100 rounded-full flex items-center justify-center">
                <Camera size={28} className="text-gray-600" />
              </div>
            )}
            <p className="mt-3 text-blue-500 cursor-pointer">
              {imagePreview ? "Change Image" : "Add Event Image"}
            </p>
          </label>
          <input
            id="image-upload"
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
        </div>
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <div className="grid grid-cols-2 gap-14 mb-4">
            <input
              type="text"
              name="title"
              placeholder="Event Title"
              value={formData.title}
              onChange={handleChange}
              className="bg-gray-700 text-white py-2 px-8 rounded w-full"
              required
            />
            <input
              type="text"
              name="location"
              placeholder="Location"
              value={formData.location}
              onChange={handleChange}
              className="bg-gray-700 text-white py-2 px-8 rounded w-full"
              required
            />
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleChange}
              className="bg-gray-700 text-white py-2 px-8 rounded w-full"
              required
            />
            <input
              type="time"
              name="time"
              value={formData.time}
              onChange={handleChange}
              className="bg-gray-700 text-white py-2 px-8 rounded w-full"
              required
            />
            <textarea
              name="description"
              placeholder="Event Description"
              value={formData.description}
              onChange={handleChange}
              className="bg-gray-700 text-white py-2 px-8 rounded w-full col-span-2"
              required
            />
            <input
              type="text"
              name="attendees"
              placeholder="Attendees (comma-separated)"
              value={formData.attendees}
              onChange={handleChange}
              className="bg-gray-700 text-white py-2 px-8 rounded w-full col-span-2"
            />
          </div>

          <div className="flex justify-center gap-4 w-full mb-3">
            <button
              type="button"
              onClick={onCancel}
              className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-7 rounded w-1/8"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-5 rounded w-1/8"
            >
              Add Event
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddEvent;
