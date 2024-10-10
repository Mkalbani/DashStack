import React, { useState } from "react";

const ComposeEmail = ({ addNewEmail, setComposeOpen, labels }) => {
  const [to, setTo] = useState("");
  const [subject, setSubject] = useState("");
  const [message, setMessage] = useState("");
  const [selectedLabel, setSelectedLabel] = useState("");

  const handleSend = () => {
    const newEmail = {
      sender: "You",
      subject,
      time: new Date().toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
      }),
      label: selectedLabel,
      starred: false,
    };
    addNewEmail(newEmail);
    setComposeOpen(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-gray-800 p-4 rounded-lg w-1/2">
        <h2 className="text-xl mb-4">Compose Email</h2>
        <input
          type="text"
          placeholder="To"
          className="w-full bg-gray-700 text-white p-2 rounded mb-2"
          value={to}
          onChange={(e) => setTo(e.target.value)}
        />
        <input
          type="text"
          placeholder="Subject"
          className="w-full bg-gray-700 text-white p-2 rounded mb-2"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
        />
        <textarea
          placeholder="Message"
          className="w-full bg-gray-700 text-white p-2 rounded mb-2"
          rows="5"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <select
          className="w-full bg-gray-700 text-white p-2 rounded mb-2"
          value={selectedLabel}
          onChange={(e) => setSelectedLabel(e.target.value)}
        >
          <option value="">Select Label</option>
          {labels.map((label) => (
            <option key={label} value={label}>
              {label}
            </option>
          ))}
        </select>
        <div className="flex justify-end">
          <button
            className="bg-blue-500 text-white px-4 py-2 rounded"
            onClick={handleSend}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
};

export default ComposeEmail;