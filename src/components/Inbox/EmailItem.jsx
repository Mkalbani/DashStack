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
    onClick={() => onClick(email)}
    className="flex items-center bg-gray-800 p-2 rounded relative after:content-[''] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[1px] after:bg-gray-500"
  >
    <input
      type="checkbox"
      checked={isSelected}
      onChange={() => toggleEmailSelection(email.id)}
      className="mr-2 bg-inherit"
    />
    {email.starred ? (
      <Star
        className="mr-2 cursor-pointer text-yellow-400 fill-yellow-400"
        onClick={() => toggleStar(email.id)}
        size={20}
      />
    ) : (
      <Star
        className="mr-2 cursor-pointer text-gray-400"
        onClick={() => toggleStar(email.id)}
        size={20}
      />
    )}
    <div className="flex-1">
      <div className="flex justify-between">
        <span className="font-bold text-sm cursor-pointer">{email.sender}</span>
        <span className="text-gray-400 text-sm">{email.time}</span>
      </div>
      <div className="flex items-center">
        {email.label && (
          <span
            className={`text-xs px-2 py-1 rounded mr-2 ${
              email.label === "Primary"
                ? "bg-green-500"
                : email.label === "Social"
                ? "bg-purple-500"
                : email.label === "Work"
                ? "bg-orange-500"
                : email.label === "Friends"
                ? "bg-pink-500"
                : "bg-gray-500"
            }`}
          >
            {email.label}
          </span>
        )}
        <span className="text-gray-400">{email.subject}</span>
      </div>
    </div>
  </div>
);

export default EmailItem;

