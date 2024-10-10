import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";

const AddNewContact = ({ onAddContact }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phoneNumber: "",
    dateOfBirth: "",
    gender: "Male",
    image: null,
  });
  const [IsModalOpen, setIsModalOpen] =useState(false)
  const [imagePreview, setImagePreview] = useState(null);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleDate = (e) => {
    const { name, value } = e.target;

    setFormData((prevState) => ({
      ...prevState,
      [name]: new Date(value),
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
    const newMember = {
      name: `${formData.firstName} ${formData.lastName}`,
      role: formData.position,
      imageSrc: imagePreview || "/api/placeholder/200/200",
    };
    onAddContact(newMember);
    navigate("/contact");
  };

  return (
    <div className="bg-gray-900 text-sm">
      <h2 className="text-2xl font-bold text-white mb-6">Add New Contact</h2>
      <div className=" mx-auto bg-gray-800 rounded-lg">
        <div className="mb-6 flex justify-center ">
          <label htmlFor="image-upload" className="cursor-pointer">
            {imagePreview ? (
              <img
                src={imagePreview}
                alt="Profile Preview"
                className="w-32 h-32 rounded-full object-cover"
              />
            ) : (
              <div className="w-16 h-16 mt-10 ml-5 bg-gray-100 rounded-full flex items-center justify-center">
                <Camera size={28} className="text-gray-600 " />
              </div>
            )}
            <p className="mt-3 text-blue-500 cursor-pointer">
              {imagePreview ? "Edit Photo" : "Add New Photo"}
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
              name="firstName"
              placeholder="First Name"
              value={formData.firstName}
              onChange={handleChange}
              className="bg-gray-700 text-white py-2 px-8 rounded w-full"
              required
            />
            <input
              type="text"
              name="lastName"
              placeholder="Last Name"
              value={formData.lastName}
              onChange={handleChange}
              className="bg-gray-700 text-white py-2 px-8 rounded w-full"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Your email"
              value={formData.email}
              onChange={handleChange}
              className="bg-gray-700 text-white py-2 px-8 rounded w-full mb-4"
              required
            />
            <input
              type="tel"
              name="phoneNumber"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="bg-gray-700 text-white py-2 px-8 rounded w-full mb-4"
              required
            />
            <input
              type="date"
              name="Date of Birth"
              placeholder="Date of Birth"
              value={formData.date}
              onChange={handleDate}
              className="bg-gray-700 text-white py-2 px-8 rounded w-full mb-4"
              required
            />

            <select
              name="gender"
              value={formData.gender}
              onChange={handleChange}
              className="bg-gray-700 text-white p-2 rounded w-full mb-6"
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
          </div>

          <div className="flex justify-center">
            <button
              type="submit"
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-8 rounded w-full mb-4"
            >
              Add Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNewContact;
