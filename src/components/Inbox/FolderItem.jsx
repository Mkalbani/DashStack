import React from "react";

const FolderItem = ({ icon: Icon, name, count, folder, setCurrentFolder }) => (
  <div
    className="flex sm:justify-start sm:items-start text-xs sm:text-sm items-center justify-between cursor-pointer hover:bg-gray-700 rounded"
    onClick={() => setCurrentFolder(folder)}
  >
    <span className="flex items-center ">
      <Icon className="mr-2 " size={18} />
      <span className="hidden sm:inline">{name}</span>
    </span>
    <span>{count}</span>
  </div>
);

export default FolderItem;
