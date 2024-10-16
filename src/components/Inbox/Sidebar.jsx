import React, { useState } from "react";
import {
  Mail,
  Star,
  Send,
  FileText,
  AlertTriangle,
  Bell,
  Trash2,
} from "lucide-react";
import FolderItem from "./FolderItem";

const Sidebar = ({
  labels,
  addNewLabel,
  setCurrentFolder,
  setComposeOpen,
  emails,
  selectedLabels,
  setSelectedLabels,
}) => {
  const [newLabelName, setNewLabelName] = useState("");
  const [showAddLabel, setShowAddLabel] = useState(false);

  const getEmailCount = (folder) =>
    emails.filter((email) => email.folder === folder).length;
  const getStarredCount = () => emails.filter((email) => email.starred).length;

  const handleAddLabel = () => {
    addNewLabel(newLabelName);
    setNewLabelName("");
    setShowAddLabel(false);
  };

  const toggleLabel = (label) => {
    setSelectedLabels((prev) =>
      prev.includes(label) ? prev.filter((l) => l !== label) : [...prev, label]
    );
  };

  const getLabelColor = (label) => {
    switch (label) {
      case "Primary":
        return "border-green-500";
      case "Social":
        return "border-purple-500";
      case "Work":
        return "border-orange-500";
      case "Friends":
        return "border-pink-500";
      default:
        return "border-gray-500";
    }
  };

  return (
    <div className="w-16 sm:w-64 bg-gray-800 p-2 rounded-2xl">
      <button
        className="w-full bg-blue-500 text-white py-2 rounded mb-4 text-xs sm:text-sm "
        onClick={() => setComposeOpen(true)}
      >
        +<p className="hidden sm:in-line"> Compose</p>
      </button>
      <h3 className="py-2 hidden sm:block text-white">My Email</h3>
      <div className="space-y-2">
        <FolderItem
          icon={Mail}
          name="Inbox"
          count={getEmailCount("inbox")}
          folder="inbox"
          setCurrentFolder={setCurrentFolder}
        />
        <FolderItem
          icon={Star}
          name="Starred"
          count={getStarredCount()}
          folder="starred"
          setCurrentFolder={setCurrentFolder}
        />
        <FolderItem
          icon={Send}
          name="Sent"
          count={getEmailCount("sent")}
          folder="sent"
          setCurrentFolder={setCurrentFolder}
        />
        <FolderItem
          icon={FileText}
          name="Draft"
          count={getEmailCount("draft")}
          folder="draft"
          setCurrentFolder={setCurrentFolder}
        />
        <FolderItem
          icon={AlertTriangle}
          name="Spam"
          count={getEmailCount("spam")}
          folder="spam"
          setCurrentFolder={setCurrentFolder}
        />
        <FolderItem
          icon={Bell}
          name="Important"
          count={getEmailCount("important")}
          folder="important"
          setCurrentFolder={setCurrentFolder}
        />
        <FolderItem
          icon={Trash2}
          name="Bin"
          count={getEmailCount("bin")}
          folder="bin"
          setCurrentFolder={setCurrentFolder}
        />
      </div>
      <div className="mt-4  sm:block">
        <h3 className="mb-2 text-sm font-medium text-gray-300 hidden">
          Labels
        </h3>
        {labels.map((label) => (
          <div key={label} className="flex items-center mb-1">
            <input
              type="checkbox"
              id={`label-${label}`}
              checked={selectedLabels.includes(label)}
              onChange={() => toggleLabel(label)}
              className={`mr-2 w-4 h-4 border-2 rounded-sm  bg-gray-700 ${getLabelColor(
                label
              )} checked:bg-blue-600 checked:border-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500`}
            />
            <label
              htmlFor={`label-${label}`}
              className="cursor-pointer text-sm hidden"
            >
              {label}
            </label>
          </div>
        ))}
        {showAddLabel ? (
          <div className="flex items-center mt-2">
            <input
              type="text"
              value={newLabelName}
              onChange={(e) => setNewLabelName(e.target.value)}
              className="flex-grow bg-gray-700 text-white p-1 rounded mr-2"
              placeholder="New label"
            />
            <button
              onClick={handleAddLabel}
              className="bg-blue-500 text-white px-2 py-1 rounded"
            >
              Add
            </button>
          </div>
        ) : (
          <button
            onClick={() => setShowAddLabel(true)}
            className="text-blue-400 mt-2 text-xs"
          >
            + Add Label
          </button>
        )}
      </div>
    </div>
  );
};

export default Sidebar;
