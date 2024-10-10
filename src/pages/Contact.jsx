import React from "react";
import ContactCard from "../components/Cards/ContactCard";
import { Link } from "react-router-dom";


const Contact = ({ contacts }) => (
  <div className="bg-gray-900 min-h-screen text-sm">
    <div className="max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-3xl font-bold text-white">Contact</h2>
        <Link to='/add-new-contact'>
          <button className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
            Add New Contact
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((contact, index) => (
          <ContactCard key={index} {...contact} />
        ))}
      </div>
    </div>
  </div>
);

export default Contact;

