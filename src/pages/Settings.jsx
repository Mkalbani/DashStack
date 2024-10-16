import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Camera } from "lucide-react";

const Settings = ({ onAddContact }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    SiteName: "",
    CopyRight: "",
    SEOTitle: "",
    SEODescription: "",
    SEOKeywords: "",
    image: null,
  });
  const [IsModalOpen, setIsModalOpen] = useState(false);
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
      <h2 className="text-2xl font-bold text-white mb-6">General Settings</h2>
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
          <div className="grid grid-cols-2 gap-14 mb-4 w-full">
            {/* Column 1 - Left side */}
            <div className="col-span-1 space-y-4 w-3/4 ml-20">
              <div>
                <label className="text-gray-300"> Site Name</label>
                <input
                  type="text"
                  name="SiteName"
                  placeholder="Site Name"
                  value={formData.SiteName}
                  onChange={handleChange}
                  className="bg-gray-700 text-white py-2 px-8 rounded w-full text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-gray-300"> SEO Title</label>
                <input
                  type="text"
                  name="SEOTitle"
                  placeholder="SEO Title"
                  value={formData.SEOTitle}
                  onChange={handleChange}
                  className="bg-gray-700 text-white py-2 px-8 rounded w-full text-sm"
                  required
                />
              </div>
              <div>
                <label className="text-gray-300"> SEO Keywords</label>
                <input
                  type="text"
                  name="SEOKeywords"
                  placeholder="SEO Keywords"
                  value={formData.SEOKeywords}
                  onChange={handleChange}
                  className="bg-gray-700 text-white py-2 px-8 rounded w-full text-sm"
                  required
                />
              </div>
            </div>

            {/* Column 2 - Right side */}
            <div className="col-span-1 flex flex-col justify-between mr-20 ml-5">
              <div>
                <label className="text-gray-300"> Copy Right</label>
                <input
                  type="text"
                  name="CopyRight"
                  placeholder="Copy Right"
                  value={formData.CopyRight}
                  onChange={handleChange}
                  className="bg-gray-700 text-white py-2 px-8 rounded w-full mb-4 text-sm"
                  required
                />
              </div>
              <textarea
                type="text"
                name="SEODescription"
                placeholder="SEO Description"
                value={formData.SEODescription}
                onChange={handleChange}
                className="bg-gray-700 text-white py-2 px-8 rounded w-full h-full resize-none text-sm"
                required
              />
            </div>
          </div>

          <div className="flex justify-center w-full mx-auto">
            <button
              type="submit"
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-10 rounded mb-4 "
            >
              Save
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
