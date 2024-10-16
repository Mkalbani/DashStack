import React from "react";

const FolderItem = ({ icon: Icon, name, count, folder, setCurrentFolder }) => (
  <div
    className="flex justify-between items-center text-xs sm:text-sm cursor-pointer hover:bg-gray-700 rounded p-2"
    onClick={() => setCurrentFolder(folder)}
  >
    {/* Icon and Name */}
    <span className="flex items-center">
      {/* Icon (always visible) */}
      <Icon className="mr-2" size={18} />

      {/* Name (hidden on small screens) */}
      <span className="hidden sm:inline">{name}</span>
    </span>

    {/* Count (always visible) */}
    <span className="text-white">{count}</span>
  </div>
);

export default FolderItem;
