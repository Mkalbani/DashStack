import React from "react";
import { Star } from "lucide-react";

const EmailItem = ({
  email,
  isSelected,
  toggleEmailSelection,
  toggleStar,
  onClick,
}) => (
  <div className="grid grid-cols-[auto,1fr,auto,2fr,auto] gap-4 items-center bg-gray-800 p-2 rounded-lg hover:bg-gray-700 transition-colors duration-200">
    <div className="flex items-center space-x-2">
      <input
        type="checkbox"
        checked={isSelected}
        onChange={() => toggleEmailSelection(email.id)}
        className="form-checkbox h-5 w-5 text-blue-600 rounded focus:ring-blue-500"
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
    <div
      className="font-semibold text-white "
      onClick={() => onClick(email)}
    >
      {email.sender}
    </div>
    {email.label && (
      <span
        className={`text-xs px-2 py-1 rounded-full font-medium hidden ${
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
    <div className="text-gray-300 truncate" onClick={() => onClick(email)}>
      {email.subject}
    </div>
    <span className="text-gray-400 text-sm whitespace-nowrap">
      {email.time}
    </span>
  </div>
);

export default EmailItem;
