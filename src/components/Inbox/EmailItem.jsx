import React from "react";
import { Star } from "lucide-react";

const EmailItem = ({
  email,
  isSelected,
  toggleEmailSelection,
  toggleStar,
  onClick,
}) => (
  <div
    className={`grid ${
      email.label
        ? "grid-cols-[auto,1fr,auto,3fr,auto]" // With label
        : "grid-cols-[auto,1fr,3fr,auto]" // Without label
    } gap-4 items-center bg-gray-800 p-3 rounded-lg hover:bg-gray-700 transition-colors duration-200`}
  >
    {" "}
    {/* Checkbox and Star */}
    <div className="flex items-center space-x-3">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => toggleEmailSelection(email.id)}
        className="form-checkbox h-5 w-5 text-blue-600 bg-inherit rounded focus:ring-blue-500"
      />
      <Star
        className={`cursor-pointer ${
          email.starred ? "text-yellow-400 fill-yellow-400" : "text-gray-400"
        }`}
        onClick={(e) => {
          e.stopPropagation();
          toggleStar(email.id);
        }}
        size={20}
      />
    </div>
    {/* Sender */}
    <div
      className="font-semibold text-white truncate md:whitespace-normal"
      onClick={() => onClick(email)}
    >
      {email.sender}
    </div>
    {/* Label */}
    {email.label && (
      <span
        className={`text-xs px-3 py-1 rounded-full font-medium ${
          email.label === "Primary"
            ? "bg-green-500 text-green-100"
            : email.label === "Social"
            ? "bg-purple-500 text-purple-100"
            : email.label === "Work"
            ? "bg-orange-500 text-orange-100"
            : email.label === "Friends"
            ? "bg-pink-500 text-pink-100"
            : "bg-gray-500 text-gray-100"
        }`}
      >
        {email.label}
      </span>
    )}
    {/* Subject */}
    <div className="text-gray-300 truncate" onClick={() => onClick(email)}>
      {email.subject}
    </div>
    {/* Time */}
    <span className="text-gray-400 text-sm whitespace-nowrap">
      {email.time}
    </span>
  </div>
);

export default EmailItem;
